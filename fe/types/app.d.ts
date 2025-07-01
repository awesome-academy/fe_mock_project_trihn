declare namespace App {
  import type { ReactNode } from 'react';
  import type { Language, StatusCode, Role } from '@/app/utils/enum';
  // eslint-disable-next-line
  type Any = any;

  type Lang = {
    lng: Language;
  };

  type LanguageProps = {
    params: Lang;
  };

  type RootLayout = {
    children: ReactNode;
  } & LanguageProps;

  type BaseData = {
    documentId: string;
    id: number;
    name: string;
  };

  type User = {
    id: number;
    email: string;
    username: string;
    role: Omit<BaseData, 'name'> & {
      name: Role;
    };
    phoneNumber: string;
    gender: string;
    birthDate: string;
    avatar: Omit<BaseData, 'name'> & {
      url: string;
    };
  };

  type Error = {
    message: string;
    name: string;
    status: StatusCode;
  };

  type Callback = {
    onSuccess?: (...args) => void;
    onFailure?: (...args) => void;
    onFinish?: (...args) => void;
  };

  type Pagination = {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };

  type Meta = {
    pagination: Pagination;
  };

  type Params = {
    page: number;
    pageSize: number;
    sort?: string[];
    search: string;
  };
}
