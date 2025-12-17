"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import DashboardCard from '../../components/organization-dashboard/DashboardCard';
import RecentActivityList from '../../components/organization-dashboard/RecentActivityList';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';
import { Upload, Bell, Search, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { id: 2, activity: 'Card Activation', details: 'Card ID: 67890', avatarSrc: '/dashboard/profile-pics/image-2.svg' },
  { id: 3, activity: 'Verification Requested', details: 'Request ID: 11223', avatarSrc: '/dashboard/profile-pics/image-1.svg' },
];

const DashboardPage: React.FC = () => {
  const isMobileLayout = useBreakpoint('lg'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const cardData = isMobileLayout ? mobileCardData : desktopCardData;
  const activityData = isMobileLayout ? mobileActivities : desktopActivities;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="pb-10">
      {/* 1. MOBILE TOP HEADER */}
      {isMobileLayout && (
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                <Image src="/dashboard/profile-pics/image-2.svg" alt="Profile" fill className="object-cover" />
             </div>
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-[inter]">Dashboard</h1>
          </div>
          <button className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
        </header>
      )}

      {/* 2. MOBILE SEARCH BAR */}
      {isMobileLayout && (
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search students or activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#161B22] border-none rounded-2xl shadow-sm outline-none dark:text-white text-sm"
          />
        </div>
      )}

      {/* 3. MAIN HEADER / UPLOAD BUTTON */}
      <div className="flex justify-between items-center mb-6 lg:mb-8">
        <h1 className="hidden lg:block text-3xl font-bold text-[#113CFC] dark:text-white font-inter">Dashboard</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full lg:w-auto flex justify-center items-center bg-[#113CFC] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98]"
        >
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
      
      <div className="bg-white dark:bg-[#161B22] rounded-md border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <RecentActivityList activities={activityData} isMobileLayout={isMobileLayout} />
      </div>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-[#1C2128] w-full max-w-lg rounded-2xl shadow-2xl p-8"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-bold text-center text-[#030C32] dark:text-white mb-8">Upload School File</h2>

              {/* Upload Dropzone */}
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed bg-[#F3F5FF] dark:bg-inherit border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-sm font-semibold text-gray-500 mb-2">Upload</span>
                  <Upload className="w-8 h-8 text-[#113CFC]" />
                </div>
                <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
              </label>
              
              <p className="text-center text-xs text-gray-400 mt-4">Upload in CSV format</p>

              {/* Selected File Indicator (matches image style) */}
              {uploadedFile && (
                <div className="mt-6 flex items-start">
                  <div className="relative p-2 bg-[#030C32] rounded-lg">
                    <FileText className="w-8 h-8 text-white" />
                    <button 
                      onClick={() => setUploadedFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 border-2 border-white dark:border-[#1C2128]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {isMobileLayout && <div className="h-20"></div>} 
    </div>
  );
};

export default DashboardPage;