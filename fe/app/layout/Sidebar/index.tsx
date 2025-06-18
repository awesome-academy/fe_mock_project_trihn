'use client';
import React, { useState, useEffect, type FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

import { getSidebar } from '@/app/utils/sidebar';
import { useTranslation } from '@/app/i18n/client';
import { getPathname } from '@/app/utils/helpers';
import { routes } from '@/app/utils/routes';
import { SIDEBAR_EXPANDED } from '@/app/utils/constants';
import Logo from '@/app/icon/Logo';
import SidebarLinkGroup from './SidebarLinkGroup';
import SidebarLink from './SidebarLink';

const Sidebar: FC<App.Lang> = ({ lng }) => {
  const { t } = useTranslation(lng, 'sidebar');
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_EXPANDED);
    if (stored) {
      setSidebarExpanded(stored === 'true');
    }
  }, []);

  const handleSidebarExpanded = (expanded: boolean): void => {
    setSidebarExpanded(expanded);
    localStorage.setItem(SIDEBAR_EXPANDED, String(expanded));
  };

  return (
    <div className="min-w-fit">
      <aside
        className={classNames(
          'flex flex-col absolute z-40 left-0 top-0 lg:static h-[100dvh] overflow-x-hidden overflow-y-auto no-scrollbar w-20 shrink-0 bg-sidebar p-4 ease-in-out translate-x-0',
          { '!w-64': sidebarExpanded },
        )}
      >
        <div className="mb-10 pr-3">
          <Link href={getPathname(lng, routes.DASHBOARD)} className="block">
            <Logo />
          </Link>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-base-content font-semibold pl-3">
              <span
                className={classNames('hidden', { '!block': sidebarExpanded })}
              >
                {t('pages')}
              </span>
            </h3>
            <ul className="mt-3">
              {getSidebar(lng, t).map((item) =>
                item.subMenu ? (
                  <SidebarLinkGroup
                    key={item.label}
                    sidebarExpanded={sidebarExpanded}
                    menu={item}
                    onClick={() => handleSidebarExpanded(true)}
                  />
                ) : (
                  <SidebarLink
                    key={item.label}
                    menu={item}
                    sidebarExpanded={sidebarExpanded}
                  />
                ),
              )}
            </ul>
          </div>
        </div>
        <div className="pt-3 inline-flex justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-base text-gray-base-hover"
              onClick={() => handleSidebarExpanded(!sidebarExpanded)}
            >
              {sidebarExpanded ? (
                <ArrowLeftToLine className="shrink-0 text-gray-base" />
              ) : (
                <ArrowRightToLine className="shrink-0 text-gray-base" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
