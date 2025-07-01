export default {
  routes: [
    {
      method: "GET",
      path: "/showtimes",
      handler: "showtime.find",
    },
    {
      method: "GET",
      path: "/showtimes/:id",
      handler: "showtime.findOne",
    },
    {
      method: "POST",
      path: "/showtimes",
      handler: "showtime.create",
    },
    {
      method: "PUT",
      path: "/showtimes/:id",
      handler: "showtime.update",
    },
    {
      method: "DELETE",
      path: "/showtimes/:id",
      handler: "showtime.delete",
    },
  ],
};
