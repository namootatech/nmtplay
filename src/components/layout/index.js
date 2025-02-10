// components/Layout.js
import Head from 'next/head';
import { NavBar } from './nav';
import { Ban } from 'lucide-react';
import Banner from '../Banner';

const Layout = ({
  title = 'NMTPlay - Download Free Files',
  description = 'Tyhini molo nantsika!, nantsi iwebsite  yoku downloada izinto ozidingayo for your phone, laptop or computer. Sinazo iiDocuments nee Form , Exam papers nee Memo, iiApps, iiGames, Umculo kanti even nee movies, vela apha ubone nawe!',
  keywords = 'free downloads, eastern cape, kasi file sharing, kasi, kasi file,  kasi files, free music, memes, videos, South African content, Free downloads, Documents, Government Forms, File sharing, Exam papers, Memos, Programs, Apps, Music, Gutyulla, iiFiles, iifree downloads, ii apps ezi pro, University Forms, Business Document Templates, Contract Templates, CV Templates, CV documents, How to write a cv, cv writers in the eastern cape, copywriters in the eastern cape',
  ogImage = '/og.png',
  children,
}) => {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta charset='utf-8' />

        <base href='/' />

        <meta
          name='description'
          content='Tyhini molo nantsika!, nantsi iwebsite  yoku downloada izinto ozidingayo for your phone, laptop or computer. Sinazo iiDocuments nee Form , Exam paqpers nee Memo, iiApps, iiGames, Umculo kanti even nee movies, vela apha ubone nawe!'
        />
        <meta
          name='keywords'
          content='Free downloads, Documents, Government Forms, File sharing, Exam papers, Memos, Programs, Apps, Music, Gutyulla, iiFiles, iifree downloads, ii apps ezi pro, University Forms, Business Document Templates, Contract Templates, CV Templates, CV documents, How to write a cv, cv writers in the eastern cape, copywriters in the eastern cape'
        />
        <meta name='author' content='NMT Play' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <meta property='og:title' content='NMT PLay - Umgutyulo wee files' />
        <meta
          property='og:description'
          content='Tyhini molo nantsika!, nantsi iwebsite  yoku downloada izinto ozidingayo for your phone, laptop or computer. Sinazo iiDocuments nee Form , Exam paqpers nee Memo, iiApps, iiGames, Umculo kanti even nee movies, vela apha ubone nawe!'
        />
        <meta property='og:image' content='https://www.nmtplay.co.za/og.png' />
        <meta property='og:url' content='https://www.nmtplay.co.za' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='NMTPlay' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='NMT Play - Umgutyulo wee files' />
        <meta
          name='twitter:description'
          content='Tyhini molo nantsika!, nantsi iwebsite  yoku downloada izinto ozidingayo for your phone, laptop or computer. Sinazo iiDocuments nee Form , Exam paqpers nee Memo, iiApps, iiGames, Umculo kanti even nee movies, vela apha ubone nawe!'
        />
        <meta name='twitter:image' content='https://www.nmtplay.co.za/og.png' />
        <meta name='twitter:site' content='@nmtplay' />
        <meta name='color-scheme' content='light dark' />
        <meta
          name='viewport'
          content='viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta name='format-detection' content='telephone=no' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='android-mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#06b6d4' />
        <meta name='theme-color' content='#06b6d4' />

        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content='NMTPlay' />

        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='application-name' content='NMTPlay' />

        <link rel='icon' href='/favicon/favicon.ico' type='image/x-icon' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicon/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-title' content='NMTPlay' />
        <meta name='apple-mobile-web-app-status-bar-style' content='yellow' />

        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
        <meta name='bingbot' content='index, follow' />
        <meta name='rating' content='general' />
        <meta name='distribution' content='global' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
        <meta http-equiv='Content-Language' content='en' />
        <meta http-equiv='Content-Script-Type' content='text/javascript' />
        <meta http-equiv='Content-Style-Type' content='text/css' />
        <meta
          http-equiv='Content-Location'
          content='https://www.nmtplay.co.za'
        />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon/apple-touch-icon.png' sizes='any' />
        <link rel='icon' href='/favicon/favicon-32x32.png' sizes='any' />
        <link rel='icon' href='/favicon/favicon-16x16.png' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' />
        <link
          rel='apple-touch-icon-precomposed'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          href='/favicon/android-chrome-512x512.png'
          sizes='any'
        />
        <link
          rel='icon'
          href='/favicon/android-chrome-192x192.png'
          sizes='any'
        />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='author' content='NMT Play' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={ogImage} />
        <meta
          property='og:url'
          content={process.env.NEXT_PUBLIC_BASE_URL || 'https://nmtplay.co.za'}
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
        <link rel='icon' type='image/svg+xml' href='/favicon.ico' />
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

      <main className='text-gray-700 bg-gray-900'>
        <div>{children}</div>
        <section class='py-24 bg-gray-900'>
          <div class='max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 '>
            <div class='w-full text-white relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-500 to-gray-900 dark:from-gray-900'>
              <div class='absolute right-0 top-0 h-full w-full flex justify-end'>
                <div class='w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl'>
                  <span class='absolute w-16 h-16 -top-1 -right-1 bg-fuchsia-500 rounded-md rotate-45'></span>
                  <span class='absolute w-16 h-16 -bottom-1 -right-1 bg-teal-500 rounded-md rotate-45'></span>
                  <span class='absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45'></span>
                </div>
              </div>

              <div class='absolute left-0 bottom-0 h-full w-full flex items-end'>
                <div class='w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl'>
                  <span class='absolute w-16 h-16 -top-1 -right-1 bg-fuchsia-500 rounded-md rotate-45'></span>
                  <span class='absolute w-16 h-16 -bottom-1 -right-1 bg-teal-500 rounded-md rotate-45'></span>
                  <span class='absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45'></span>
                </div>
              </div>
              <div class='mx-auto text-center max-w-xl md:max-w-2xl relative space-y-8'>
                <h1 class='text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold text-fuchsia-150 dark:text-white'>
                  Le website ngesNgesi sithi yi
                  <span class='text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 from-20% via-indigo-400 via-30% to-teal-600'>
                    File Sharing website
                  </span>{' '}
                  for abantu base Eastern Cape
                </h1>
                <p class='text-gray-100 dark:text-gray-300'>
                  Ayika gqitywa ntozakuthi kodwa Lena yi website eyenzelwe abo
                  bathetha ulwimi lwesiXhosa ingakumbi abo base Eastern Cape
                  province yakweli lase South Africa. Sizama ukwakha isizwe
                  kwezobu chwephesha bantakwethu.Ngumqweno wethu ukuba nabanye
                  bavele nezabo iinitiatives eziphuhlisa isizwe sabantsundu.
                  Ngalawo sithi makwande apho nithatha khona kudede ubumyama
                  kuvele ukukhanya, Canmagu ntozobawo.
                </p>
                <div class='mx-auto max-w-md sm:max-w-xl flex justify-center'>
                  <button class='outline-none h-12 px-5 rounded-xl bg-fuchsia-600 text-white flex items-center'>
                    Get In touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Banner />
        <footer class='bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
          <div class='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
            <span class='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
              © 2023{' '}
              <a href='https://flowbite.com/' class='hover:underline'>
                NMTPlay™
              </a>
              . All Rights Reserved.
            </span>
            <ul class='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
              <li>
                <a href='#' class='hover:underline me-4 md:me-6'>
                  Ngathi
                </a>
              </li>
              <li>
                <a href='#' class='hover:underline me-4 md:me-6'>
                  iPrivacy Policy Yethu
                </a>
              </li>
              <li>
                <a href='#' class='hover:underline me-4 md:me-6'>
                  iMigaqo Siseko Yethu
                </a>
              </li>
              <li>
                <a href='#' class='hover:underline'>
                  Sifumaneka Njani
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Layout;
