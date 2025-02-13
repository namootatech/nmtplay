import Head from 'next/head';
import '@/styles/global.css';
// import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/util/auth/context';
import PortalLayout from '@/components/layout/portal';
import Layout from '@/components/layout';
// import Banner from '@/components/Banner';

export default function App({ Component, pageProps }) {
  const isPortalAuthRoute =
    typeof window !== 'undefined' &&
    window.location.pathname === '/portal/auth';
  const isPortalRoute =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/portal') &&
    !isPortalAuthRoute;
  const PageLayout = isPortalRoute ? PortalLayout : Layout;

  return (
    <>
      <Head>
        <meta name="ppck-ver" content="91377b8d6f3e95025cc9d9733176c7bb" />
      </Head>
      <AuthProvider>
        <PageLayout>
          <Component {...pageProps} />  
        </PageLayout>
      </AuthProvider>
    </>
  );
}
