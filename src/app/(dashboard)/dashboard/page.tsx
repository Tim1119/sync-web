"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import DashboardCard from '../../components/organization-dashboard/DashboardCard';
import RecentActivityList from '../../components/organization-dashboard/RecentActivityList';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';
import { Upload, Bell, Search } from 'lucide-react';

// --- MOCK DATA ---
const desktopCardData = [
  { title: 'Uploaded Students', value: '1,250', change: '+10%', isPositive: true },
  { title: 'Students Enrolled', value: '1,100', change: '+5%', isPositive: true },
  { title: 'Student Unenrolled', value: '5', change: '-5%', isPositive: false },
  { title: 'Activated Today', value: '25', change: '+20%', isPositive: true },
];

const mobileCardData = [
  { title: 'Total Students Enrolled', value: '1,234', change: '+10%', isPositive: true, mobileTitle: 'Total Students' },
  { title: 'Active NFC Cards', value: '1,100', change: '+5%', isPositive: true, mobileTitle: 'Active NFC' },
  { title: 'Verifications Today', value: '25', change: '+20%', isPositive: true, mobileTitle: 'Verifications' },
  { title: 'Pending Requests', value: '5', change: '-5%', isPositive: false, mobileTitle: 'Pending Requests' },
];

const desktopActivities = [
  { id: 1, activity: 'Student Registration', date: '2025-06-20', status: 'Completed' as const },
  { id: 2, activity: 'Card Activation', date: '2025-06-19', status: 'Completed' as const },
  { id: 3, activity: 'Access Granted', date: '2025-06-18', status: 'Completed' as const },
  { id: 4, activity: 'Verification Request', date: '2025-06-17', status: 'Pending' as const },
  { id: 5, activity: 'Service Request', date: '2025-06-18', status: 'Completed' as const },
];

const mobileActivities = [
  { id: 1, activity: 'Student Enrolled', details: 'Student ID: 12345', avatarSrc: '/dashboard/profile-pics/image-1.svg' },
  { id: 2, activity: 'Card Activated', details: 'Card ID: 67890', avatarSrc: '/dashboard/profile-pics/image-2.svg' },
  { id: 3, activity: 'Verification Requested', details: 'Request ID: 11223', avatarSrc: '/dashboard/profile-pics/image-1.svg' },
];

const DashboardPage: React.FC = () => {
  const isMobileLayout = useBreakpoint('lg'); 
  const [searchQuery, setSearchQuery] = useState('');

  const cardData = isMobileLayout ? mobileCardData : desktopCardData;
  const activityData = isMobileLayout ? mobileActivities : desktopActivities;

  return (
    <div className="pb-10">
      {/* 1. MOBILE TOP HEADER (Profile + Title + Bell) */}
      {isMobileLayout && (
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                <Image 
                  src="/dashboard/profile-pics/image-2.svg" 
                  alt="Profile" 
                  fill 
                  className="object-cover" 
                />
             </div>
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-inter">Dashboard</h1>
          </div>
          <button className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
        </header>
      )}

      {/* 2. MOBILE SEARCH BAR (Full Width) */}
      {isMobileLayout && (
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search students or activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#161B22] border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white text-sm"
          />
        </div>
      )}

      {/* 3. MAIN HEADER / UPLOAD BUTTON (Desktop Title Hidden on Mobile) */}
      <div className="flex justify-between items-center mb-6 lg:mb-8">
        <h1 className="hidden lg:block text-3xl font-bold text-gray-900 dark:text-white font-inter">Dashboard</h1>
        <button className="w-full lg:w-auto flex justify-center items-center bg-blue-600 text-white font-bold py-3.5 px-6 rounded-2xl lg:rounded-xl shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all active:scale-[0.98]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Student Information
        </button>
      </div>

      {/* 4. STATISTICS CARDS GRID */}
      <div className={`grid gap-4 ${isMobileLayout ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
        {cardData.map((data, index) => (
          <DashboardCard key={index} {...data} isMobileLayout={isMobileLayout} />
        ))}
      </div>

      {/* 5. RECENT ACTIVITIES SECTION */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-inter">Recent Activities</h2>
        <button className="text-sm font-semibold text-blue-600 dark:text-blue-400">View All</button>
      </div>
      
      <div className="bg-white dark:bg-[#161B22] rounded-[2rem] lg:rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <RecentActivityList 
          activities={activityData} 
          isMobileLayout={isMobileLayout} 
        />
      </div>
      
      {/* Spacer for bottom mobile nav */}
      {isMobileLayout && <div className="h-20"></div>} 
    </div>
  );
};

export default DashboardPage;