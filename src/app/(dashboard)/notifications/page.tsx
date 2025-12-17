"use client";

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  ArrowLeft, 
  MoreVertical, 
  Filter
} from 'lucide-react';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';

// --- MOCK DATA ---
const notificationsData = [
  { id: 1, type: 'System Alert', title: 'New Student', description: 'New student registration for the Fall semester', time: '2 hours ago', category: 'System Alerts' },
  { id: 2, type: 'Student Activity', title: 'ID Card Request', description: 'Student ID card request submitted by Emily Carter', time: '4 hours ago', category: 'Student Activity' },
  { id: 3, type: 'Finance Updates', title: 'Payment Received', description: 'Payment confirmation received for tuition fees', time: '6 hours ago', category: 'Finance Updates' },
  { id: 4, type: 'Support', title: 'New Ticket', description: 'Support ticket #12345 submitted by David Lee', time: '8 hours ago', category: 'General' },
  { id: 5, type: 'Course Update', title: 'Schedule Change', description: 'Course schedule updated for Introduction to Psychology', time: '10 hours ago', category: 'Student Activity' },
  { id: 6, type: 'Faculty Notification', title: 'Office Hours', description: 'Faculty member, Dr. Sarah Johnson, updated office hours', time: '12 hours ago', category: 'General' },
  { id: 7, type: 'System Alert', title: 'New Student', description: 'New student registration for the Spring semester', time: '14 hours ago', category: 'System Alerts' },
];

const categories = ["All", "System Alerts", "Student Activity", "Finance Updates"];

const NotificationsPage = () => {
  const isMobile = useBreakpoint('lg');
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotifications = notificationsData.filter(n => {
    const matchesCategory = activeCategory === "All" || n.category === activeCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- MOBILE VIEW ---
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen  dark:bg-[#0B0E14] pb-24 font-[inter]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-6 h-6 text-[#030C32] dark:text-white" />
            </button>
            <h1 className="text-xl font-bold text-[#113CFC]">Notifications</h1>
          </div>
          <button className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full">
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search notifications"
              className="w-full pl-12 pr-4 py-3 bg-[#F4F6FF] dark:bg-[#161B22] border-none rounded-xl outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 px-4 space-y-4">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="flex gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
              <div className="shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[#030C32] dark:text-white truncate">
                    {notification.type}: {notification.title}
                  </h3>
                  <span className="text-[10px] text-blue-500 font-medium whitespace-nowrap ml-2">
                    {notification.time}
                  </span>
                </div>
                <button className="text-[11px] text-gray-400 font-bold block mt-0.5">View Details</button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- DESKTOP VIEW ---
  return (
    <div className="mx-auto">
       <header className="mb-6 font-[inter]">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-[inter]">Notifications</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-inter">Manage and view all system notifications</p>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b dark:border-gray-800 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-4 text-sm font-medium transition-all relative ${
              activeCategory === cat 
              ? 'text-[#030C32] dark:text-white' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#030C32] dark:bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search notifications"
          className="w-full pl-12 pr-4 py-4 bg-[#F4F6FF] dark:bg-[#161B22] border-none rounded-xl outline-none dark:text-white text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className="flex items-start gap-6 group cursor-pointer"
          >
            <div className="shrink-0 w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            
            <div className="flex-1 border-b dark:border-gray-800 pb-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#030C32] dark:text-white">
                    {notification.type}: {notification.title}
                  </h3>
                  <button className="text-xs text-gray-400 font-medium hover:text-blue-600 transition-colors">
                    View Details
                  </button>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-2xl">
                    {notification.description}
                  </p>
                </div>
                <span className="text-blue-500 font-meidum text-sm">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No notifications found matches your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;