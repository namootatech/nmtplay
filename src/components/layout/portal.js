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
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

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
      <SidebarInset className='flex flex-col flex-1'>
        <main className='flex-1 overflow-y-auto p-6 bg-gray-800'>
          {children}
        </main>
      </SidebarInset>
    </div>
  );
}
