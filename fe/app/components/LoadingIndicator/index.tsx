'use client';
import { useSelector } from 'react-redux';
import { AppState } from '@/app/store/rootReducer';
import Spin from '../Spin';
import type { FC } from 'react';

const LoadingIndicator: FC = (): JSX.Element => {
  const loading = useSelector<AppState, boolean>((state) => state.loading);
  return loading && <Spin />;
};

export default LoadingIndicator;
