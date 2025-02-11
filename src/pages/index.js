// pages/index.js
import Layout from '@/components/layout';
import Link from 'next/link';
import { SiApplemusic } from 'react-icons/si';
import { BsGooglePlay } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoDocuments } from 'react-icons/io5';
import { IoBookSharp } from 'react-icons/io5';
import { MdVideoLibrary } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { IoGameController } from 'react-icons/io5';
import { FaNewspaper } from 'react-icons/fa6';

const imigutyulo = [
  {
    igama: 'Umculo',
    ngawo:
      'Gutyula okanye umamele umculo walapha ekhaya okanye owa pheshey apha.',
    link: '/umculo',
    mfanekiso: <SiApplemusic />,
  },
  {
    igama: 'iiApps ezi tshisayo',
    ngawo:
      'Gutyula apha ii apps zakho ozithandayo ezivela kwabanye abagutyuli.',
    link: '/apps',
    mfanekiso: <BsGooglePlay />,
  },
  {
    igama: 'Memes',
    ngawo: 'Buka okanye uposte iipictures ezihlekisayo apha.',
    link: '/memes',
    mfanekiso: <MdEmojiEmotions />,
  },
  {
    igama: 'Exam Papers nee Memo',
    ngawo: 'Gutyula iipast exam papers ezihamba nee memo zazo apha',
    link: '/amaphepha',
    mfanekiso: <IoDocuments />,
  },
  {
    igama: 'Free Books',
    ngawo:
      'Gutyula iiPDF kunye nee Ebooks zeencwadi zemfundo okanye ezolonwabo apha.',
    link: '/iincwadi',
    mfanekiso: <IoBookSharp />,
  },
  {
    igama: 'Courses',
    ngawo: 'Buka, Funda okanye gutyula iicourses zezifundo ezininzi apha.',
    link: '/izifundo',
    mfanekiso: <GiTeacher />,
  },
  {
    igama: 'Videos',
    ngawo: 'Bukela okanye ugutyule iivideos.',
    link: '/type/video',
    mfanekiso: <MdVideoLibrary />,
  },
  {
    igama: 'Movies',
    ngawo:
      'Bukela okanye ugutyule iimovies ezintsha kunye nezindala, ezalapha ekhaya okanye ezaphesheya apha.',
    link: '/type/movies',
    mfanekiso: <MdVideoLibrary />,
  },

  {
    igama: 'Documents nee Forms',
    ngawo: 'Gutyula iiforms kunye nee document templates eziqhelekileyo apha.',
    link: '/iimpepha',
    mfanekiso: <IoDocuments />,
  },
  {
    igama: 'Umpixo',
    ngawo: 'Gutyula iigames ozithandayo ze foun okanye eze compyutha apha.',
    link: '/umpixo',
    mfanekiso: <IoGameController />,
  },
  {
    igama: 'Indaba',
    ngawo: 'Gutyula iindaba ezi fresh apha.',
    link: '/indaba',
    mfanekiso: <FaNewspaper />,
  },
];

const bounceAnimation = {
  animation: 'scale-anim 3s infinite',
  animationDelay: (index) => `${index * 0.5}s`, // Adjust the delay multiplier as needed
};

export default function HomePage() {
  return (
    <Layout
      title='NMTPlay - emGutyulweni'
      description='Gutyula iiapps, umculo, iimemes, kunye nezininzi apha kwa NMT Play.'
      keywords='kasi downloads, free files, South African music, umgutyulo, ukugutyula, iifiles ezi free, iincwadi ezi free, umculo ofree, gutyula umculo, gutyula iimovies, gutyu'
      ogImage='/home-og-image.png'
    >
      <section class='transition-all ease-in-out min-h-max bg-gray-800 dark:bg-gray-950'>
        <div class='transition-all ease-in-out relative mx-auto pt-32 pb-24 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10'>
          <h1 class='text-gray-300 z-10 relative dark:text-white mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight'>
            Welcome emGutyulweni, the place for free{' '}
            <span class='text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-yellow-400 '>
              Downloads
            </span>{' '}
            no Lwazi😁
          </h1>
          <p class='text-gray-200 text-lg dark:text-gray-300 mx-auto max-w-2xl'>
            <span class='text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-yellow-400 '>
              Tyhin molo nantsika,
            </span>{' '}
            wamkelekile emgutyulweni 😛, apho ku downloadwa khona into zasmahla
            and also learn new things 💪🏽. Make yourself at home tshomam and
            browse iisections okholwa zizo apha ngezantsi💚.
          </p>
          <div class='w-full text-left transform:scale-100 shadow-sm hover: hover:border-fuchsia-500  transition-all ease-in-out flex p-6 gap-y-8 dark:border-gray-800 max-w-2xl lg:max-w-5xl mx-auto flex-wrap'>
            {/* imigutyulo section */}
            {imigutyulo.map((umgutyulo, indx) => (
              <div
                className='w-full md:w-1/3 md:p-4 overflow:hidden hover:scale-105 transform hover:py-0 transition-all ease-in-out duration:300'
                key={indx}
              >
                <div
                  className={`w-full rounded-md  shadow-2xl shadow-gray-800 transition-all ease-in-out duration-300 
                cursor-pointer flex flex-col gap-4 bg-gray-900 p-8 h-full bg-gradient-to-br from-fuchsia-900
                  to-black border border-solid border-fuchsia-950 m-0 anim-bounce hover:bg-gradient-to-br 
                  hover:from-pink-800 hover:via-fuchsia-800 hover:to-fuchsia-950 hover:shadow-4xl 
                  hover:ease-in-out hover:my-0 hover:shadow-black hover:shadow-yl hover:scale-100`}
                  key={indx}
                  style={{
                    ...bounceAnimation,
                    animationDelay: bounceAnimation.animationDelay(indx),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.animationPlayState = 'paused';
                    e.currentTarget
                      .querySelectorAll('h2, p, .icon')
                      .forEach((el) => {
                        el.style.color = 'white';
                      });
                    e.currentTarget.querySelector('a').style.background =
                      'white';
                    e.currentTarget.querySelector('a').style.color = '#a21caf'; // fuchsia-700
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.animationPlayState = 'running';
                    e.currentTarget
                      .querySelectorAll('h2, p, .icon')
                      .forEach((el) => {
                        el.style.color = 'white';
                      });
                    e.currentTarget.querySelector('a').style.backgroundColor =
                      '#a21caf';
                    e.currentTarget.querySelector('a').style.color = 'white';
                  }}
                >
                  <div className='flex flex-col w-full justify-center items-center gap-6 lg:pr-6 pb-6 lg:pb-0 '>
                    <div className='w-10 text-gray-300 text-6xl text-center icon drop-shadow-2xl drop-shadow-black '>
                      {umgutyulo.mfanekiso}
                    </div>
                    <h2 className='text-gray-300 dark:text-white font-semibold text-lg'>
                      {umgutyulo.igama}
                    </h2>
                  </div>
                  <div className='flex flex-col gap-4 w-full justify-center items-center'>
                    <p className='text-gray-300 dark:text-gray-300 text-sm text-center'>
                      {umgutyulo.ngawo}
                    </p>
                    <Link
                      href={umgutyulo.link}
                      className='w-1/2 rounded-md shadow-sm bg-gradient-to-br from-fuchsia-500 to-fuschia-100 hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600 text-sm font-semibold text-white text-lg text-center py-2 px-4'
                    >
                      Ngena
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
