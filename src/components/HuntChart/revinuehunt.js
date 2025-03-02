import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './revenuehunt.css'; // Reuse the same CSS file

const calculatePercentageChange = (huntData = []) => {
  if (!Array.isArray(huntData) || huntData.length === 0) return [];

  // Sort the data by session
  const sortedData = [...huntData].sort((a, b) => parseInt(a.session) - parseInt(b.session));

  return sortedData.map((entry, index) => {
    if (index === 0) {
      return { ...entry, percentageChange: 0 }; // No change for the first session
    }
    const previousRevenue = sortedData[index - 1].revenue;
    const currentRevenue = entry.revenue;
    const percentageChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
    return { ...entry, percentageChange: parseFloat(percentageChange.toFixed(2)) };
  });
};

const RevenueChart = ({ huntData = [] }) => {
  const [chartWidth, setChartWidth] = useState(800); // Default width for larger screens
  const [chartHeight, setChartHeight] = useState(300); // Default height for larger screens

  const revenueDataWithPercentage = calculatePercentageChange(huntData);

  // Adjust chart dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setChartWidth(window.innerWidth * 0.9); // 90% of screen width on mobile
        setChartHeight(200); // Smaller height for mobile
      } else {
        setChartWidth(800); // Default width for larger screens
        setChartHeight(300); // Default height for larger screens
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize); // Update dimensions on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []);

  return (
    <div className="huntchart_container">
      <h2 className="huntchart_title">Hunt Sales per Session (Nov-Apr)</h2>
      <div className="huntchart_content">
        <div className="huntchart_chart-container">
          <LineChart width={chartWidth} height={chartHeight} data={revenueDataWithPercentage}>
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
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
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
          <BarChart width={chartWidth} height={chartHeight} data={revenueDataWithPercentage}>
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
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="percentageChange" fill="#82ca9d" name="Percentage Change" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;