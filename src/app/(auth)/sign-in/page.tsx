"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Search, Bell } from 'lucide-react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-white md:bg-[#F8FAFC] flex flex-col font-[inter]">
      
      {/* --- DESKTOP NAVBAR --- */}
      <header className="hidden md:flex justify-between items-center px-12 py-4 bg-white border-b border-gray-100 h-20 shrink-0">
        <div className="flex items-center gap-2">
          {/* Dashboard Logo */}
          <div className="flex items-center gap-2">
             <Image 
               src="/dashboard/sync-dashboard-logo.svg" 
               alt="Sync Logo" 
               width={100} 
               height={40} 
               className="object-contain"
             />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm w-64 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 bg-gray-50 rounded-lg border border-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-500" />
          </button>
          <Image src="/dashboard/profile-pics/image-2.svg" alt="Profile" width={40} height={40} className="rounded-full cursor-pointer" />
        </div>
      </header>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center p-6 bg-white">
        <button className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#030C32]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-[#030C32] text-xl mr-6">Admin Login</h1>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-32">
          
          {/* LEFT: FORM SECTION */}
          <div className="w-full md:w-1/2 max-w-md">
            
            {/* MOBILE ONLY: Green University Image (replaces the CSS box) */}
            <div className="md:hidden mb-12 flex justify-center ">
              <div className="relative w-full aspect-4/3 rounded-2xl ">
                <Image 
                  src="/dashboard/signin-image.svg" // Replace with your actual path
                  alt="University Admin Login"
                  fill
                  className="object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Desktop Only Welcome text */}
            <div className="hidden md:block mb-9">
              <h2 className="text-[#030C32] text-3xl font-semibold mb-2 tracking-tight">Welcome Back</h2>
              <p className="text-gray-500 text-base">Please enter your details to sign in.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-[#061454] mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your email or username"
                  className="w-full px-6 py-3 bg-[#DBE2FF] border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-md transition-all outline-none text-gray-900 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#061454] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-6 py-3 bg-[#DBE2FF] border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-md transition-all outline-none text-gray-900 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="w-full bg-[#0D80F2] cursor-pointer hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all active:scale-[0.98] text-base">
                Login
              </button>

              <div className="flex flex-col gap-2 pt-1">
                <Link href="#" className="text-sm lg:text-right text-center text-[#4A739C] font-normal hover:text-blue-800 transition-colors">
                  Forgot Password?
                </Link>
                <Link href="#" className="text-sm lg:text-right text-center text-blue-600 font-normal hover:text-blue-800 transition-colors">
                  Need Help?
                </Link>
              </div>

              {/* Optional 2FA Field (Visible only on Desktop) */}
              <div className="hidden md:block pt-8 mt-8 border-t border-gray-100">
                <label className="block text-sm font-medium text-[#0D141C] mb-3 opacity-50">
                  Two-Factor Authentication Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter 2FA code"
                  className="w-full px-6 py-4 bg-transparent border-2 border-gray-100 focus:border-blue-500 rounded-2xl transition-all outline-none"
                />
              </div>
            </form>
          </div>

          {/* RIGHT: ILLUSTRATION SECTION (Desktop Only) */}
          <div className="hidden md:flex w-1/2 justify-center items-center">
            <div className="relative w-full aspect-square max-w-[550px]">
              <Image 
                src="/dashboard/signin-illustration.svg" // Replace with your actual path (the one with the person/cabinet)
                alt="Sync Security Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SignInPage;