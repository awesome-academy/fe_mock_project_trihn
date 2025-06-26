import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { PAGINATION_INITIAL } from '@/app/utils/constants';
import type {
  CreateUserRequest,
  DeleteUserRequest,
  FetchUserRequest,
  FetchUsersRequest,
  FetchUsersSuccess,
  ToggleUserRequest,
  ToggleUserSuccess,
  UpdateUserRequest,
  UsersStore,
} from './types';

const initialState: UsersStore = {
  pagination: PAGINATION_INITIAL,
  data: [],
  user: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest: (_, _action: PayloadAction<FetchUsersRequest>) => {},
    fetchUsersSuccess: (
      state: UsersStore,
      action: PayloadAction<FetchUsersSuccess>,
    ) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    deleteUserRequest: (_, _action: PayloadAction<DeleteUserRequest>) => {},
    toggleUserRequest: (_, _action: PayloadAction<ToggleUserRequest>) => {},
    toggleUserSuccess: (
      state: UsersStore,
      action: PayloadAction<ToggleUserSuccess>,
    ) => {
      const { id, field, value } = action.payload;
      const user = state.data.find((u) => u.id === id);
      if (user) {
        user[field] = value;
      }
    },
    createUserRequest: (_, _action: PayloadAction<CreateUserRequest>) => {},
    fetchUserRequest: (_, _action: PayloadAction<FetchUserRequest>) => {},
    fetchUserSuccess: (
      state: UsersStore,
      action: PayloadAction<Users.User>,
    ) => {
      const { avatar, birthDate, email, gender, id, phoneNumber, username } =
        action.payload;
      state.user = {
        birthDate: birthDate ? new Date(birthDate) : null,
        email,
        gender,
        id,
        phoneNumber,
        username,
        avatar: {
          url: avatar?.url,
          id: avatar?.id,
        },
      };
    },
    updateUserRequest: (_, _action: PayloadAction<UpdateUserRequest>) => {},
    cleanupUser: (state: UsersStore) => {
      state.user = cloneDeep(initialState.user);
    },
    cleanupUsers: () => initialState,
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  deleteUserRequest,
  toggleUserRequest,
  toggleUserSuccess,
  createUserRequest,
  fetchUserRequest,
  fetchUserSuccess,
  updateUserRequest,
  cleanupUser,
  cleanupUsers,
} = usersSlice.actions;
export default usersSlice.reducer;
