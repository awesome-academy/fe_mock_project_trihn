import { jwtDecode } from 'jwt-decode';
import storage from 'redux-persist/lib/storage';
import { AppDispatch } from '@/app/store';
import { I18nNamespace, Language } from './enum';
import type { TFunction } from 'i18next';

export const zodI18n = (t: TFunction) => ({
  required: (key: string) => ({
    message: t('required', { field: t(key), ns: I18nNamespace.VALIDATION }),
  }),
  invalid: (key: string) => ({
    message: t('invalid', { field: t(key), ns: I18nNamespace.VALIDATION }),
  }),
  min: (key: string, len: number) => ({
    message: t('min', { field: t(key), len, ns: I18nNamespace.VALIDATION }),
  }),
  max: (key: string, len: number) => ({
    message: t('max', { field: t(key), len, ns: I18nNamespace.VALIDATION }),
  }),
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

export const resetStore = async (dispatch: AppDispatch): Promise<void> => {
  const slices = ['auth', 'users'] as const;
  await Promise.all(slices.map((key) => storage.removeItem(`persist:${key}`)));
  slices.forEach((key) => dispatch({ type: `${key}/RESET` }));
};

export const getPaginationRange = (
  current: number,
  total: number,
  siblingCount: number,
): (number | '...')[] => {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPageNumbers >= total) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => i + 1,
    );
    return [...leftRange, '...', total];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => total - (3 + siblingCount * 2) + 1 + i,
    );
    return [1, '...', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, '...', ...middleRange, '...', total];
};

export function createFormData<T extends Record<string, App.Any>>(
  data: T,
  options?: {
    ignoreEmpty?: boolean;
    fileKeys?: (keyof T)[];
  },
): FormData {
  const formData = new FormData();
  const { ignoreEmpty = true, fileKeys = [] } = options || {};

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (fileKeys.includes(key as keyof T)) {
      if (Array.isArray(value) && value[0] instanceof File) {
        formData.append(key, value[0]);
      } else if (value instanceof File) {
        formData.append(key, value);
      }
      return;
    }

    if (ignoreEmpty && value === '') return;
    formData.append(key, value);
  });

  return formData;
}
