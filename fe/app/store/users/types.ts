import type { TFunction } from 'i18next';
import type { UserFormValues } from '@/app/validation/userSchema';

export type UsersStore = FetchUsersSuccess & {
  user: UserFormValues & { id?: number };
};

export type FetchUsersRequest = {
  params: App.Params;
  callback: App.Callback;
};

export type FetchUsersSuccess = {
  data: Users.Users;
  pagination: App.Pagination;
};

export type FetchUsersResponse = {
  data: Users.Users;
  meta: {
    pagination: App.Pagination;
  };
};

export type DeleteUserRequest = FetchUserRequest & {
  t: TFunction;
};

export type ToggleUserRequest = ToggleUserSuccess & {
  t: TFunction;
};

export type ToggleUserSuccess = {
  id: number;
  field: 'confirmed' | 'blocked';
  value: boolean;
};

export type CreateUserRequest = {
  payload: UserFormValues;
  t: TFunction;
  callback: App.Callback;
};

export type FetchUserRequest = {
  id: number;
  callback: App.Callback;
};

export type UpdateUserRequest = CreateUserRequest & { id: number };
