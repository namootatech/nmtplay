import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const navGroups = [
  {
    name: 'Media',
    items: [
      { name: 'Posts', href: '/posts' },
      { name: 'Memes', href: '/memes' },
      { name: 'Music', href: '/umculo' },
      { name: 'Videos', href: '/videos' },
      { name: 'Movies', href: '/type/movies' },
    ],
  },
  {
    name: 'Documents',
    items: [
      { name: 'CV Templates', href: '/type/cv-templates' },
      { name: 'Contracts', href: '/type/contracts' },
      { name: 'Books', href: '/iincwadi' },
      {
        name: 'Question Papers & Memos',
        href: '/amaphepha',
      },
    ],
  },
  {
    name: 'Downloads',
    items: [
      { name: 'Apps', href: '/apps' },
      { name: 'Computer Software', href: '/type/computer-softwares' },
      { name: 'PC Games', href: '/type/windows-games' },
      { name: 'FRP Bypass', href: '/type/frp-bypass-apps' },
      { name: 'Wallpapers', href: '/type/wallpapers' },
    ],
  },
  {
    name: 'Other',
    items: [
      { name: 'News', href: '/indaba' },
      { name: 'Airtime & Data', href: '/airtime-data' },
      { name: 'Competitions', href: '/competitions' },
    ],
  },
];

const NavGroup = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='px-2 py-2.5 hover:text-gray-100 flex items-center justify-between w-full'
      >
        {group.name}
        <span
          className={`ml-2 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <IoIosArrowDown />
        </span>
      </button>
      {isOpen && (
        <ul className='pl-4 mt-2 space-y-2 lg:absolute lg:left-0 lg:mt-0 lg:pl-0 lg:w-48 lg:bg-gray-800 lg:rounded-md lg:shadow-lg'>
          {group.items.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className='block px-4 py-2 hover:bg-gray-700 hover:text-gray-100'
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const NavBar = () => {
  return (
    <header className='absolute left-0 top-0 w-full flex items-center h-24 z-40 bg-gradient-to-r via-fuchsia-900 from-fuchsia-900 to-yellow-400 border-b-8 border-b-dashed border-b-gray-900 text-gray-100'>
      <nav className='relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center'>
        <div className='flex items-center min-w-max'>
          <Link href='/' className='font-semibold flex items-center gap-x-2'>
            <img src='/logo.png' alt='logo' className='w-40 h-16' />
          </Link>
        </div>

        <div
          data-navbar
          className='  relative top-full translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100 left-0 bg-white dark:bg-gray-950 lg:!bg-transparent  dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none lg:w-max lg:space-x-16 lg:top-0 lg:relative lg:flex duration-300 lg:transition-all ease-linear bg-gray-100'
        >
          <ul className='flex flex-col lg:flex-row gap-6 lg:items-center text-gray-200 dark:text-gray-300 lg:w-full lg:justify-center'>
            {navGroups.map((group, idx) => (
              <NavGroup key={idx} group={group} />
            ))}
            <li>
              <Link
                href='/portal/auth'
                className='px-2 py-2.5 hover:text-gray-100'
              >
                Register
              </Link>
            </li>
          </ul>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0'>
            <Link
              href='/portal/auth'
              className='flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full bg-white  dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-3 border-fuchsia-500 dark:border-gray-800'
            >
              Login
            </Link>
          </div>
        </div>
        <div className='flex items-center lg:hidden'>
          <button
            data-toggle-navbar
            data-is-open='false'
            aria-label='Toggle navbar'
            className='outline-none border-l border-l-fuchsia-100 dark:border-l-gray-800 pl-3 relative py-3 children:flex'
          >
            <span
              id='line-1'
              aria-hidden='true'
              className='h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-200 transition duration-300'
            ></span>
            <span
              id='line-2'
              aria-hidden='true'
              className='mt-2 h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-200 transition duration-300'
            ></span>
          </button>
        </div>
      </nav>
    </header>
  );
};
