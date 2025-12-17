"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  ArrowLeft, Search, ChevronRight, Users, Upload, 
  Plus, Clock, X, FileText, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';

// --- MOCK DATA ---
const currentAccessData = [
  { id: 1, name: 'Liam Carter', dept: 'Computer Science', status: 'Granted', validFrom: '9:00 AM', validUntil: '4:00 PM', date: '12/31/2024', image: '/dashboard/profile-pics/image-1.svg' },
  { id: 2, name: 'Olivia Bennett', dept: 'Engineering', status: 'Granted', validFrom: '9:00 AM', validUntil: '4:00 PM', date: '11/15/2024', image: '/dashboard/profile-pics/image-1.svg' },
  { id: 3, name: 'Noah Harper', dept: 'Mathematics', status: 'Expired', validFrom: '9:00 AM', validUntil: '4:00 PM', date: '12/31/2024', image: '/dashboard/profile-pics/image-1.svg' },
  { id: 4, name: 'Ava Foster', dept: 'Physics', status: 'Granted', validFrom: '9:00 AM', validUntil: '4:00 PM', date: '11/15/2024', image: '/dashboard/profile-pics/image-1.svg' },
  { id: 5, name: 'Ethan Hayes', dept: 'Biology', status: 'Expired', validFrom: '9:00 AM', validUntil: '4:00 PM', date: '11/15/2024', image: '/dashboard/profile-pics/image-1.svg' },
];

const departments = ["All", "Computer Science", "Engineering", "Mathematics", "Physics", "Biology"];

