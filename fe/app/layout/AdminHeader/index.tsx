import React, { type FC } from 'react';
import classNames from 'classnames';
import useTheme from '@/app/hooks/use-theme';
import ThemeToggle from '../ThemeToggle';
import DropdownProfile from '../DropdownProfile';
import LanguageSwitcher from '../LanguageSwitcher';

const AdminHeader: FC<App.Lang> = ({ lng }) => {
  const { isDark } = useTheme();

  return (
    <header
      className={classNames(
        'sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md before:-z-10 z-30 shadow-xs before:bg-gray-100/90',
        { 'before:!bg-gray-900/90': isDark },
      )}
    >
      <div className="px-8">
        <div
          className={classNames(
            'flex items-center justify-end h-16 border-b border-gray-200',
            { '!border-gray-700/60': isDark },
          )}
        >
          <div className="flex items-center space-x-3">
            <LanguageSwitcher lng={lng} />
            <ThemeToggle />
            <hr
              className={classNames('w-px h-6 border-none bg-gray-200', {
                '!bg-gray-700/60': isDark,
              })}
            />
            <DropdownProfile lng={lng} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
