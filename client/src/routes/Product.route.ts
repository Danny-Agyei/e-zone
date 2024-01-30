import React from "react";
import { Params } from "react-router-dom";

const getProduct = async function ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/collections/products/${params.slug}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const resData = await res.json();

    return { product: resData };
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const loader = (request: any) => ({
  data: getProduct(request),
});

export const Component = React.lazy(() => import("../pages/Product/product"));
