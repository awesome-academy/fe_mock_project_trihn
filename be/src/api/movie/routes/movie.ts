export default {
  routes: [
    {
      method: "GET",
      path: "/movies",
      handler: "movie.find",
    },
    {
      method: "GET",
      path: "/movies/:id",
      handler: "movie.findOne",
    },
    {
      method: "POST",
      path: "/movies",
      handler: "movie.create",
    },
    {
      method: "PUT",
      path: "/movies/:id",
      handler: "movie.update",
    },
    {
      method: "DELETE",
      path: "/movies/:id",
      handler: "movie.delete",
    },
  ],
};
