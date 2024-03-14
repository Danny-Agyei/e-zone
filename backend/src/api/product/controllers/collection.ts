import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async getProducts(ctx) {
      try {
        const category = ctx.request.params.category;
        const requestQuery = ctx.query;

        console.log("Query => ", requestQuery);
        console.log("category => ", category);

        // const entity = await strapi.entityService.findMany(
        //   "api::product.product",
        //   {
        //     filters: { slug },
        //     populate: { categories: true },
        //   }
        // );

        ctx.body = { attributes: [] };
      } catch (error) {
        return ctx.badRequest(error.message, { status: 500 });
      }
    },
    async findBySlug(ctx) {
      try {
        const slug = ctx.request.params.slug;
        console.log("BOOM i'M HERE => ", slug);

        const entity = await strapi.entityService.findMany(
          "api::product.product",
          {
            filters: { slug },
            populate: { categories: true },
          }
        );

        ctx.body = { attributes: entity[0] };
      } catch (error) {
        return ctx.badRequest(error.message, { status: 500 });
      }
    },
  })
);
