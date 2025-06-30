import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::movie.movie",
  ({ strapi }) => ({
    async delete(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.entityService.delete("api::movie.movie", id);

      return this.transformResponse(entity);
    },
  })
);
