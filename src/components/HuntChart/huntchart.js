import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import './huntchart.css'; // Import the CSS file
import RevenueChart from './revinuehunt';
import StatsCard from './startscard';
import FooterComponent from '../Footer/footer';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const ChartHunt = () => {
  const [huntData, setHuntData] = useState([]);
  const [stats, setStats] = useState({
    totalHunt: 0,
    totalRevenue: 0,
    totalCancellation: 0,
    huntPercentageChange: 0,
    revenuePercentageChange: 0,
    cancellationPercentageChange: 0,
  });

  // Fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('http://localhost:5000/api/v2/ibex/stats');
        const data = await response.json();

        // Set hunt data for charts
        setHuntData(data.huntData);

        // Set stats for cards
        setStats({
          totalHunt: data.totalHunt,
          totalRevenue: data.totalRevenue,
          totalCancellation: data.totalCancellation,
          huntPercentageChange: data.huntPercentageChange,
          revenuePercentageChange: data.revenuePercentageChange,
          cancellationPercentageChange: data.cancellationPercentageChange,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="huntchart_container">
        <h2 className="huntchart_title">Stats per Session (Nov-Apr)</h2>
        <StatsCard
          totalHunt={stats.totalHunt}
          totalRevenue={stats.totalRevenue}
          totalCancellation={stats.totalCancellation}
          huntPercentageChange={stats.huntPercentageChange}
          revenuePercentageChange={stats.revenuePercentageChange}
          cancellationPercentageChange={stats.cancellationPercentageChange}
        />
        <h2 className="huntchart_title">Hunts per Session (Nov-Apr)</h2>
        <div className="huntchart_content">
          <div className="huntchart_pie-container">
            <PieChart width={400} height={300}>
              <Pie
                data={huntData}
                dataKey="hunts"
                nameKey="session"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {huntData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="huntchart_chart-container">
            <BarChart width={800} height={300} data={huntData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hunts" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
      <RevenueChart />
      <FooterComponent />
    </>
  );
};

export default ChartHunt;