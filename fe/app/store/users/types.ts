import type { TFunction } from 'i18next';

export type UsersStore = {
  data: Users.Users;
  pagination: App.Pagination;
};

export type FetchUsersRequest = {
  params: App.Params;
  callback: App.Callback;
};

export type FetchUsersSuccess = UsersStore;

export type FetchUsersResponse = {
  data: Users.Users;
  meta: {
    pagination: App.Pagination;
  };
};

export type DeleteUserRequest = {
  id: number;
  t: TFunction;
  callback: App.Callback;
};

export type ToggleUserRequest = ToggleUserSuccess & {
  t: TFunction;
};

export type ToggleUserSuccess = {
  id: number;
  field: 'confirmed' | 'blocked';
  value: boolean;
};
