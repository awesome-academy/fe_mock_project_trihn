'use client';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Table from '@/app/components/Table';
import SearchBar from '@/app/components/SearchBar';
import ActionTable from '@/app/components/ActionTable';
import { Role, SortDirection } from '@/app/utils/enum';
import Avatar from '@/app/components/Avatar';
import useTable from '@/app/hooks/use-table';
import { useTranslation } from '@/app/i18n/client';
import {
  cleanupUsers,
  deleteUserRequest,
  fetchUsersRequest,
  toggleUserRequest,
} from '@/app/store/users/slice';
import Switch from '@/app/components/Switch';
import type { AppState } from '@/app/store';

export default function UsersPage({ params: { lng } }: App.LanguageProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, ['users', 'common']);
  const data = useSelector<AppState, Users.Users>(
    (state) => state.users.data,
    shallowEqual,
  );
  const { total, pageCount } = useSelector<AppState, App.Pagination>(
    (state) => state.users.pagination,
  );

  const {
    page,
    pageSize,
    search,
    sortKey,
    sortDir,
    loading,
    searchParamsToString,
    setLoading,
    handleSort,
    handleSearch,
    handleChangePage,
    handleChangePageSize,
  } = useTable();

  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsToString]);

  useEffect(() => {
    return () => {
      dispatch(cleanupUsers());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchUsers = (): void => {
    setLoading(true);
    dispatch(
      fetchUsersRequest({
        params: {
          page,
          pageSize,
          search,
          ...(sortKey && { sort: [`${sortKey}:${sortDir}`] }),
        },
        callback: {
          onFinish: () => {
            setLoading(false);
          },
        },
      }),
    );
  };

  const handleDeleteUser = (id: number): void => {
    const isLastItemRemoved = data.length === 1 && page === pageCount;
    dispatch(
      deleteUserRequest({
        id,
        t,
        callback: {
          onSuccess: () => {
            if (isLastItemRemoved) {
              const targetPage =
                isLastItemRemoved && page > 1 ? page - 1 : page;
              handleChangePage(targetPage);
            } else {
              handleFetchUsers();
            }
          },
        },
      }),
    );
  };

  const handleToggleUser = async (
    id: number,
    field: 'confirmed' | 'blocked',
    value: boolean,
  ) => {
    dispatch(toggleUserRequest({ id, field, value, t }));
  };

  const columns = [
    {
      title: t('email'),
      key: 'email',
      sortable: true,
      width: '300px',
      render: ({ avatar, email }: Users.User) => (
        <div className="flex items-center gap-2">
          <Avatar url={avatar?.url} />
          <span>{email}</span>
        </div>
      ),
    },
    { title: t('username'), key: 'username', sortable: true, width: '300px' },
    { title: t('birth_date'), key: 'birthDate', width: '130px' },
    { title: t('phone_number'), key: 'phoneNumber', width: '130px' },
    {
      title: t('gender'),
      key: 'gender',
      width: '100px',
      render: ({ gender }: Users.User) => t(gender),
    },
    {
      title: t('confirmed'),
      key: 'confirmed',
      width: '120px',
      render: ({ id, confirmed, role }: Users.User) => (
        <Switch
          checked={confirmed}
          disabled={role.name === Role.ADMIN}
          onChange={() => handleToggleUser(id, 'confirmed', !confirmed)}
        />
      ),
    },
    {
      title: t('blocked'),
      key: 'blocked',
      width: '110px',
      render: ({ id, blocked, role }: Users.User) => (
        <Switch
          checked={blocked}
          disabled={role.name === Role.ADMIN}
          onChange={() => handleToggleUser(id, 'blocked', !blocked)}
        />
      ),
    },
    {
      title: t('action'),
      key: 'action',
      width: '100px',
      render: ({ id, role }: Users.User) => (
        <ActionTable
          lng={lng}
          disabled={role.name === Role.ADMIN}
          onEdit={() => {}}
          onDelete={() => handleDeleteUser(id)}
        />
      ),
    },
  ];

  return (
    <>
      <SearchBar
        placeholder={t('search_email_or_username')}
        defaultValue={search}
        onSearch={handleSearch}
      />
      <Table<Users.User>
        data={data}
        loading={loading}
        sortKey={sortKey}
        sortDir={sortDir as SortDirection}
        onSort={handleSort}
        columns={columns}
        pagination={{
          lng,
          page,
          pageSize,
          total,
          onChangePage: handleChangePage,
          onChangePageSize: handleChangePageSize,
        }}
      />
    </>
  );
}
