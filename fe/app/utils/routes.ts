export const routes = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  ADMIN_LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
};

export const loginRoutes = [
  routes.LOGIN,
  routes.ADMIN_LOGIN,
  routes.FORGOT_PASSWORD,
];

export const publicRoutes = [routes.HOME];

export const adminRoutes = [routes.DASHBOARD];

export const userRoutes = [routes.PROFILE];
