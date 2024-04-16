import React from "react";
import { Params, defer } from "react-router-dom";
import qs from "qs";

const getStoreData = async function ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  try {
    const queryParamsString = localStorage.getItem("queryParams");

    const searchParamsFromStorage = queryParamsString
      ? Object.entries(JSON.parse(queryParamsString)).length
        ? JSON.parse(queryParamsString)
        : null
      : null;

    let newQuery = {};
    let sortBy = null;
    let searchTerm = null;
    let priceRange = null;

    if (searchParamsFromStorage) {
      for (const key in searchParamsFromStorage) {
        key === "sort"
          ? (sortBy = searchParamsFromStorage[key])
          : key === "price"
          ? (priceRange = searchParamsFromStorage[key])
          : key === "q"
          ? (searchTerm = searchParamsFromStorage[key])
          : (newQuery = {
              ...newQuery,
              [key]: {
                $in: searchParamsFromStorage[key],
              },
            });
      }
    }
    console.log(newQuery);

    let pathname = params.pathname?.toLowerCase();

    let endpoint = "";

    const query = qs.stringify(
      {
        ...(sortBy ? { sort: sortBy[0] } : { sort: "name:ASC" }),
        filters: {
          $and: [
            {
              ...(searchTerm
                ? {
                    $or: [
                      { name: { $containsi: searchTerm } },
                      { description: { $containsi: searchTerm } },
                    ],
                  }
                : {}),
            },
            {
              $and: [
                {
                  ...(pathname && pathname !== "search"
                    ? { categories: { title: { $eqi: pathname } } }
                    : {}),
                },

                {
                  ...newQuery,
                  ...(priceRange
                    ? {
                        price: {
                          $gte: Number(priceRange[0]),
                          $lte: Number(priceRange[1]),
                        },
                      }
                    : {}),
                },
              ],
            },
          ],
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    if ((pathname === "search" && searchTerm) || searchParamsFromStorage) {
      endpoint = `/api/products?${query}`;
    } else if (pathname === "search" && !searchTerm) {
      endpoint = "/api/products/null";
    } else if (pathname && pathname !== "search") {
      endpoint = `/api/products?sort=name%3AASC&filters[$and][0][categories][title][$eqi]=${pathname}&populate=*`;
    } else {
      endpoint = "/api/products?sort=name:ASC&populate=*";
    }

    const productPromise = fetch(
      `${process.env.REACT_APP_BASE_URL}${endpoint}`,
      {
        signal: request.signal,
      }
    );

    const [productsRes] = await Promise.all([productPromise]);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const products = await productsRes.json();

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
