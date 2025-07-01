export default {
  routes: [
    {
      method: "GET",
      path: "/cities",
      handler: "city.find",
    },
    {
      method: "GET",
      path: "/cities/:id",
      handler: "city.findOne",
    },
    {
      method: "POST",
      path: "/cities",
      handler: "city.create",
    },
    {
      method: "PUT",
      path: "/cities/:id",
      handler: "city.update",
    },
    {
      method: "DELETE",
      path: "/cities/:id",
      handler: "city.delete",
    },
  ],
};
