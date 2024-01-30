export default {
  routes: [
    {
      path: "/collections/products/:slug",
      method: "GET",
      handler: "collection.findBySlug",
    },
  ],
};
