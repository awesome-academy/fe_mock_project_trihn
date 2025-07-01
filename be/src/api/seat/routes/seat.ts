export default {
  routes: [
    {
      method: "GET",
      path: "/seats",
      handler: "seat.find",
    },
    {
      method: "GET",
      path: "/seats/:id",
      handler: "seat.findOne",
    },
    {
      method: "POST",
      path: "/seats",
      handler: "seat.create",
    },
    {
      method: "PUT",
      path: "/seats/:id",
      handler: "seat.update",
    },
    {
      method: "DELETE",
      path: "/seats/:id",
      handler: "seat.delete",
    },
  ],
};
