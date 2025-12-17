"use client";

import React from 'react';
import { Upload, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { title: 'Uploaded Students', value: '1,250', change: '+10%', isPositive: true },
  { title: 'Students Enrolled', value: '1,100', change: '+5%', isPositive: true },
  { title: 'Student Unenrolled', value: '5', change: '-5%', isPositive: false },
  { title: 'Activated Today', value: '25', change: '+20%', isPositive: true },
];

const activities = [
  { id: 1, user: 'Ethan Harper', action: 'Requested Enrollment', time: '2 mins ago', image: '/dashboard/pending-applications/ethan.svg' },
  { id: 2, user: 'System', action: 'Daily Backup Completed', time: '1 hour ago', icon: <Clock className="w-4 h-4" /> },
  { id: 3, user: 'Olivia Bennett', action: 'Card Activated', time: '3 hours ago', image: '/dashboard/pending-applications/olivia.svg' },
];

const DashboardPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight dark:text-white leading-tight">University Dashboard</h1>
          <p className="text-gray-500 font-medium">Overview of the Federal University of Technology Akure</p>
        </div>
        <button className="flex items-center bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 dark:shadow-none active:scale-95">
          <Upload className="w-5 h-5 mr-3" /> Upload Student Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white dark:bg-[#161B22] p-6 rounded-[2rem] border dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group cursor-default"
          >
            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mb-4">{item.title}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-black dark:text-white">{item.value}</h2>
              <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-black ${item.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {item.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {item.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white dark:bg-[#161B22] rounded-[2.5rem] p-8 border dark:border-gray-800 shadow-sm">
          <h3 className="text-xl font-black mb-8 dark:text-blue-400">Recent Activities</h3>
          <div className="space-y-6">
            {activities.map((act, i) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} key={act.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {act.image ? <Image src={act.image} alt={act.user} fill className="object-cover" /> : act.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-sm dark:text-gray-100">{act.user}</h4>
                    <p className="text-xs text-gray-500">{act.action}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400">{act.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200 dark:shadow-none flex flex-col justify-between overflow-hidden relative group">
           <div className="relative z-10">
             <h3 className="text-2xl font-black leading-tight mb-2">Need Help?</h3>
             <p className="text-blue-100 text-sm font-medium">Contact technical support for any system issues.</p>
           </div>
           <button className="relative z-10 mt-8 bg-white text-blue-600 font-black py-4 rounded-2xl hover:bg-blue-50 transition-colors">Contact Support</button>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;