const AccessControlPage = () => {
  const isMobile = useBreakpoint('lg');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // --- LOGIC: Filtered Data ---
  const filteredData = useMemo(() => {
    return currentAccessData.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || student.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // --- MOBILE VIEW ---
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0B0E14] pb-24 transition-colors">
        <div className="flex items-center p-6">
          <button onClick={() => window.history.back()}><ArrowLeft className="w-6 h-6 text-[#030C32] dark:text-white" /></button>
          <h1 className="flex-1 text-center text-xl font-bold text-[#113CFC]">Student Profile</h1>
        </div>

        <div className="px-6">
          <h2 className="text-lg font-bold text-[#030C32] dark:text-white mb-6">Current Access</h2>
          <div className="space-y-6 mb-12">
            {filteredData.map((student) => (
              <div key={student.id} className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image src={student.image} alt={student.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-[#030C32] dark:text-white text-lg">{student.name}</h3>
                  <p className="text-gray-400 text-sm font-medium">
                    {student.status === 'Granted' ? 'Valid until' : 'Expired on'} {student.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-[#030C32] dark:text-white mb-6">Add Access</h2>
          <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search for Students"
                    className="w-full pl-12 pr-4 py-4 bg-[#F8F9FF] dark:bg-gray-800/40 rounded-xl outline-none text-gray-500 dark:text-gray-300 font-medium placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button className="w-full flex items-center justify-between p-4 bg-[#F8F9FF] dark:bg-gray-800/40 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Users className="w-5 h-5 text-gray-400" /></div>
                <span className="text-gray-500 dark:text-gray-300 font-medium">Select by Department</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={() => setIsUploadModalOpen(true)} className="w-full flex items-center justify-between p-4 bg-[#F8F9FF] dark:bg-gray-800/40 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Upload className="w-5 h-5 text-gray-400" /></div>
                <span className="text-gray-500 dark:text-gray-300 font-medium">Upload Student List</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="fixed bottom-10 right-6">
          <button className="w-16 h-16 bg-[#113CFC] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20"><Plus className="w-8 h-8 text-white" /></button>
        </div>
        {renderUploadModal()}
      </div>
    );
  }

  // --- DESKTOP VIEW ---
  return (
    <div className="mx-auto transition-colors font-[inter]">
      <header className="mb-6 font-[inter]">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Set Access Permissions</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage access permissions for spaces and events across campus</p>
      </header>

      <section className="mb-14">
        <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-meidum text-[#030C32] dark:text-white">Current Access</h2>
            <select 
                className="bg-[#F4F6FF] dark:bg-gray-800 border-none rounded-lg px-4 py-2 text-sm font-bold text-[#030C32] dark:text-gray-200 outline-none cursor-pointer"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
            >
                {departments.map(dept => <option key={dept} value={dept} className="dark:bg-[#161B22]">{dept}</option>)}
            </select>
        </div>
        <div className="bg-white dark:bg-[#161B22] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#DBE2FF]/40 dark:bg-gray-800/50">
              <tr>
                <th className="px-8 py-5 text-[#030C32] dark:text-gray-200 font-bold text-sm">Name</th>
                <th className="px-8 py-5 text-[#030C32] dark:text-gray-200 font-bold text-sm">Department</th>
                <th className="px-8 py-5 text-[#030C32] dark:text-gray-200 font-bold text-sm">Access Status</th>
                <th className="px-8 py-5 text-[#030C32] dark:text-gray-200 font-bold text-sm">Valid From</th>
                <th className="px-8 py-5 text-[#030C32] dark:text-gray-200 font-bold text-sm">Valid Until</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredData.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-8 py-6 text-[#030C32] dark:text-gray-100 font-medium">{student.name}</td>
                  <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium">{student.dept}</td>
                  <td className="px-8 py-6">
                    <span className={`w-32 py-2 rounded-lg font-bold text-xs inline-block text-center text-white ${student.status === 'Granted' ? 'bg-[#00E344]' : 'bg-[#F21F1F]'}`}>{student.status}</span>
                  </td>
                  <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium">{student.validFrom}</td>
                  <td className="px-8 py-6 text-gray-500 dark:text-gray-400 font-medium">{student.validUntil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white dark:bg-[#161B22] rounded-xl p-8 border border-gray-50 dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-bold text-[#030C32] dark:text-white mb-6">Add Students</h2>
        <p className="text-sm font-bold text-[#030C32] dark:text-gray-400 mb-4 uppercase tracking-wide">Search Students</p>
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" placeholder="Search by name or ID"
            className="w-full pl-12 pr-4 py-4 bg-[#F4F6FF] dark:bg-gray-800/60 border-none rounded-xl outline-none dark:text-white dark:placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-[#F4F6FF] dark:bg-gray-800 text-[#030C32] dark:text-white rounded-lg font-bold text-sm border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all">Add by Department</button>
            <button onClick={() => setIsUploadModalOpen(true)} className="px-6 py-3 bg-[#F4F6FF] dark:bg-gray-800 text-[#030C32] dark:text-white rounded-lg font-bold text-sm border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all">Upload List</button>
            <button className="px-6 py-3 bg-[#F4F6FF] dark:bg-gray-800 text-[#030C32] dark:text-white rounded-lg font-bold text-sm border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all">Set Time-Bound Access</button>
          </div>
          <button className="bg-[#113CFC] text-white font-bold py-3.5 px-10 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-sm">Save Permissions</button>
        </div>
      </section>
      {renderUploadModal()}
    </div>
  );

  // --- MODAL RENDER FUNCTION ---
  function renderUploadModal() {
    return (
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsUploadModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-[#1C2128] w-full max-w-lg rounded-2xl shadow-2xl p-8 md:p-12">
              <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-bold text-center text-[#030C32] dark:text-white mb-8">Upload School File</h2>
              
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm font-bold text-gray-500 mb-4">Upload</p>
                  <Upload className="w-8 h-8 text-[#030C32] dark:text-gray-300" />
                </div>
                <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
              </label>
              <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-[0.2em]">Upload in CSV format</p>
              
              {uploadedFile && (
                <div className="mt-10 flex items-center justify-between p-4 bg-[#F4F6FF] dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="relative p-2 bg-[#030C32] dark:bg-black rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                      <button className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 border border-white dark:border-gray-800" onClick={(e) => { e.preventDefault(); setUploadedFile(null); }}>
                        <X className="w-2 h-2 text-white" />
                      </button>
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-[#030C32] dark:text-white truncate">{uploadedFile.name}</p>
                        <p className="text-[10px] text-gray-400">Ready to import</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              )}

              <button 
                disabled={!uploadedFile}
                className="w-full mt-8 bg-[#113CFC] text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
};

export default AccessControlPage;