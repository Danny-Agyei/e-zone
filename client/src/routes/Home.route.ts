import React from "react";
import { defer } from "react-router-dom";

const getStoreData = async function ({ request }: { request: Request }) {
  try {
    const productPromise = fetch(
      `${process.env.REACT_APP_BASE_URL}/api/products?populate=*`,
      {
        signal: request.signal,
      }
    );

    const bannerPromise = fetch(
      `${process.env.REACT_APP_BASE_URL}/api/banners?populate=*`,
      { signal: request.signal }
    );

    const [bannersRes, productsRes] = await Promise.all([
      bannerPromise,
      productPromise,
    ]);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const banners = await bannersRes.json();
    const products = await productsRes.json();

    return { products: products.data, banners: banners.data };
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

export const Component = React.lazy(() => import("../pages/Home/home"));
