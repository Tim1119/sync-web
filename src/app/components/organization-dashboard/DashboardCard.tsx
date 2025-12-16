// components/DashboardCard.tsx

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  // Used for mobile to display a different, simpler title
  mobileTitle?: string; 
}

interface DashboardCardProps extends CardData {
  isMobileLayout: boolean; // Prop to switch rendering logic
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
    // Mobile Layout: Title, large value, small change indicator (e.g., Dashboard Mobile.png)
    return (
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-32">
        <h3 className="text-sm font-medium text-gray-500">{mobileTitle || title}</h3>
        <div className="text-4xl font-bold text-gray-900">{value}</div>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
        </div>
      </div>
    );
  }

  // Desktop Layout: Title, large value, small change indicator (e.g., Dashboard.png)
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className={`ml-3 flex items-center text-sm font-semibold ${changeColor}`}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;