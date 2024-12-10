import Head from 'next/head';
import {
  Home,
  Users,
  ShoppingCart,
  PieChart,
  Bell,
  Clipboard,
  Calendar,
  MessageCircle,
} from 'lucide-react';

import { Sidebar } from '@/components/sidebar';

export const metadata = {
  title: 'Configurable Sidebar',
  description: 'A configurable sidebar layout component',
};

const mainNavItems = [
  { title: 'Home', href: '/portal', icon: Home },
  { title: 'Social', href: '/portal/feed', icon: Users },
  { title: 'Articles', href: '/portal/articles', icon: ShoppingCart },
];

const sideNavItems = [
  { title: 'Files', href: '/portal/files', icon: Clipboard },
  { title: 'Friends', href: '/portal/friends', icon: Calendar },
  { title: 'Notifications', href: '/portal/notifications', icon: Bell },
  { title: 'Messages', href: '/portal/messages', icon: MessageCircle },
];

export default function PortalLayout({ children, pageTitle, pageDescription }) {
  return (
    <div className='portal flex h-screen overflow-hidden'>
      <Sidebar />
      <main className='overflow-y-auto p-2 md:w-full pt-20 bg-gray-800'>
        {children}
      </main>
    </div>
  );
}
