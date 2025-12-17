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
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Canceled':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  }
};

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities, isMobileLayout }) => {
  if (isMobileLayout) {
    // Mobile List (Dashboard Mobile.png style)
    return (
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center p-3 bg-white dark:bg-[#161B22] rounded-lg shadow-sm border border-transparent dark:border-gray-800">
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
              <p className="font-semibold text-gray-900 dark:text-gray-100">{item.activity}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop Table (Dashboard.png style)
  return (
    <div className="bg-white dark:bg-[#161B22] rounded-xl shadow-lg overflow-hidden border border-transparent dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-blue-50 dark:bg-gray-800/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {activities.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.activity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
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