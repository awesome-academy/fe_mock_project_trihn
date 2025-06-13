'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/store';
import LoadingIndicator from '../LoadingIndicator';
import AuthLoader from '../AuthLoader';
import type { FC, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const ReduxProvider: FC<PropsType> = ({ children }): JSX.Element => {
  return (
    <Provider store={store}>
      <LoadingIndicator />
      <AuthLoader />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
