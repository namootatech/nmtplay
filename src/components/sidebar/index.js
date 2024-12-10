'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  ShoppingCart,
  Clipboard,
  Calendar,
  Bell,
  MessageCircle,
  Plus,
  BookOpen,
  TrendingUp,
  DocumentAdd,
  Book,
  LogOut,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuth } from '@/util/auth/context';

const mainNavItems = [
  { title: 'Home', href: '/portal', icon: Home },
  { title: 'Social', href: '/portal/feed', icon: Users },
  { title: 'Articles', href: '/portal/articles', icon: ShoppingCart },
];

const HomeNavItems = [
  { title: 'Files', href: '/portal/files', icon: Clipboard },
  { title: 'Friends', href: '/portal/friends', icon: Calendar },
  { title: 'Notifications', href: '/portal/notifications', icon: Bell },
  { title: 'Messages', href: '/portal/messages', icon: MessageCircle },
];

const SocialNavItems = [
  { title: 'Create a post', href: '/portal/create-post', icon: Plus }, // Add Plus icon
  { title: 'Posts', href: '/portal/posts', icon: BookOpen }, // Add BookOpen icon
  { title: 'Trending', href: '/portal/trending', icon: TrendingUp }, // Add TrendingUp icon
];

const ArticleNavItems = [
  {
    title: 'Create an article',
    href: '/portal/create-article',
    icon: DocumentAdd,
  }, // Add DocumentAdd icon
  { title: 'Browse', href: '/portal/browse-articles', icon: Book }, // Add Book icon
  { title: 'Recommended', href: '/portal/recommended-articles', icon: Star }, // Add Star icon
];

export function Sidebar() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const handleResize = () => setIsMobile(mobile);
    setIsOpen(!mobile);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: {
      width: isMobile ? '80vw' : '240px',
      transition: { duration: 0.3 },
    },
    closed: { width: isMobile ? '0' : '64px', transition: { duration: 0.3 } },
  };

  console.log('Sidebar open', isOpen, toggleSidebar);

  const getActiveItems = () => {
    if (pathname.startsWith('/portal/feed')) return SocialNavItems;
    if (pathname.startsWith('/portal/articles')) return ArticleNavItems;
    return HomeNavItems;
  };

  const doLogout = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className='absolute md:relative'>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          aria-label='Toggle navbar'
          className='fixed  z-10 bg-transparent top-0 left-0 w-20 h-20 focus:outline-none border-l-4 rounded-md border-fuchsia-100 pl-3 relative py-3 flex items-center justify-center flex-col'
        >
          <span
            id='line-1'
            aria-hidden='true'
            className={`h-2 w-6 rounded bg-white dark:bg-gray-200 transition duration-300 ${
              isOpen ? 'rotate-45 translate-y-2.5 w-8' : ''
            }`}
          ></span>
          <span
            id='line-2'
            aria-hidden='true'
            className={`mt-2 h-2 w-6 rounded bg-white dark:bg-gray-200 transition duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5 w-8' : ''
            }`}
          ></span>
        </button>
      )}
      <motion.div
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className={cn(
          ' absolute md:relative top-0 z-0 h-screen w-screen md:w-1/6 bg-gray-900 text-white overflow-hidden transition-all duration-300 ease-in-out',
          isMobile && !isOpen ? 'w-0' : ''
        )}
      >
        <div className='flex flex-col h-full py-16 '>
          <div className='p-4'>
            <img
              src='/logo.png'
              alt='Site Logo'
              className='w-full h-20 w-auto'
            />
          </div>
          <nav className='flex-1 overflow-y-auto'>
            <ul className='space-y-2 p-2'>
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center p-2 rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-fuchsia-700 text-yellow-300'
                        : 'hover:bg-gray-800'
                    )}
                  >
                    <item.icon
                      size={24}
                      className={isOpen ? 'mr-2' : 'mx-auto'}
                    />
                    {isOpen && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='border-t border-gray-700 my-2'></div>
            <ul className='space-y-2 p-2'>
              {getActiveItems().map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center p-2 rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-fuchsia-700 text-yellow-300'
                        : 'hover:bg-gray-800'
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        size={24}
                        className={isOpen ? 'mr-2' : 'mx-auto'}
                      />
                    )}
                    {isOpen && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='p-4 border-t border-gray-700'>
            {isOpen && (
              <>
                <p className='text-sm mb-4 ml-2 text-fuchsia-500 font-bold'>
                  @{auth?.currentUser?.gama}
                </p>
                <p className='text-sm mb-4 ml-2'>
                  {auth?.currentUser?.nomyayi}
                </p>
              </>
            )}
            <button
              onClick={doLogout}
              className='flex items-center justify-center w-full p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors'
            >
              <LogOut size={24} className={isOpen ? 'mr-2' : ''} />
              {isOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
