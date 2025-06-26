export enum Language {
  VI = 'vi',
  EN = 'en',
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UN_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Role {
  USER = 'Authenticated',
  ADMIN = 'Admin',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum I18nNamespace {
  COMMON = 'common',
  LOGIN = 'login',
  SIDEBAR = 'sidebar',
  USERS = 'users',
  VALIDATION = 'validation',
}

export enum FormatDate {
  ISO_DATE = 'yyyy-MM-dd',
  ISO_DATETIME = 'yyyy-MM-dd HH:mm:ss',
  DISPLAY_DATETIME = 'dd/MM/yyyy HH:mm',
}
