"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Upload, ChevronLeft, ChevronRight, ArrowLeft, X, FileText } from 'lucide-react';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const studentData = [
  { name: 'Sophia Clark R.', matric: '2021/12345', dept: 'Mass Communication', status: 'Active' },
  { name: 'Ethan Walker T.', matric: '2022/67890', dept: 'Marketing', status: 'Active' },
  { name: 'Olivia Green O.', matric: '2023/11223', dept: 'Business Administration', status: 'Active' },
  { name: 'Liam Harris P.', matric: '2021/44556', dept: 'Agriculture', status: 'Inactive' },
  { name: 'Ava Carter W.', matric: '2022/77889', dept: 'Business Administration', status: 'Active' },
  { name: 'Samuel Blessing. D.', matric: '2023/99001', dept: 'Agriculture', status: 'Active' },
  { name: 'Isabella King K.', matric: '2021/22334', dept: 'Marketing', status: 'Inactive' },
  { name: 'Jackson Hall U.', matric: '2022/55667', dept: 'Agriculture', status: 'Active' },
  { name: 'Mia Wright I.', matric: '2023/88990', dept: 'Mass Communication', status: 'Active' },
  { name: 'Aiden Hill Y.', matric: '2021/11223', dept: '2021/11223', status: 'Inactive' },
  { name: 'Daniel Okafor M.', matric: '2021/30451', dept: 'Computer Science', status: 'Active' },
  { name: 'Grace Williams A.', matric: '2022/78122', dept: 'Accounting', status: 'Active' },
  { name: 'Michael Adeyemi T.', matric: '2023/45019', dept: 'Economics', status: 'Inactive' },
  { name: 'Hannah Johnson R.', matric: '2021/99210', dept: 'Political Science', status: 'Active' },
  { name: 'Joshua Bello S.', matric: '2022/61345', dept: 'Business Administration', status: 'Active' },
  { name: 'Faith Okoye L.', matric: '2023/77401', dept: 'Mass Communication', status: 'Inactive' },
  { name: 'Andrew Peters K.', matric: '2021/18876', dept: 'Marketing', status: 'Active' },
  { name: 'Esther Mohammed N.', matric: '2022/90544', dept: 'Agriculture', status: 'Active' },
  { name: 'Caleb Thompson D.', matric: '2023/33109', dept: 'Computer Science', status: 'Active' },
  { name: 'Sarah Lawal P.', matric: '2021/45019', dept: '2021/45019', status: 'Inactive' },
];

const ITEMS_PER_PAGE = 10;

const StudentsPage = () => {
  const isMobile = useBreakpoint('lg');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Search Logic
  const filteredData = useMemo(() => {
    return studentData.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.matric.includes(searchQuery)
    );
  }, [searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0]);
  };

  // --- MOBILE VIEW ---
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen dark:bg-[#0B0E14] transition-colors font-[inter]">
        <div className="flex items-center p-4">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6 text-blue-900 dark:text-blue-400" />
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold text-[#113CFC] font-inter">Students</h1>
        </div>

        <div className="p-4">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search students"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 bg-[#F4F6FF] dark:bg-[#161B22] border-none rounded-xl outline-none dark:text-white"
            />
          </div>

          <p className="text-gray-600 dark:text-gray-400 font-medium mb-6">All Students</p>
          
          <div className="space-y-8">
            {currentTableData.map((student, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg leading-tight">{student.name}</h3>
                  <p className="text-[#6D7289] dark:text-gray-400 text-sm mt-1">Matric No: {student.matric}</p>
                </div>
                <span className={`font-normal text-sm ${student.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- DESKTOP VIEW ---
  return (
    <div className="mx-auto">
      <div className="flex justify-between items-start mb-2">
        <div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-[inter]">Students</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-inter">Manage student records, access, and card status.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#113CFC] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all text-sm"
        >
          Upload Student Informations
        </button>
      </div>

      <div className="relative my-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search by name or matric number"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 pr-4 py-4 bg-[#F4F6FF] dark:bg-[#161B22] border-none rounded-xl outline-none dark:text-white text-sm"
        />
      </div>

      <div className="bg-white dark:bg-[#161B22] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#DBE2FF] dark:bg-gray-800/50">
            <tr>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-300 font-bold text-sm">Name</th>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-300 font-bold text-sm">Matric Number</th>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-300 font-bold text-sm text-center">Department</th>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-300 font-bold text-sm text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {currentTableData.map((student, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                <td className="px-8 py-6 font-bold text-[#030C32] dark:text-gray-100">{student.name}</td>
                <td className="px-8 py-6 text-gray-400 dark:text-gray-500 font-medium">{student.matric}</td>
                <td className="px-8 py-6 text-center text-gray-400 dark:text-gray-500 font-medium">{student.dept}</td>
                <td className="px-8 py-6 text-right">
                  <span className={`w-[120px] py-2 rounded-lg font-bold text-xs inline-block text-center ${
                    student.status === 'Active' ? 'bg-[#00E344] text-white' : 'bg-[#F21F1F] text-white'
                  }`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center py-10 gap-3">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 text-gray-400 disabled:opacity-30 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button 
              key={num} 
              onClick={() => setCurrentPage(num)} 
              className={`w-10 h-10 rounded-full font-bold transition-all ${
                num === currentPage 
                ? 'bg-[#DBE2FF] text-[#113CFC]' 
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {num}
            </button>
          ))}
          
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 text-gray-400 disabled:opacity-30 hover:text-blue-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Upload Modal Implementation */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-[#1C2128] w-full max-w-lg rounded-2xl shadow-2xl p-10">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              <h2 className="text-lg font-bold text-center text-[#030C32] dark:text-white mb-5">Upload School File</h2>
              <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl cursor-pointer bg-[#F3F5FF] dark:bg-inherit hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-sm font-medium text-gray-500 mb-2">Upload</span>
                  <Upload className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
              </label>
              <p className="text-center text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-widest">Upload in CSV format</p>
              {uploadedFile && (
                <div className="mt-8 flex items-start">
                  <div className="relative p-2.5 bg-[#030C32] rounded-xl shadow-lg">
                    <FileText className="w-10 h-10 text-white" />
                    <button onClick={() => setUploadedFile(null)} className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-0.5 border border-red-500 shadow-sm"><X className="w-3 h-3" /></button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsPage;