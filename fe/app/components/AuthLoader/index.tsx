'use client';
import { useEffect } from 'react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { fetchUserInfoRequest, logout } from '@/app/store/auth/slice';
import { getPathname, isTokenValid, resetStore } from '@/app/utils/helpers';
import { REDIRECT_TO, ROLE, TOKEN } from '@/app/utils/constants';
import { routes } from '@/app/utils/routes';
import type { FC } from 'react';

const AuthLoader: FC<App.Lang> = ({ lng }): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getCookie(TOKEN);
    if (token) {
      if (isTokenValid(token)) {
        dispatch(fetchUserInfoRequest());
      } else {
        deleteCookie(TOKEN);
        deleteCookie(ROLE);
        dispatch(logout());
        resetStore(dispatch);
        setCookie(REDIRECT_TO, pathname);

        const isAdmin = pathname.includes('/admin');
        router.replace(
          getPathname(lng, isAdmin ? routes.ADMIN_LOGIN : routes.LOGIN),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AuthLoader;
