"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Home, Users, CreditCard, Settings } from 'lucide-react';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';

// --- MOCK DATA ---
const studentDetail = {
  name: "Samuel Blessing",
  studentId: "123456789",
  department: "Computer Science",
  dob: "May 15, 2010", 
  mobileDob: "January 15, 2002",
  gender: "Male",
  emergencyNumber: "+234-7043874945",
  email: "daudusamuel2000@gmail.com",
  phone: "+234 7032 02-2287",
  address: "Futa North Gate,",
  status: "Active",
  image: "/dashboard/profile-pics/samuel-blessing.svg" 
};

const StudentDetailsPage = () => {
  const isMobile = useBreakpoint('lg');

  // --- MOBILE VIEW ---
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F9FF] dark:bg-[#0B0E14] pb-24">
        {/* Header */}
        <div className="flex items-center p-4 bg-white dark:bg-[#0B0E14]">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6 text-[#030C32] dark:text-white" />
          </button>
          <h1 className="flex-1 text-center text-xl font-bold text-[#113CFC] font-inter">Student Profile</h1>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center mt-8 px-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                {/* Fallback for profile image */}
                <Image src={studentDetail.image} alt="Profile" fill className="object-cover" />
             </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#030C32] dark:text-white text-center">{studentDetail.name}</h2>
          <p className="text-gray-500 text-sm mt-1">Student ID: {studentDetail.studentId}</p>
          <span className="mt-2 text-[#113CFC] font-normal">{studentDetail.status}</span>
        </div>

        {/* Info Sections */}
        <div className="mt-10 px-6 space-y-8">
          <h3 className="text-lg font-[500] text-[#030C32] dark:text-white">Personal Information</h3>
          
          <div className="grid grid-cols-2 gap-y-8 border-t border-gray-100 pt-6 gap-2">
            <div  className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
              <p className="text-gray-400 text-sm mb-1">Full Name</p>
              <p className="font-normal text-[#030C32] dark:text-white">Ethan Carter</p>
            </div>
            <div  className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
              <p className="text-gray-400 text-sm mb-1">Date of Birth</p>
              <p className="font-normal text-[#030C32] dark:text-white">{studentDetail.mobileDob}</p>
            </div>
            <div  className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="font-normal text-[#030C32] dark:text-white">ethan.carter@example.edu</p>
            </div>
            <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="font-normal text-[#030C32] dark:text-white">(555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Mobile Suspend Button */}
        <div className="mt-auto px-6 pt-10">
          <button className="w-full bg-[#113CFC] text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all">
            Suspend
          </button>
        </div>
      </div>
    );
  }

  // --- DESKTOP VIEW ---
  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <span className="text-gray-500">Students</span>
        <span className="text-gray-500">/</span>
        <span className="text-[#030C32] dark:text-white font-medium">Student Details</span>
      </nav>

      {/* Header Card */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md">
            <Image src={studentDetail.image} alt="Profile" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#030C32] dark:text-white">{studentDetail.name}</h1>
            <p className="text-[#6D7289] font-normal text-sm">Student ID: {studentDetail.studentId}</p>
            <p className="text-[#6D7289] font-normal text-sm">Department: {studentDetail.department}</p>
          </div>
        </div>
        <button className="bg-[#113CFC] text-white font-bold py-3 px-16 rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Suspend
        </button>
      </div>

      {/* Details Grid */}
      <div className="space-y-10">
        <h2 className="text-xl font-bold text-[#113CFC]">Personal Information</h2>
        
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          {/* Row 1 */}
          <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Full Name</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.name} Daudu</p>
          </div>
          <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Date of Birth</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.dob}</p>
          </div>

          {/* Row 2 */}
          <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Gender</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.gender}</p>
          </div>
          <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Emergency Number</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.emergencyNumber}</p>
          </div>

          {/* Row 3 */}
          <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Email</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.email}</p>
          </div>
          <div className="border-b border-[#E5E8EB] dark:border-gray-800 pb-4">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Phone Number</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.phone}</p>
          </div>

          {/* Row 4 */}
          <div className="col-span-2">
            <p className="text-[#6D7289] text-xs uppercase tracking-wider mb-1">Address</p>
            <p className="text-[#061454] dark:text-white font-medium">{studentDetail.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;