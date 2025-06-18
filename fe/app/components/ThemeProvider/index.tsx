'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTheme } from '@/app/store/theme/slice';
import { THEME } from '@/app/utils/constants';
import { Theme } from '@/app/utils/enum';
import type { FC, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const ThemeProvider: FC<PropsType> = ({ children }): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME);
    const theme = Object.values(Theme).includes(storedTheme as Theme)
      ? (storedTheme as Theme)
      : Theme.LIGHT;
    dispatch(setCurrentTheme(theme));
    document.documentElement.setAttribute('data-theme', theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
