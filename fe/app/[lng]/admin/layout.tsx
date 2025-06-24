'use client';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Sidebar from '@/app/layout/Sidebar';
import AdminHeader from '@/app/layout/AdminHeader';
import useTheme from '@/app/hooks/use-theme';
import { AppState } from '@/app/store';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & App.LanguageProps;

export default function DashboardLayout({ params: { lng }, children }: Props) {
  const { isDark } = useTheme();
  const isLoggedIn = useSelector<AppState, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  return isLoggedIn ? (
    <div className="flex h-screen overflow-hidden">
      <Sidebar lng={lng} />
      <div className="relative flex flex-col flex-1 h-full overflow-y-auto overflow-x-hidden">
        <AdminHeader lng={lng} />
        <main
          className={classNames(
            'flex-1 overflow-y-auto px-8 py-8 w-full max-w-9xl mx-auto bg-gray-100/90',
            { '!bg-gray-900/90': isDark },
          )}
        >
          {children}
        </main>
      </div>
    </div>
  ) : (
    <main>{children}</main>
  );
}
