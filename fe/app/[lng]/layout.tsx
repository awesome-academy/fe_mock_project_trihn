import { dir } from 'i18next';
import { ToastContainer } from 'react-toastify';
import { languages } from '@/app/i18n/settings';
import ThemeProvider from '@/app/components/ThemeProvider';
import StoreProvider from '@/app/components/StoreProvider';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import AuthLoader from '@/app/components/AuthLoader';
import type { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
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
        <ToastContainer position="top-right" autoClose={3000} />
        <ThemeProvider>
          <StoreProvider>
            <LoadingIndicator />
            <AuthLoader />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
