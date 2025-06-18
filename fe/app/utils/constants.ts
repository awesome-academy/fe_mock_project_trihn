import Vietnam from '@/app/icon/Vietnam';
import England from '@/app/icon/England';
import { Language } from './enum';

export const REPLACE_LOCALE_REGEX = /[^\\/][-a-zA-Z]*/;

export const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const THEME = 'theme';

export const TOKEN = 'token';

export const ROLE = 'role';

export const REDIRECT_TO = 'redirectTo';

export const SIDEBAR_EXPANDED = 'sidebarExpanded';

export const LOGIN_ENDPOINT = '/auth/local';

export const LANGUAGES = {
  vi: {
    code: Language.VI,
    label: 'vietnamese',
    icon: Vietnam,
  },
  en: {
    code: Language.EN,
    label: 'english',
    icon: England,
  },
};
