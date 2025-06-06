declare namespace App {
  import type { ReactNode } from 'react';
  import type { Language } from '@/app/utils/enum';
  // eslint-disable-next-line
  type Any = any;

  type LanguageProps = {
    params: {
      lng: Language;
    };
  };

  type RootLayout = {
    children: ReactNode;
  } & LanguageProps;
}
