'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/store';
import type { FC, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const ReduxProvider: FC<PropsType> = ({ children }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
