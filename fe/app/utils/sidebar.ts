import { BarChart, Film, LayoutDashboard, Users } from 'lucide-react';
import { getPathname } from './helpers';
import { routes } from './routes';
import type { TFunction } from 'i18next';
import type { Language } from '@/app/utils/enum';

export const getSidebar = (lng: Language, t: TFunction): Sidebar.Menu[] => [
  {
    label: t('dashboard'),
    href: getPathname(lng, routes.DASHBOARD),
    icon: LayoutDashboard,
  },
  {
    label: t('users'),
    href: getPathname(lng, routes.USERS),
    icon: Users,
  },
  {
    label: t('movie_management'),
    icon: Film,
    subMenu: [
      { label: t('movies'), href: getPathname(lng, routes.MOVIES) },
      { label: t('showtimes'), href: getPathname(lng, routes.SHOWTIMES) },
    ],
  },
  {
    label: t('revenue'),
    href: getPathname(lng, routes.REVENUE),
    icon: BarChart,
  },
];
