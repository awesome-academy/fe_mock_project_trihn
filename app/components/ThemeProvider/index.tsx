'use client';

import { useEffect } from 'react';
import { THEME } from '@/app/utils/constants';
import { Theme } from '@/app/utils/enum';
import type { FC, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const ThemeProvider: FC<PropsType> = ({ children }): JSX.Element => {
  useEffect(() => {
    const theme = localStorage.getItem(THEME) || Theme.LIGHT;
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
