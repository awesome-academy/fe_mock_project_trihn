'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SortDirection } from '@/app/utils/enum';

export default function useTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true); //loading sekeleton for table

  const safeParseInt = (value: string, fallback: number): number => {
    const parsed = parseInt(value ?? '', 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  // Extract params from URL
  const page = safeParseInt(searchParams.get('page'), 1);
  const pageSize = safeParseInt(searchParams.get('pageSize'), 10);
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort');

  const { sortKey, sortDir } = useMemo(() => {
    if (!sort) return { sortKey: undefined, sortDir: undefined };
    const [key, dir] = sort.split(':');
    if (!key || (dir !== SortDirection.ASC && dir !== SortDirection.DESC))
      return { sortKey: undefined, sortDir: undefined };
    return { sortKey: key, sortDir: dir as SortDirection };
  }, [sort]);

  const searchParamsToString = useMemo(
    () => searchParams.toString(),
    [searchParams],
  );

  //Update query params in URL
  const updateParams = (
    updates: Record<string, string | number | undefined>,
  ): void => {
    setLoading(true);
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });
    router.push(`${pathname}?${current.toString()}`);
  };

  const handleSort = (key: string): void => {
    const isSame = sortKey === key;
    const nextDir =
      !isSame || sortDir === SortDirection.DESC
        ? SortDirection.ASC
        : SortDirection.DESC;
    updateParams({ sort: `${key}:${nextDir}`, page: 1 });
  };

  const handleSearch = (value: string): void => {
    if (value !== search) {
      updateParams({ search: value, page: 1 });
    }
  };

  const handleChangePage = (page: number): void => {
    updateParams({ page });
  };

  const handleChangePageSize = (size: number): void => {
    updateParams({ pageSize: size, page: 1 });
  };

  return {
    page,
    pageSize,
    search,
    sort,
    sortKey,
    sortDir,
    loading,
    searchParamsToString,
    setLoading,
    updateParams,
    handleSort,
    handleSearch,
    handleChangePage,
    handleChangePageSize,
  };
}
