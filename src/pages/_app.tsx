// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Ajuste este caminho se seu CSS global estiver em outro lugar
import CookieBanner from 'components/CookieBanner';
import { GoogleAdsTag } from 'components/GoogleAdsTag';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <GoogleAdsTag />
      <Component {...pageProps} />
      <CookieBanner />
    </SessionProvider>
  );
}

export default MyApp;
