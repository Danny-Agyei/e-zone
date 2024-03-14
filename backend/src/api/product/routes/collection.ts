export default {
  routes: [
    {
      path: "/collections/shop/products/:category",
      method: "GET",
      handler: "collection.getProducts",
    },
    {
      path: "/collections/products/:slug",
      method: "GET",
      handler: "collection.findBySlug",
    },
  ],
};
