import React from 'react';
import './statscards.css'; // Import the CSS file

const StatsCard = ({
  totalHunt,
  totalRevenue,
  totalCancellation,
  huntPercentageChange,
  revenuePercentageChange,
  cancellationPercentageChange,
}) => {
  return (
    <div className="stats-cards-container">
      {/* Card 1: Total Hunt This Session */}
      <div className="stats-card">
        <div className="card-header">
          <h3>Total Hunt This Session</h3>
        </div>
        <div className="card-content">
          <span className="card-value">{totalHunt}</span>
          <span className="card-change">{huntPercentageChange}%</span>
        </div>
      </div>

      {/* Card 2: Total Revenue This Session */}
      <div className="stats-card">
        <div className="card-header">
          <h3>Total Revenue This Session</h3>
        </div>
        <div className="card-content">
          <span className="card-value">${totalRevenue}</span>
          <span className="card-change">{revenuePercentageChange}%</span>
        </div>
      </div>

      {/* Card 3: Total Cancellation This Session */}
      <div className="stats-card">
        <div className="card-header">
          <h3>Total Cancellation This Session</h3>
        </div>
        <div className="card-content">
          <span className="card-value">{totalCancellation}</span>
          <span className="card-change">{cancellationPercentageChange}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;