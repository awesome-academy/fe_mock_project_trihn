'use client';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { fetchUserInfoRequest } from '@/app/store/auth/slice';
import { TOKEN } from '@/app/utils/constants';
import type { FC } from 'react';

const AuthLoader: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie(TOKEN)) {
      dispatch(fetchUserInfoRequest());
    }
  }, []);

  return null;
};

export default AuthLoader;
