// src/app/components/organization-dashboard/Layout.tsx

import React, { ReactNode } from 'react';
import { Home, Users, CreditCard, Lock, Settings, LogOut, Menu, Search, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

const navItems: Omit<NavItemProps, 'isActive'>[] = [
  { href: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
  { href: '/dashboard/students', icon: <Users className="w-5 h-5" />, label: 'Students' },
  { href: '/dashboard/cards', icon: <CreditCard className="w-5 h-5" />, label: 'Cards' },
  { href: '/dashboard/access', icon: <Lock className="w-5 h-5" />, label: 'Access Control' },
  { href: '/dashboard/services', icon: <Menu className="w-5 h-5" />, label: 'Services' },
  { href: '/dashboard/reports', icon: <LogOut className="w-5 h-5" />, label: 'Reports' },
  { href: '/dashboard/admin', icon: <Settings className="w-5 h-5" />, label: 'Admin Settings' },
];

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => (
  <Link href={href} className={`flex items-center p-3 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-50 text-blue-700'
      : 'text-gray-600 hover:bg-gray-100'
  }`}>
    {icon}
    <span className="ml-3">{label}</span>
  </Link>
);

interface DashboardLayoutProps {
  children: ReactNode;
  activePath: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activePath }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Desktop Sidebar (Hidden on mobile) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6">
          <Image src="/sync-logo.svg" alt="Sync Logo" width={80} height={32} /> 
        </div>
        
        {/* User Info & FUTA Text */}
        <div className="p-6 bg-blue-700 text-white flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">M</div>
          <div className="text-lg font-semibold">FUTA</div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-grow">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activePath.startsWith(item.href) && (activePath === item.href || item.href !== '/dashboard')} 
            />
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Desktop/Tablet Header (Simple search/profile) */}
        <header className="hidden lg:flex justify-end items-center p-4 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-full focus:ring-blue-500 focus:border-blue-500" />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
            <Image src="/profile-pic.jpg" alt="Profile" width={32} height={32} className="rounded-full" /> 
          </div>
        </header>

        {/* The actual page content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* 3. Mobile Bottom Navigation (Hidden on desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          <MobileNavItem href="/dashboard" icon={<Home />} label="Home" isActive={activePath === '/dashboard'} />
          <MobileNavItem href="/dashboard/students" icon={<Users />} label="Students" isActive={activePath.startsWith('/dashboard/students')} />
          <MobileNavItem href="/dashboard/cards" icon={<CreditCard />} label="Cards" isActive={activePath.startsWith('/dashboard/cards')} />
          <MobileNavItem href="/dashboard/admin" icon={<Settings />} label="Settings" isActive={activePath.startsWith('/dashboard/admin')} />
        </div>
      </nav>
    </div>
  );
};

// Simple mobile nav item for the bottom bar
const MobileNavItem: React.FC<Omit<NavItemProps, 'isActive' | 'icon'> & { icon: ReactNode, isActive: boolean }> = ({ href, icon, label, isActive }) => (
  <Link 
    href={href} 
    className={`flex flex-col items-center text-xs p-2 transition-colors ${
      isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })} 
    <span className="mt-1">{label}</span>
  </Link>
);

export default DashboardLayout;