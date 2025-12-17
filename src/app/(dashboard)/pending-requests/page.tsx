"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, ArrowLeft, X, Mail, Hash } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';

// Unified Application Interface
interface Application {
  id: string;
  name: string;
  appliedDate: string;
  image: string;
  email: string;
}

const applications: Application[] = [
  { id: '2023001', name: 'Ethan Harper', appliedDate: '2025-08-15', image: '/dashboard/pending-applications/ethan.svg', email: 'e.harper@futa.edu.ng' },
  { id: '2023002', name: 'Olivia Bennett', appliedDate: '2025-08-16', image: '/dashboard/pending-applications/olivia.svg', email: 'o.bennett@futa.edu.ng' },
  { id: '2023003', name: 'Noah Carter', appliedDate: '2025-08-17', image: '/dashboard/pending-applications/noah.svg', email: 'n.carter@futa.edu.ng' },
  { id: '2023004', name: 'Ava Davis', appliedDate: '2025-08-18', image: '/dashboard/pending-applications/ava.svg', email: 'a.davis@futa.edu.ng' },
  { id: '2023005', name: 'Liam Evans', appliedDate: '2025-08-19', image: '/dashboard/pending-applications/liam.svg', email: 'l.evans@futa.edu.ng' },
  { id: '2023006', name: 'Sophia Foster', appliedDate: '2025-08-20', image: '/dashboard/pending-applications/sophia.svg', email: 's.foster@futa.edu.ng' },
];

const PendingApplicationsPage = () => {
  const isMobile = useBreakpoint('lg'); // Adjust breakpoint string as per your hook's config
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Search logic for Desktop
  const filteredApplications = useMemo(() => {
    return applications.filter((app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.id.includes(searchQuery)
    );
  }, [searchQuery]);

  // --- MOBILE VIEW (Script 1 Style) ---
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6 text-blue-900" />
          </button>
          <h1 className="flex-1 text-center text-xl font-bold text-blue-600">Pending Applications</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-20">
          {applications.map((app, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={app.id} 
              className="flex items-center py-4 border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 shadow-sm">
                <Image src={app.image} alt={app.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900">{app.name}</h3>
                <p className="text-gray-400 text-xs text-nowrap">Submitted: {app.appliedDate}</p>
              </div>
              <ChevronRight className="text-blue-900 w-5 h-5" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // --- DESKTOP VIEW (Script 2 Style) ---
  return (
    <div className=" mx-auto">

      <header className="mb-6 font-[inter]">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-[inter]">Pending Applications</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-inter">Review and manage incoming student applications.</p>
      </header>

      {/* Desktop Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#F3F5FF] dark:bg-[#161B22] border border-transparent dark:border-gray-800 rounded-xl dark:text-white transition-all outline-none text-sm"
        />
      </div>

      {/* Desktop Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {filteredApplications.map((app) => (
          <motion.div 
            layout
            whileHover={{ y: -4 }}
            key={app.id} 
            onClick={() => setSelectedApp(app)}
            className="group cursor-pointer p-3 bg-white dark:bg-[#161B22] border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-xl transition-all"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-blue-50 dark:bg-gray-800">
              <Image src={app.image} alt={app.name} fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm truncate font-inter">{app.name}</h3>
            <p className="text-[10px] text-blue-500 font-semibold mt-1">ID: {app.id}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop Modal Quick View */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-blue-900/40 dark:bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#1C2128] rounded-[2rem] p-8 md:p-10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedApp(null)} 
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl shrink-0">
                  <Image src={selectedApp.image} alt={selectedApp.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <h2 className="text-3xl font-black text-blue-900 dark:text-white font-inter">{selectedApp.name}</h2>
                  <div className="space-y-1.5 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Hash className="w-4 h-4 text-blue-400" /> ID: {selectedApp.id}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail className="w-4 h-4 text-blue-400" /> {selectedApp.email}
                    </div>
                    <div className="mt-2 text-xs opacity-75">Applied on: {selectedApp.appliedDate}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                <button className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all">
                  Approve
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-3.5 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all">
                  Reject
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingApplicationsPage;