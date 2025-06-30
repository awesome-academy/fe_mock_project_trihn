export default {
  routes: [
    {
      method: "GET",
      path: "/genres",
      handler: "genre.find",
    },
    {
      method: "GET",
      path: "/genres/:id",
      handler: "genre.findOne",
    },
    {
      method: "POST",
      path: "/genres",
      handler: "genre.create",
    },
    {
      method: "PUT",
      path: "/genres/:id",
      handler: "genre.update",
    },
    {
      method: "DELETE",
      path: "/genres/:id",
      handler: "genre.delete",
    },
  ],
};
