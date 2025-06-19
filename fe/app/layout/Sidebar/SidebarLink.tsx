'use client';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { FC } from 'react';

type SidebarLinkProps = {
  sidebarExpanded: boolean;
  menu: Sidebar.Menu;
};

const SidebarLink: FC<SidebarLinkProps> = ({
  sidebarExpanded,
  menu,
}): JSX.Element => {
  const pathname = usePathname();
  const isActive = pathname === menu.href;

  return (
    <li
      className={classNames(
        'pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-gradient-to-r hover-menu transition duration-150',
        { 'active-menu': isActive },
      )}
    >
      <Link href={menu.href} className="block text-menu truncate">
        <div className="flex items-center">
          {menu.icon && (
            <menu.icon
              size={18}
              className={classNames(
                'shrink-0',
                isActive ? 'text-violet-500' : 'text-gray-base',
              )}
            />
          )}
          <span
            className={classNames(
              'text-sm font-medium text-menu ml-4 opacity-0 duration-200',
              { '!opacity-100': sidebarExpanded },
            )}
          >
            {menu.label}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default SidebarLink;
