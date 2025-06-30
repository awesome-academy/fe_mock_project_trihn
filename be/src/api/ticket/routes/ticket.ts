export default {
  routes: [
    {
      method: "GET",
      path: "/tickets",
      handler: "ticket.find",
    },
    {
      method: "GET",
      path: "/tickets/:id",
      handler: "ticket.findOne",
    },
    {
      method: "POST",
      path: "/tickets",
      handler: "ticket.create",
    },
    {
      method: "PUT",
      path: "/tickets/:id",
      handler: "ticket.update",
    },
    {
      method: "DELETE",
      path: "/tickets/:id",
      handler: "ticket.delete",
    },
  ],
};
