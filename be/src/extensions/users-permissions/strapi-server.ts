export default (plugin: any) => {
  plugin.controllers.user.find = async (ctx) => {
    const { query } = ctx;

    const { page = 1, pageSize = 25, start, limit } = query;

    const search = query.search?.trim();
    const filters = search
      ? {
          $or: [
            { username: { $containsi: search } },
            { email: { $containsi: search } },
          ],
        }
      : {};

    const queryOptions = {
      ...query,
      filters,
      pagination: {
        pageSize: parseInt(String(pageSize)),
        page: parseInt(String(page)),
        ...(start !== undefined && limit !== undefined ? { start, limit } : {}),
      },
      sort: query.sort || ["createdAt:desc"],
      populate: {
        role: { fields: ["name"] },
        avatar: { fields: ["url"] },
      },
    };

    try {
      const { results, pagination } = await strapi.entityService.findPage(
        "plugin::users-permissions.user",
        queryOptions
      );

      const sanitizedUsers = results.map((user) => {
        const {
          password,
          resetPasswordToken,
          confirmationToken,
          ...sanitizedUser
        } = user;
        return sanitizedUser;
      });

      ctx.body = {
        data: sanitizedUsers,
        meta: {
          pagination: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            pageCount: pagination.pageCount,
            total: pagination.total,
          },
        },
      };
    } catch (error) {
      ctx.throw(500, error);
    }
  };

  return plugin;
};
