import { useState, useEffect, useCallback } from 'react';
import { SIDEBAR_EXPANDED } from '@/app/utils/constants';

export default function useSidebarExpanded() {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_EXPANDED);
    if (stored !== null) {
      setSidebarExpanded(stored === 'true');
    }
  }, []);

  const handleSidebarExpanded = useCallback((value: boolean) => {
    setSidebarExpanded(value);
    localStorage.setItem(SIDEBAR_EXPANDED, String(value));
  }, []);

  return {
    sidebarExpanded,
    handleSidebarExpanded,
  };
}
