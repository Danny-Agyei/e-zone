import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
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
