'use client';
import { useState } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { FC } from 'react';

type SidebarLinkGroupProps = {
  sidebarExpanded: boolean;
  menu: Sidebar.Menu;
  onClick?: () => void;
};

const SidebarLinkGroup: FC<SidebarLinkGroupProps> = ({
  sidebarExpanded,
  menu,
  onClick,
}): JSX.Element => {
  const pathname = usePathname();
  const isActive = menu.subMenu.some(({ href }) => href === pathname);
  const [open, setOpen] = useState<boolean>(isActive);

  const handleClick = (): void => {
    setOpen(!open);
    onClick && onClick();
  };

  return (
    <li
      className={classNames(
        'pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-gradient-to-r hover-menu',
        { 'active-menu': isActive },
      )}
    >
      <button
        className="block w-full text-left text-menu truncate"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <menu.icon
              className={classNames(
                'shrink-0',
                isActive ? 'text-violet-500' : 'text-gray-base',
              )}
              size={18}
            />
            <span className="text-sm font-medium ml-4 text-base-content duration-200">
              {menu.label}
            </span>
          </div>
          <div className="flex shrink-0 ml-2">
            {open ? (
              <ChevronUp className="shrink-0 ml-1 text-gray-base" size={17} />
            ) : (
              <ChevronDown className="shrink-0 ml-1 text-gray-base" size={17} />
            )}
          </div>
        </div>
      </button>
      <div className={classNames(open && sidebarExpanded ? 'block' : 'hidden')}>
        <ul className="pl-8 mt-1">
          {menu.subMenu.map((subMenu) => (
            <li key={subMenu.href} className="mb-1 last:mb-0">
              <Link
                href={subMenu.href}
                className={classNames(
                  'block text-sm font-medium transition duration-150',
                  pathname === subMenu.href
                    ? 'text-violet-500'
                    : 'text-gray-500 hover:text-violet-500',
                )}
              >
                {subMenu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SidebarLinkGroup;
