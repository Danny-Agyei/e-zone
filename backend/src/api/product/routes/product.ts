/**
 * product router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::product.product", {
  only: ["find", "findOne", "findBySlug"],
  config: {
    find: {},
    findOne: {},
  },
});
