import { dir } from 'i18next';
import { languages } from '@/app/i18n/settings';
import ThemeProvider from '@/app/components/ThemeProvider';
import StoreProvider from '@/app/components/StoreProvider';
import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Cinema',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: App.RootLayout) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
