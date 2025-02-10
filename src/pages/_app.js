import '@/styles/global.css';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/util/auth/context';
import PortalLayout from '@/components/layout/portal';
import Layout from '@/components/layout';
import Banner from '@/components/Banner';
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
    <AuthProvider>
      <PageLayout>
        <Banner />
        <Component {...pageProps} />
        <Banner />
      </PageLayout>
    </AuthProvider>
  );
}
