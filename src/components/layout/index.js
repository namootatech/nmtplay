// components/Layout.js
import Head from 'next/head';
import { NavBar } from './nav';

const Layout = ({
  title = 'NMTPlay - Download Free Files',
  description = 'NMTPlay is the ultimate hub for downloading free apps, music, videos, memes, and more, tailored for the kasi industry.',
  keywords = 'free downloads, kasi files, free music, memes, videos, South African content',
  ogImage = '/default-og-image.png',
  children,
}) => {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='author' content='NMTPlay Team' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={ogImage} />
        <meta
          property='og:url'
          content={process.env.NEXT_PUBLIC_BASE_URL || 'https://nmtplay.com'}
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={ogImage} />
        <meta name='twitter:site' content='@nmtplay' />

        <link
          rel='icon'
          type='image/png'
          href='/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='NMT Play' />
        <link rel='manifest' href='/site.webmanifest' />
        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavBar />

      <main className='text-gray-700'>
        <div>{children}</div>
      </main>
    </>
  );
};

export default Layout;
