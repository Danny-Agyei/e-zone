import React from "react";
import { Params, defer } from "react-router-dom";
import qs from "qs";

// sort=name:ASC&filters[$and][0][categories][title][$eqi]=Electronics&filters[$and][1][brand][$eq]=HP

const getStoreData = async function ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  try {
    const searchParamsFromStorage = Object.entries(
      JSON.parse(localStorage.getItem("queryParams")!)
    ).length
      ? JSON.parse(localStorage.getItem("queryParams")!)
      : null;

    let newQuery = {};

    if (searchParamsFromStorage) {
      for (const key in searchParamsFromStorage) {
        newQuery = { [key]: { $in: searchParamsFromStorage[key] } };
      }
    }

    const query = qs.stringify(
      {
        filters: {
          $and: [
            {
              ...(params.category
                ? { categories: { title: { $eqi: params.category } } }
                : {}),
            },
            {
              ...newQuery,
            },
          ],
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    // let a = {
    //   ...(params.category
    //     ? { categories: { title: { $eqi: params.category } } }
    //     : {}),
    //   ...newQuery,
    // };

    // console.log(a);

    const endpoint = params.category
      ? `/api/products?filters[$and][0][categories][title][$eqi]=${params.category}&populate=*`
      : "/api/products?populate=*";

    const url = `/api/products?${query}`;

    const productPromise = fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
      signal: request.signal,
    });

    const [productsRes] = await Promise.all([productPromise]);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const products = await productsRes.json();
    console.log(products);
    return { products: products.data };
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
export function loader(request: any) {
  return defer({
    data: getStoreData(request),
  });
}

export const Component = React.lazy(() => import("../pages/Shop/Shop"));
