// src/app/components/organization-dashboard/DashboardPage.tsx

"use client";

import React from 'react';
import DashboardCard from '../../components/organization-dashboard/DashboardCard';
import RecentActivityList from '../../components/organization-dashboard/RecentActivityList';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';
import { Upload, Bell } from 'lucide-react';

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
  { id: 1, activity: 'Student Enrolled', details: 'Student ID: 12345', avatarSrc: '/avatar1.jpg' },
  { id: 2, activity: 'Card Activated', details: 'Card ID: 67890', avatarSrc: '/avatar2.jpg' },
  { id: 3, activity: 'Verification Requested', details: 'Request ID: 11223', avatarSrc: '/avatar3.jpg' },
];
// --- END MOCK DATA ---


const DashboardPage: React.FC = () => {
  const isMobileLayout = useBreakpoint('lg'); 

  const cardData = isMobileLayout ? mobileCardData : desktopCardData;
  const activityData = isMobileLayout ? mobileActivities : desktopActivities;

  return (
    <>
      {/* Mobile Top Header (Hidden on desktop/large screens) */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Main Header / Action Button */}
      <div className="flex justify-between items-center mb-6 lg:mb-8">
        <h1 className="hidden lg:block text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4 mr-2" />
          Upload Student Informations
        </button>
      </div>

      {/* Statistics Cards Grid */}
      <div className={`grid gap-4 ${isMobileLayout ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
        {cardData.map((data, index) => (
          <DashboardCard key={index} {...data} isMobileLayout={isMobileLayout} />
        ))}
      </div>

      {/* Recent Activities Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
      <RecentActivityList 
        activities={activityData} 
        isMobileLayout={isMobileLayout} 
      />
      
      {/* Spacer for bottom mobile nav */}
      {isMobileLayout && <div className="h-20"></div>} 

    </>
  );
};

export default DashboardPage;