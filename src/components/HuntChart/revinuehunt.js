import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './revenuehunt.css'; // Reuse the same CSS file

const revenueData = [
  { session: 'Nov-Apr 2020', revenue: 12000 },
  { session: 'Nov-Apr 2021', revenue: 15000 },
  { session: 'Nov-Apr 2022', revenue: 18000 },
  { session: 'Nov-Apr 2023', revenue: 20000 },
  { session: 'Nov-Apr 2024', revenue: 22000 },
  { session: 'Nov-Apr 2025', revenue: 25000 },
];

// Calculate percentage change for each session
const calculatePercentageChange = (data) => {
  return data.map((entry, index) => {
    if (index === 0) {
      return { ...entry, percentageChange: 0 }; // No change for the first session
    }
    const previousRevenue = data[index - 1].revenue;
    const currentRevenue = entry.revenue;
    const percentageChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
    return { ...entry, percentageChange: parseFloat(percentageChange.toFixed(2)) };
  });
};

const revenueDataWithPercentage = calculatePercentageChange(revenueData);

const RevenueChart = () => {
  return (
    <div className="huntchart_container">
      <h2 className="huntchart_title">Hunt Sales per Session (Nov-Apr)</h2>
      <div className="huntchart_content">
        <div className="huntchart_chart-container">
          <LineChart width={800} height={300} data={revenueDataWithPercentage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="session" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '10px',
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: '#8884d8', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="huntchart_bar-container">
          <BarChart width={800} height={300} data={revenueDataWithPercentage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="session" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '10px',
              }}
            />
            <Bar dataKey="percentageChange" fill="#82ca9d" name="Percentage Change" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;