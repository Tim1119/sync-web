// src/app/components/organization-dashboard/DashboardCard.tsx

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  mobileTitle?: string; 
}

interface DashboardCardProps extends CardData {
  isMobileLayout: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  mobileTitle, 
  isMobileLayout 
}) => {
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const ArrowIcon = isPositive ? ArrowUp : ArrowDown;

  if (isMobileLayout) {
    // Mobile Layout
    return (
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-32">
        <h3 className="text-sm font-medium text-gray-500">{mobileTitle || title}</h3>
        {/* Value and change stack vertically on mobile */}
        <div className="text-4xl font-bold text-[#113CFC]">{value}</div>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
        </div>
      </div>
    );
  }

  // Desktop Layout - UPDATED: Value and Change are now stacked
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 text-4xl font-bold text-[#113CFC]">{value}</div>
      <div className={`mt-1 flex items-center text-sm font-semibold ${changeColor}`}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
      </div>
    </div>
  );
};

export default DashboardCard;