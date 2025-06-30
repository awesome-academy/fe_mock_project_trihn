export default {
  routes: [
    {
      method: "GET",
      path: "/rooms",
      handler: "room.find",
    },
    {
      method: "GET",
      path: "/rooms/:id",
      handler: "room.findOne",
    },
    {
      method: "POST",
      path: "/rooms",
      handler: "room.create",
    },
    {
      method: "PUT",
      path: "/rooms/:id",
      handler: "room.update",
    },
    {
      method: "DELETE",
      path: "/rooms/:id",
      handler: "room.delete",
    },
  ],
};
