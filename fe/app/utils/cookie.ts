import { setCookie } from 'cookies-next';
import { ROLE, TOKEN } from './constants';
import type { OptionsType } from 'cookies-next/lib/types';

const getOptions = (remember: boolean): OptionsType => ({
  maxAge: remember ? 30 * 24 * 60 * 60 : undefined,
  sameSite: 'strict',
  path: '/',
});

export const setToken = (token: string, remember: boolean): void => {
  setCookie(TOKEN, token, getOptions(remember));
};

export const setRole = (role: string, remember: boolean): void => {
  setCookie(ROLE, role, getOptions(remember));
};
