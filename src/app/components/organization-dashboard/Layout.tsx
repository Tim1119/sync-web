"use client";

import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Home, Users, CreditCard, Lock, Settings, LogOut, Menu, Search, Bell, Sun, Moon, ChevronDown, User, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

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

const DashboardLayout: React.FC<{ children: ReactNode; activePath: string }> = ({ children, activePath }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gray-50 dark:bg-[#0B0E14]" />;

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0B0E14] transition-colors duration-300 overflow-hidden">
      
      {/* 1. DESKTOP HEADER */}
      <header className="hidden lg:flex justify-between items-center p-4 bg-white dark:bg-[#161B22] shadow-sm border-b border-gray-200 dark:border-gray-800 z-50 h-20 shrink-0">
        <div className="flex items-center space-x-6 lg:pl-10">
          <Image 
            src="/dashboard/sync-dashboard-logo.svg" 
            alt="Sync Logo" 
            width={100} 
            height={60} 
            className="dark:invert dark:brightness-200"
          />
        </div>

        <div className="flex items-center space-x-2">
          {/* Global Search */}
          <div className="relative hidden xl:block mr-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="pl-10 pr-4 py-2 border dark:border-gray-700 rounded-full bg-gray-50 dark:bg-[#0D1117] outline-none w-64 focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
            />
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Dropdown Container */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
              className="p-2.5 bg-[#DBE2FF] dark:bg-inherit  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#161B22]"></span>
            </button>

            <AnimatePresence>
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1C2128] border dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                      <span className="font-bold text-sm">Notifications</span>
                      <button className="text-xs text-blue-500 font-semibold hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      <NotificationItem 
                        icon={<AlertCircle className="text-orange-500 w-4 h-4" />} 
                        title="New Application" 
                        desc="Ethan Harper submitted a student request." 
                        time="2m ago" 
                      />
                      <NotificationItem 
                        icon={<CheckCircle className="text-green-500 w-4 h-4" />} 
                        title="System Update" 
                        desc="Security patch v2.4 applied successfully." 
                        time="1h ago" 
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Dropdown Container */}
          <div className="relative ml-2">
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
              className="flex items-center gap-3 p-1.5 pr-4 bg-gray-50 dark:bg-gray-800/50 rounded-full border dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-900 transition-all"
            >
              <Image src="/dashboard/profile-pics/image-2.svg" alt="Profile" width={32} height={32} className="rounded-full shadow-sm" />
              <span className="text-sm font-bold dark:text-gray-200 hidden xl:block">Admin</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showProfile && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1C2128] border dark:border-gray-700 rounded-2xl shadow-2xl z-50 py-2"
                  >
                    <Link href="/dashboard/profile" className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <User className="w-4 h-4 mr-3 text-gray-400" /> My Profile
                    </Link>
                    <Link href="/dashboard/admin" className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Settings className="w-4 h-4 mr-3 text-gray-400" /> Settings
                    </Link>
                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-2 mx-2" />
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-bold">
                      <LogOut className="w-4 h-4 mr-3" /> Logout
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT ROW */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="font-[inter] hidden lg:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-[#DBE2FF] dark:bg-[#0D1117]  mx-0 my-0 mr-0 rounded-md shrink-0 h-[calc(100%-2rem)] transition-colors duration-300">
          <div className="px-8 py-8 flex items-center gap-3">
            {/* <div className="bg-white p-1 rounded-lg dark:bg-gray-800 shadow-sm"> */}
               <Image src="/dashboard/profile-pics/image-2.svg" alt="Uni Logo" width={32} height={32} className="rounded-md cursor-pointer" /> 
            {/* </div> */}
            <div className="text-xl text-[#030C32] font-[500] dark:text-blue-400 tracking-tight">FUTA</div>
          </div>
          
          <nav className="flex-grow overflow-y-auto px-4 space-y-1.5 custom-scrollbar">
            {navItems.map((item) => {
              const isActive = activePath === item.href || (item.href !== '/dashboard' && activePath.startsWith(item.href));
              return (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className={`font-[inter] font-[500] group relative flex items-center p-3 text-sm rounded-sm transition-all ${
                    isActive 
                    ? 'bg-white dark:bg-blue-600 text-blue-700 dark:text-white' 
                    : 'text-[#030C32] dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="side-pill" className="absolute right-0  h-full  w-1 bg-[#113CFC] dark:bg-white rounded-r-sm" />
                  )}
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-6">
            <button className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 group">
              <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Logout
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 lg:p-10 pb-24 lg:pb-10"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-[#161B22] border-t border-gray-200 dark:border-gray-800 shadow-2xl z-[60] safe-area-bottom">
        <div className="flex justify-around items-center h-16 px-2">
          <MobileNavItem href="/dashboard" icon={<Home />} label="Home" isActive={activePath === '/dashboard'} />
          <MobileNavItem href="/dashboard/students" icon={<Users />} label="Students" isActive={activePath.startsWith('/dashboard/students')} />
          
          {/* Mobile Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-gray-500 dark:text-gray-400"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            <span className="text-[10px] mt-1 font-bold">Theme</span>
          </button>

          <MobileNavItem href="/dashboard/cards" icon={<CreditCard />} label="Cards" isActive={activePath.startsWith('/dashboard/cards')} />
          <MobileNavItem href="/dashboard/admin" icon={<Settings />} label="Settings" isActive={activePath.startsWith('/dashboard/admin')} />
        </div>
      </nav>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const NotificationItem = ({ icon, title, desc, time }: { icon: ReactNode, title: string, desc: string, time: string }) => (
  <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors flex gap-3">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{title}</h4>
        <span className="text-[10px] text-gray-400 font-medium">{time}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{desc}</p>
    </div>
  </div>
);

const MobileNavItem = ({ href, icon, label, isActive }: { href: string, icon: React.ReactElement, label: string, isActive: boolean }) => (
  <Link 
    href={href} 
    className={`flex flex-col items-center justify-center w-12 h-12 transition-all ${
      isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-400 dark:text-gray-500'
    }`}
  >
    {React.cloneElement(icon, { className: 'w-5 h-5' })} 
    <span className={`text-[10px] mt-1 font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </Link>
);

export default DashboardLayout;