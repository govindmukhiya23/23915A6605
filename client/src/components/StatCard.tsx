import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h4 className="text-2xl font-bold">{value}</h4>
      <div className={`flex items-center mt-2 ${change.isPositive ? 'text-green-500' : 'text-red-500'} text-sm`}>
        {change.isPositive ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
        <span>{change.value}</span>
      </div>
    </div>
  );
};

export default StatCard;
