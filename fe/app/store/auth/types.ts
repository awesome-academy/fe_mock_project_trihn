import type { LoginFormValues } from '@/app/validation/loginSchema';

export type AuthStore = {
  isLoggedIn: boolean;
  user: App.User;
};

export type LoginRequest = {
  payload: LoginFormValues;
  callback: App.Callback;
};
