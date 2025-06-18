declare namespace Sidebar {
  import type { ReactNode } from 'react';

  type MenuBase = {
    label: string;
    href?: string;
  };

  type Menu = MenuBase & {
    icon: ReactNode;
    subMenu?: Base[];
  };
}
