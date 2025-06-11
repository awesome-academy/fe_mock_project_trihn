import type { InitOptions } from 'i18next';
export const fallbackLng = 'en';
export const languages = [fallbackLng, 'vi'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
