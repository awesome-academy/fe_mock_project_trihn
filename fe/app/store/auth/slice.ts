import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/app/utils/enum';
import type { AuthStore, LoginRequest } from './types';

const initialState: AuthStore = {
  isLoggedIn: false,
  user: {
    id: 0,
    email: '',
    username: '',
    role: {
      documentId: '',
      id: 0,
      name: Role.USER,
    },
    phoneNumber: '',
    gender: '',
    birthDate: '',
    avatar: {
      documentId: '',
      id: 0,
      url: '',
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (_, _action: PayloadAction<LoginRequest>) => {},
    loginSuccess: (state, action: PayloadAction<App.User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    fetchUserInfoRequest: () => {},
    logout: () => initialState,
  },
});

export const { loginRequest, loginSuccess, fetchUserInfoRequest, logout } =
  authSlice.actions;
export default authSlice.reducer;
