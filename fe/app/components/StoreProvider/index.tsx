'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/app/store';
import type { FC, ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const ReduxProvider: FC<PropsType> = ({ children }): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
