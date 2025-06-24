export const routes = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN_LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  MOVIES: '/admin/movies',
  SHOWTIMES: '/admin/showtimes',
  REVENUE: '/admin/revenue',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
  INTERNAL_SERVER_ERROR: '/500',
};

export const loginRoutes = [
  routes.LOGIN,
  routes.ADMIN_LOGIN,
  routes.FORGOT_PASSWORD,
];

export const publicRoutes = [routes.HOME];

export const adminRoutes = [routes.DASHBOARD, routes.USERS];

export const userRoutes = [routes.PROFILE];
