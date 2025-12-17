"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Plus, 
  XCircle, 
  PauseCircle, 
  RefreshCw, 
  Search,
} from 'lucide-react';
import useBreakpoint from '@/app/hooks/organization-dashboard/useBreakpoint';


const cardData = [
  { id: 1, name: 'Sophia Clark', profession: 'Software Engineer', idNumber: '1234567890', status: 'Active', image: '/dashboard/profile-pics/image-1.svg' },
  { id: 2, name: 'Ethan Miller', profession: 'Product Designer', idNumber: '9876543210', status: 'Active', image: '/dashboard/profile-pics/image-2.svg' },
  { id: 3, name: 'Olivia Davis', profession: 'Marketer', idNumber: '2468135790', status: 'Inactive', image: '/dashboard/profile-pics/image-3.svg' },
  { id: 4, name: 'Liam Wilson', profession: 'Sales Associate', idNumber: '1357924680', status: 'Suspended', image: '/dashboard/profile-pics/image-1.svg' },
  { id: 5, name: 'Ava Martinez', profession: 'Graphic Designer', idNumber: '0987654321', status: 'Active', image: '/dashboard/profile-pics/image-2.svg' },
];

const CardManagementPage = () => {
  const isMobile = useBreakpoint('lg');
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState('All Cards');
  const [searchQuery, setSearchQuery] = useState('');

  // --- FILTER LOGIC ---
  const filteredCards = useMemo(() => {
    return cardData.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            card.idNumber.includes(searchQuery);
      
      if (activeTab === 'All Cards') return matchesSearch;
      return matchesSearch && card.status === activeTab;
    });
  }, [activeTab, searchQuery]);

  // --- MOBILE VIEW ---
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0B0E14] pb-24 transition-colors font-[inter]">
        <div className="flex items-center p-6 bg-white dark:bg-[#0B0E14]">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6 text-[#030C32] dark:text-white" />
          </button>
          <h1 className="flex-1 text-center text-xl font-bold text-[#113CFC]">Cards</h1>
        </div>

        <div className="px-6 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-[#030C32] dark:text-white mb-6">Card Management</h2>
            <div className="space-y-4">
              {[
                { label: 'Issue New Cards', icon: <Plus className="w-5 h-5 text-blue-600" /> },
                { label: 'Revoke Cards', icon: <XCircle className="w-5 h-5 text-blue-600" /> },
                { label: 'Suspend Cards', icon: <PauseCircle className="w-5 h-5 text-blue-600" /> },
                { label: 'Replace Cards', icon: <RefreshCw className="w-5 h-5 text-blue-600" /> },
              ].map((action, idx) => (
                <button key={idx} className="w-full flex items-center gap-4 p-4 bg-[#F8F9FF] dark:bg-gray-800/40 rounded-xl group transition-all">
                  <div className="p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    {action.icon}
                  </div>
                  <span className="text-[#030C32] dark:text-gray-200 font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#030C32] dark:text-white mb-4">Print Batch Preview</h2>
            <div className="bg-white dark:bg-[#161B22] overflow-hidden ">
              <div className="relative w-full h-56 bg-gray-100 dark:bg-gray-800">
                <Image src={cardData[1].image} alt="Preview" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-[#030C32] dark:text-white">Ethan Carter</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-semibold">QR/NFC ID:</span> 1234567890
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Profession:</span> Software Engineer
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[#061454] dark:text-white font-normal">Card Activation</span>
                  <button 
                    onClick={() => setIsActive(!isActive)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isActive ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <button className="w-full bg-[#113CFC] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30">
            Export Card Print List
          </button>
        </div>
      </div>
    );
  }

  // --- DESKTOP VIEW ---
  return (
    <div className="mx-auto transition-colors font-[inter]">
      <header className="flex justify-between items-center mb-8">
        <div>
             <h1 className="text-2xl font-bold text-[#113CFC] dark:text-white font-[inter]">Cards</h1>
        </div>
        <button className="px-6 py-2 bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all">
          Issue Card
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-100 dark:border-gray-800 mb-8">
        {['All Cards', 'Active', 'Inactive', 'Suspended'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all ${
              activeTab === tab 
              ? 'text-[#061454] border-b-2 border-[#061454]' 
              : 'text-[#6D7289] hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, department, or card ID"
          className="w-full pl-12 pr-4 py-4 bg-[#F4F6FF] dark:bg-gray-800/40 rounded-xl outline-none text-[#030C32] dark:text-white"
        />
      </div>

      
      <h2 className="text-lg font-bold text-[#030C32] dark:text-white mb-4">Print Batch Preview</h2>

      {/* Table Section */}
      <section className="bg-white dark:bg-[#161B22] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#DBE2FF]/40 dark:bg-gray-800/50">
            <tr>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-200 font-bold text-sm">Photo</th>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-200 font-bold text-sm">Name</th>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-200 font-bold text-sm">Profession</th>
              <th className="px-8 py-4 text-[#030C32] dark:text-gray-200 font-bold text-sm">QR/NFC ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filteredCards.length > 0 ? (
              filteredCards.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="px-8 py-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={user.image} alt={user.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[#030C32] dark:text-gray-100 font-medium">{user.name}</td>
                  <td className="px-8 py-4 text-gray-500 dark:text-gray-400 text-sm">{user.profession}</td>
                  <td className="px-8 py-4 text-gray-500 dark:text-gray-400 text-sm font-mono">{user.idNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-8 py-10 text-center text-gray-400">
                  No cards found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Footer Actions */}
      <div className="mt-8 flex flex-col items-start gap-4">
        <div>
          <div className="flex items-center gap-4 mb-1">
            <span className="text-[#030C32] dark:text-white font-bold">Card Activation</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">Cards are active and can be used for access</p>
        </div>

        <div className="w-full flex justify-end">
            <button className="bg-[#113CFC] text-white font-bold py-3.5 px-10 rounded-xl shadow-lg hover:bg-blue-700 transition-all text-sm flex items-center gap-2">
                Export Card Print List
            </button>
        </div>
      </div>
    </div>
  );
};

export default CardManagementPage;