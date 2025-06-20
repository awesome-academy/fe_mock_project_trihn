'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import Table from '@/app/components/Table';
import { SortDirection } from '@/app/utils/enum';
import SearchBar from '@/app/components/SearchBar';
import ActionTable from '@/app/components/ActionTable';
import axios from '@/app/lib/axios';

const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    username: 'admin',
    confirmed: true,
    blocked: false,
  },
  {
    id: 2,
    email: 'john.doe@example.com',
    username: 'johndoe',
    confirmed: true,
    blocked: false,
  },
  {
    id: 3,
    email: 'jane.doe@example.com',
    username: 'janedoe',
    confirmed: false,
    blocked: true,
  },
  {
    id: 4,
    email: 'guest@example.com',
    username: 'guest',
    confirmed: false,
    blocked: false,
  },
];

//TODO
export default function UsersPage({ params: { lng } }: App.LanguageProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const search = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort');

  const { sortKey, sortDir } = useMemo(() => {
    if (!sortParam) return { sortKey: undefined, sortDir: undefined };
    const [key, dir] = sortParam.split(':');
    if (!key || (dir !== SortDirection.ASC && dir !== SortDirection.DESC))
      return { sortKey: undefined, sortDir: undefined };
    return { sortKey: key, sortDir: dir as SortDirection };
  }, [sortParam]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (field: string) => {
    const current = searchParams.get('sort') || '';
    const [currentKey, currentDir] = current.split(':');
    const nextDir =
      currentKey === field && currentDir === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    updateParams({ sort: `${field}:${nextDir}`, page: '1' });
  };

  const handleSearch = (value: string): void => {
    updateParams({ search: value, page: '1' });
  };

  const handleChangePage = (page: number): void => {
    updateParams({ page: page.toString() });
  };

  const handleChangePageSize = (size: number): void => {
    updateParams({ pageSize: size.toString(), page: '1' });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const query = qs.stringify(
          {
            pagination: {
              page,
              pageSize,
            },
            sort: sortKey ? [`${sortKey}:${sortDir}`] : undefined,
            filters: search
              ? {
                  username: {
                    $containsi: search,
                  },
                }
              : undefined,
            populate: {
              role: {
                fields: ['name'],
              },
              avatar: {
                fields: ['url'],
              },
            },
          },
          { encodeValuesOnly: true },
        );

        const res = await axios.get(`/users?${query}`);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize, sortKey, sortDir, search]);

  return (
    <>
      <SearchBar
        name="username"
        addLabel="Add"
        placeholder="Search..."
        defaultValue={search}
        onSearch={handleSearch}
        onAdd={() => {}}
      />
      <Table
        data={mockUsers}
        loading={loading}
        sortKey={sortKey}
        sortDir={sortDir as SortDirection}
        onSort={(key) => handleSort(key)}
        columns={[
          { title: 'Email', key: 'email' },
          { title: 'Username', key: 'username', sortable: true },
          {
            title: 'Confirmed',
            key: 'confirmed',
            render: (u) => (
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-success"
                // checked={u.confirmed}
              />
            ),
          },
          {
            title: 'Blocked',
            key: 'blocked',
            render: (u) => (
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-success"
                // checked={u.blocked}
              />
            ),
          },
          {
            title: 'Action',
            key: 'action',
            width: '100px',
            render: (u) => (
              <ActionTable onEdit={() => {}} onDelete={() => {}} />
            ),
          },
        ]}
        pagination={{
          lng,
          page,
          pageSize,
          total: 1,
          onChangePage: handleChangePage,
          onChangePageSize: handleChangePageSize,
        }}
      />
    </>
  );
}
