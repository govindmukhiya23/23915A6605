import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h4 className="font-semibold mb-4">{title}</h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
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
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              activeDot={{ r: 8 }} 
              strokeWidth={2} 
              dot={{ r: 4 }}
              animationDuration={1500}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
