import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, timeRange, onTimeRangeChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">{title}</h4>
        <select 
          className="text-sm bg-gray-100 border-none rounded p-2"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="quarter">Last quarter</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
