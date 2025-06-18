'use client';
import classNames from 'classnames';
import { useRef } from 'react';
import Image from 'next/image';
import { deleteCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { noop } from 'lodash';

import { AppState } from '@/app/store';
import { getPathname, resetStore } from '@/app/utils/helpers';
import { routes } from '@/app/utils/routes';
import { useTranslation } from '@/app/i18n/client';
import { Role } from '@/app/utils/enum';
import { ROLE, TOKEN } from '@/app/utils/constants';
import { logout } from '@/app/store/auth/slice';
import useTheme from '@/app/hooks/use-theme';
import Dropdown from '@/app/components/Dropdown';
import type { Dispatch, SetStateAction } from 'react';

const DropdownProfile: React.FC<App.Lang> = ({ lng }) => {
  const user = useSelector<AppState, App.User>((state) => state.auth.user);
  const dropdownRef = useRef<{
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  }>({ setDropdownOpen: noop });
  const { t } = useTranslation(lng, 'common');
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDark } = useTheme();

  const handleLogout = (): void => {
    deleteCookie(TOKEN);
    deleteCookie(ROLE);
    dispatch(logout());
    resetStore(dispatch);

    dropdownRef.current.setDropdownOpen(false);
    router.push(
      getPathname(
        lng,
        user.role.name === Role.ADMIN ? routes.ADMIN_LOGIN : routes.LOGIN,
      ),
    );
  };

  const handleViewProfile = (): void => {
    dropdownRef.current.setDropdownOpen(false);
    router.push(getPathname(lng, routes.PROFILE));
  };

  return (
    <Dropdown
      ref={dropdownRef}
      label={
        <>
          <Image
            className="w-8 h-8 rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatar.url}`}
            width="32"
            height="32"
            alt="avatar user"
            unoptimized
          />
          <div className="flex items-center gap-1">
            <span
              className={classNames(
                'truncate ml-2 text-sm font-medium max-w-24',
                isDark
                  ? 'text-gray-100 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-800',
              )}
            >
              {user.username}
            </span>
            <ChevronDown className="shrink-0 ml-1 text-gray-base" size={17} />
          </div>
        </>
      }
    >
      <div
        className={classNames(
          'pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200',
          { '!border-gray-700/60': isDark },
        )}
      >
        <div
          className={classNames('font-medium text-gray-800 max-w-40 truncate', {
            '!text-gray-100': isDark,
          })}
        >
          {user.username}
        </div>
        <div className="text-xs text-gray-base-hover italic">
          {user.role.name}
        </div>
      </div>
      <ul>
        <li>
          <button
            className="font-medium text-sm text-violet-base flex items-center py-1 px-3"
            onClick={handleViewProfile}
          >
            {t('profile')}
          </button>
        </li>
        <li>
          <button
            className="font-medium text-sm text-violet-base flex items-center py-1 px-3"
            onClick={handleLogout}
          >
            {t('sign_out')}
          </button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default DropdownProfile;
