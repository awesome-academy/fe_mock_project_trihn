'use client';
import { useEffect, useState, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@/app/components/Table';
import SearchBar from '@/app/components/SearchBar';
import ActionTable from '@/app/components/ActionTable';
import { I18nNamespace, Role, SortDirection } from '@/app/utils/enum';
import Avatar from '@/app/components/Avatar';
import useTable from '@/app/hooks/use-table';
import { useTranslation } from '@/app/i18n/client';
import {
  cleanupUsers,
  deleteUserRequest,
  fetchUserRequest,
  fetchUsersRequest,
  toggleUserRequest,
} from '@/app/store/users/slice';
import Switch from '@/app/components/Switch';
import UserFormModal from './UserFormModal';
import type { AppState } from '@/app/store';

const UsersContainer: FC<App.Lang> = ({ lng }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, [I18nNamespace.USERS]);
  const data = useSelector<AppState, Users.Users>((state) => state.users.data);
  const { total, pageCount } = useSelector<AppState, App.Pagination>(
    (state) => state.users.pagination,
  );
  const isLoggedIn = useSelector<AppState, boolean>(
    (state) => state.auth.isLoggedIn,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    if (isLoggedIn) {
      handleFetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsToString, isLoggedIn]);

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

  const handleToggleUser = (
    id: number,
    field: 'confirmed' | 'blocked',
    value: boolean,
  ): void => {
    dispatch(toggleUserRequest({ id, field, value, t }));
  };

  const handleEditUser = (id: number): void => {
    dispatch(
      fetchUserRequest({
        id,
        callback: {
          onFinish: () => {
            setIsOpen(true);
          },
        },
      }),
    );
  };

  const handleCloseModal = (isFetchUser = false) => {
    if (isFetchUser) {
      handleFetchUsers();
    }
    setIsOpen(false);
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
    {
      title: t('birth_date'),
      key: 'birthDate',
      width: '130px',
      render: ({ birthDate }: Users.User) => (
        <span className="whitespace-nowrap">{birthDate}</span>
      ),
    },
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
          onEdit={() => handleEditUser(id)}
          onDelete={() => handleDeleteUser(id)}
        />
      ),
    },
  ];

  if (!isLoggedIn) return <p />;

  return (
    <>
      <SearchBar
        placeholder={t('search_email_or_username')}
        defaultValue={search}
        onSearch={handleSearch}
        addLabel={t('add')}
        onAdd={() => setIsOpen(true)}
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
      {isOpen && <UserFormModal onClose={handleCloseModal} lng={lng} />}
    </>
  );
};

export default UsersContainer;
