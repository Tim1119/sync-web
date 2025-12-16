// components/RecentActivityList.tsx

import React from 'react';
import Image from 'next/image';

interface Activity {
  id: number;
  activity: string;
  date?: string; // Desktop only
  status?: 'Completed' | 'Pending' | 'Canceled'; // Desktop only
  details?: string; // Mobile only (e.g., Student ID: 12345)
  avatarSrc?: string; // Mobile only
}

interface RecentActivityListProps {
  activities: Activity[];
  isMobileLayout: boolean;
}

const getStatusClasses = (status: Activity['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Canceled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities, isMobileLayout }) => {
  if (isMobileLayout) {
    // Mobile List (Dashboard Mobile.png style)
    return (
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            {item.avatarSrc && (
              <Image 
                src={item.avatarSrc} 
                alt="User Avatar" 
                width={40} 
                height={40} 
                className="rounded-full mr-4" 
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">{item.activity}</p>
              <p className="text-sm text-gray-500">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop Table (Dashboard.png style)
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {activities.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.activity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.status && (
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                    {item.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityList;