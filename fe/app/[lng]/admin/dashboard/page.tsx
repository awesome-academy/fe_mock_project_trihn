'use client';
import { useSelector } from 'react-redux';
import type { AppState } from '@/app/store';
import type { FC } from 'react';

//TODO
const DashboardPage: FC<App.LanguageProps> = ({ params: { lng } }) => {
  const user = useSelector<AppState, App.User>((state) => state.auth.user);

  return <div>user: {user.username}</div>;
};

export default DashboardPage;
