/* eslint-disable max-statements */
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { Language, StatusCode } from '@/app/utils/enum';
import store from '@/app/store';
import {
  LOGIN_ENDPOINT,
  REDIRECT_TO,
  ROLE,
  TOKEN,
} from '@/app/utils/constants';
import { cookieName } from '@/app/i18n/settings';
import { getPathname, resetStore } from '@/app/utils/helpers';
import { routes } from '@/app/utils/routes';
import { logout } from '@/app/store/auth/slice';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const isFormData = config.data instanceof FormData;
  if (!isFormData && config.headers && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (!error.response) {
      console.error(error.message);
      return Promise.reject({ message: error.message, status: 0 });
    }

    const {
      status,
      response: { data },
      config: { url },
    } = error;
    const lng = getCookie(cookieName) as Language;

    if (typeof window !== 'undefined') {
      switch (status) {
        case StatusCode.UN_AUTHORIZED: {
          const pathname = window.location.pathname;
          deleteCookie(TOKEN);
          deleteCookie(ROLE);
          setCookie(REDIRECT_TO, pathname);
          store.dispatch(logout());
          resetStore(store.dispatch);

          const isAdmin = pathname.startsWith('/admin');
          const loginPath = getPathname(
            lng,
            isAdmin ? routes.ADMIN_LOGIN : routes.LOGIN,
          );

          if (pathname !== loginPath) {
            window.location.href = loginPath;
          }
          break;
        }
        case StatusCode.FORBIDDEN:
        case StatusCode.NOT_FOUND: {
          if (url !== LOGIN_ENDPOINT) {
            window.location.href = getPathname(lng, routes.NOT_FOUND);
          }
          break;
        }
        case StatusCode.INTERNAL_SERVER_ERROR: {
          window.location.href = getPathname(lng, routes.INTERNAL_SERVER_ERROR);
          break;
        }
        default: {
          if (url !== LOGIN_ENDPOINT) {
            toast.error(error.message);
          }
          break;
        }
      }
    }

    return Promise.reject({
      status,
      error: (data as { error: App.Error }).error,
    });
  },
);

export default axiosClient;
