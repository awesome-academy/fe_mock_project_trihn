export default {
  routes: [
    {
      method: "GET",
      path: "/cinemas",
      handler: "cinema.find",
    },
    {
      method: "GET",
      path: "/cinemas/:id",
      handler: "cinema.findOne",
    },
    {
      method: "POST",
      path: "/cinemas",
      handler: "cinema.create",
    },
    {
      method: "PUT",
      path: "/cinemas/:id",
      handler: "cinema.update",
    },
    {
      method: "DELETE",
      path: "/cinemas/:id",
      handler: "cinema.delete",
    },
  ],
};
