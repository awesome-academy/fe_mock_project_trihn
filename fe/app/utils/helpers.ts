import { jwtDecode } from 'jwt-decode';
import { AppDispatch, persistor } from '@/app/store';
import { Language } from './enum';
import type { TFunction } from 'i18next';

export const zodI18n = (t: TFunction) => ({
  required: (key: string) => ({ message: t(`${key}_required`) }),
  invalid: (key: string) => ({ message: t(`invalid_${key}`) }),
  min: (key: string, len: number) => ({ message: t(`${key}_min`, { len }) }),
  max: (key: string, len: number) => ({ message: t(`${key}_max`, { len }) }),
  email: () => ({ message: t('invalid_email') }),
});

export const isMatchRoute = (path: string, pattern: string): boolean => {
  const pathParts = path.split('/').filter(Boolean);
  const patternParts = pattern.split('/').filter(Boolean);

  if (pathParts.length !== patternParts.length) return false;

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) continue;
    if (patternParts[i] !== pathParts[i]) return false;
  }

  return true;
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
};

export const isMatch = (path: string, patterns: string[]): boolean =>
  patterns.some((pattern) => isMatchRoute(path, pattern));

export const getPathname = (lng: Language, pathname: string): string =>
  `/${lng}${pathname}`;

export const resetStore = (dispatch: AppDispatch): void => {
  persistor.purge();
  dispatch({ type: 'RESET_STORE' });
};
