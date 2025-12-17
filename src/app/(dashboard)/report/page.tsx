"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Users,
  CreditCard,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';

// --- MOCK DATA ---
const facilityData = [
  { label: 'Admin', value: 85 },
  { label: 'Library', value: 65 },
  { label: 'Science', value: 90 },
  { label: 'Gym', value: 45 },
  { label: 'Dorm A', value: 70 },
  { label: 'Dorm B', value: 55 },
];

const locationData = [
  { name: 'Main Gate', width: '95%', count: 1240 },
  { name: 'Science Lab', width: '75%', count: 890 },
  { name: 'Staff Room', width: '60%', count: 720 },
  { name: 'Library Entrance', width: '45%', count: 540 },
  { name: 'Cafeteria', width: '30%', count: 310 },
];

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// --- SUB-COMPONENTS (Defined outside to prevent render errors) ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MetricCard = ({ title, value, icon: Icon, trend, isPositive }: any) => (
  <div className="bg-white dark:bg-[#161B22] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-blue-500/30">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#F4F6FF] dark:bg-blue-900/20 rounded-xl">
        <Icon className="w-5 h-5 text-[#113CFC]" />
      </div>
      {trend && (
        <span className={`text-xs font-bold flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 font-[inter]">{title}</h3>
    <p className="text-2xl font-bold text-[#030C32] dark:text-white mt-1 font-[inter]">{value}</p>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartContainer = ({ title, children }: any) => (
  <div className="bg-white dark:bg-[#161B22] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full">
    <h3 className="text-sm font-bold text-[#030C32] dark:text-white mb-8 uppercase tracking-widest font-[inter]">{title}</h3>
    <div className="flex-1">{children}</div>
  </div>
);

// --- MAIN PAGE ---

const ReportsPage = () => {
  const isMobile = useBreakpoint('lg');
  const [showExportModal, setShowExportModal] = useState(false);
  const [startDate, setStartDate] = useState<number | null>(5);
  const [endDate, setEndDate] = useState<number | null>(7);

  return (
    <div className="pb-20 transition-colors">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-[inter]">System Analytics</h1>
             <p className="text-gray-500 dark:text-gray-400 text-sm font-inter">Detailed metrics and historical access logs</p>
          
        </div>
        <button 
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#113CFC] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-[inter]"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Generate Export
        </button>
      </header>

      {/* ROW 1: TOP METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Scans" value="24,502" icon={Activity} trend="+12.5%" isPositive={true} />
        <MetricCard title="Unique Users" value="1,840" icon={Users} trend="+4.2%" isPositive={true} />
        <MetricCard title="Active Cards" value="3,120" icon={CreditCard} />
        <MetricCard title="Failed Access" value="142" icon={AlertCircle} trend="+18%" isPositive={false} />
      </div>

      {/* ROW 2: VISUAL CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Card Scan Frequency by Facility */}
        <ChartContainer title="Card Scan Frequency by Facility">
          <div className="flex items-end justify-around gap-2 h-64 w-full pt-4">
            {facilityData.map((d, i) => (
              <div key={`facility-${i}`} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                <div className="relative w-full flex flex-col items-center justify-end h-full">
                  <span className="absolute -top-8 text-[10px] font-bold text-[#113CFC] opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                    {d.value}%
                  </span>
                  <div 
                    className="w-full max-w-[42px] bg-[#DBE2FF] dark:bg-blue-900/20 rounded-t-lg transition-all group-hover:bg-[#113CFC]" 
                    style={{ height: `${d.value}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-400 uppercase truncate w-full text-center font-[inter]">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Most Accessed Locations */}
        <ChartContainer title="Most Accessed Locations">
          <div className="space-y-6 py-2">
            {locationData.map((loc, i) => (
              <div key={`loc-${i}`} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#030C32] dark:text-gray-300 font-[inter]">{loc.name}</span>
                  <span className="text-[11px] font-medium text-gray-400 group-hover:text-[#113CFC] transition-colors font-[inter]">
                    {loc.count.toLocaleString()} scans
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#113CFC] rounded-full transition-all duration-700" 
                    style={{ width: loc.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* ROW 3: LOGS TABLE */}
      <div className="bg-white dark:bg-[#161B22] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-[#030C32] dark:text-white font-[inter]">Live Access Logs</h3>
          <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full uppercase">
            <Activity className="w-3 h-3" /> Real-time
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8F9FF] dark:bg-gray-800/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-[inter]">User ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-[inter]">Facility</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-[inter]">Timestamp</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-[inter]">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={`log-${item}`} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="px-8 py-5 text-sm font-semibold text-[#030C32] dark:text-gray-200">STD-2024-{item}82</td>
                  <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">Library West Gate</td>
                  <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">Oct 12 • 10:4{item} AM</td>
                  <td className="px-8 py-5">
                    <span className="flex items-center w-fit gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 text-[10px] font-bold rounded-lg uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Authorized
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0B0E14] w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-[#030C32] dark:text-white font-[inter]">Export Configuration</h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-8">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8 font-[inter]">Select Date Range</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* July Calendar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer" />
                    <span className="font-bold text-[#030C32] dark:text-white text-xs uppercase font-[inter]">July 2024</span>
                    <div className="w-4" />
                  </div>
                  <div className="grid grid-cols-7 text-center gap-y-1">
                    
                    {WEEK_DAYS.map((d, i) => (
                      <span key={`july-head-${i}`} className="text-[10px] font-bold text-gray-300 mb-2 font-[inter]">
                        {d}
                      </span>
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => (
                      <button 
                        key={`july-day-${i}`} 
                        onClick={() => setStartDate(i + 1)}
                        className={`text-[11px] w-7 h-7 rounded-lg mx-auto flex items-center justify-center transition-all font-[inter] 
                        ${startDate === i + 1 ? 'bg-[#113CFC] text-white font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* August Calendar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="w-4" />
                    <span className="font-bold text-[#030C32] dark:text-white text-xs uppercase font-[inter]">August 2024</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" />
                  </div>
                  <div className="grid grid-cols-7 text-center gap-y-1">
                    {WEEK_DAYS.map((d, i) => (
                      <span key={`aug-head-${i}`} className="text-[10px] font-bold text-gray-300 mb-2 font-[inter]">
                        {d}
                      </span>
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => (
                      <button 
                        key={`aug-day-${i}`} 
                        onClick={() => setEndDate(i + 1)}
                        className={`text-[11px] w-7 h-7 rounded-lg mx-auto flex items-center justify-center transition-all font-[inter] 
                        ${endDate === i + 1 ? 'bg-[#113CFC] text-white font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-[10px] text-gray-400 font-bold uppercase italic font-[inter]">Format: .CSV Spreadsheet</div>
                <div className="flex gap-4 w-full sm:w-auto">
                   <button onClick={() => setShowExportModal(false)} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase font-[inter]">Cancel</button>
                   <button 
                    className="flex-1 sm:flex-none bg-[#113CFC] text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:bg-blue-700 transition-all text-xs uppercase tracking-widest font-[inter]"
                    onClick={() => setShowExportModal(false)}
                   >
                    Export
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;