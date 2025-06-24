import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGINATION_INITIAL } from '@/app/utils/constants';
import type {
  DeleteUserRequest,
  FetchUsersRequest,
  FetchUsersSuccess,
  ToggleUserRequest,
  ToggleUserSuccess,
  UsersStore,
} from './types';

const initialState: UsersStore = {
  pagination: PAGINATION_INITIAL,
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest: (_, _action: PayloadAction<FetchUsersRequest>) => {},
    fetchUsersSuccess: (state, action: PayloadAction<FetchUsersSuccess>) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    deleteUserRequest: (_, _action: PayloadAction<DeleteUserRequest>) => {},
    toggleUserRequest: (_, _action: PayloadAction<ToggleUserRequest>) => {},
    toggleUserSuccess: (state, action: PayloadAction<ToggleUserSuccess>) => {
      const { id, field, value } = action.payload;
      const user = state.data.find((u) => u.id === id);
      if (user) {
        user[field] = value;
      }
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
  cleanupUsers,
} = usersSlice.actions;
export default usersSlice.reducer;
