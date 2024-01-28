import React from "react";

export async function loader({ request }: { request: Request }) {
  return null;
}

export const Component = React.lazy(() => import("../pages/Product/product"));
