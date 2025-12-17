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
  const changeColor = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const ArrowIcon = isPositive ? ArrowUp : ArrowDown;

  if (isMobileLayout) {
    // Mobile Layout
    return (
      <div className="bg-white dark:bg-[#161B22] p-4 rounded-xl shadow-md flex flex-col justify-between h-32 transition-colors">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{mobileTitle || title}</h3>
        {/* Value and change stack vertically on mobile */}
        <div className="text-4xl font-bold text-[#113CFC] dark:text-blue-400">{value}</div>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="bg-white dark:bg-[#161B22] p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 transition-colors">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <div className="mt-2 text-4xl font-bold text-[#113CFC] dark:text-blue-400">{value}</div>
      <div className={`mt-1 flex items-center text-sm font-semibold ${changeColor}`}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
      </div>
    </div>
  );
};

export default DashboardCard;