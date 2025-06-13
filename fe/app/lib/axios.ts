import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import { StatusCode } from '@/app/utils/enum';

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
      message,
      response: { data },
      config: { url },
    } = error;

    if (typeof window !== 'undefined') {
      if (
        [
          StatusCode.UN_AUTHORIZED,
          StatusCode.FORBIDDEN,
          StatusCode.NOT_FOUND,
        ].includes(status)
      ) {
        if (url !== '/auth/local') {
          window.location.href = '/404';
        }
      } else if (status === StatusCode.INTERNAL_SERVER_ERROR) {
        window.location.href = '/500';
      } else {
        if (url !== '/auth/local') {
          toast.error(message);
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
