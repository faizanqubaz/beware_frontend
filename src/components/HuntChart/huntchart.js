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
    yearlyData: []
  });

  // Fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://beware-seven.vercel.app/api/v2/ibex/stats');
        const data = await response.json();
        console.log('data', data);

        if (data.huntData) {
          setHuntData(data.huntData.map((item) => ({
            ...item,
            hunts: isNaN(Number(item.hunts)) ? 0 : Number(item.hunts)
          })));
        }

        setStats({
          totalHunt: isNaN(Number(data.totalHunt)) ? 0 : Number(data.totalHunt),
          totalRevenue: isNaN(Number(data.totalRevenue)) ? 0 : Number(data.totalRevenue),
          totalCancellation: isNaN(Number(data.totalCancellation)) ? 0 : Number(data.totalCancellation),
          huntPercentageChange: isNaN(Number(data.huntPercentageChange)) ? 0 : Number(data.huntPercentageChange),
          revenuePercentageChange: isNaN(Number(data.revenuePercentageChange)) ? 0 : Number(data.revenuePercentageChange),
          cancellationPercentageChange: isNaN(Number(data.cancellationPercentageChange)) ? 0 : Number(data.cancellationPercentageChange),
          yearlyData: data.yearlyData || []
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
          {huntData.length > 0 ? (
            <div className="huntchart_charts-wrapper">
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
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      <RevenueChart huntData={huntData} />
      <FooterComponent />
    </>
  );
};

export default ChartHunt;