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
  // Helper function to determine if the change is positive or negative
  const getChangeText = (percentageChange) => {
    const change = parseFloat(percentageChange);
    if (change > 0) {
      return `increased by ${Math.abs(change).toFixed(2)}%`;
    } else if (change < 0) {
      return `decreased by ${Math.abs(change).toFixed(2)}%`;
    } else {
      return 'no change';
    }
  };

  return (
    <div className="stats-cards-container">
      {/* Card 1: Total Hunt This Session */}
      <div className="stats-card">
        <div className="card-header">
          <h3>Total Hunt This Session</h3>
        </div>
        <div className="card-content">
          <span className="card-value">{totalHunt}</span>
          <span className="card-change">
            {getChangeText(huntPercentageChange)} from previous session
          </span>
        </div>
      </div>

      {/* Card 2: Total Revenue This Session */}
      <div className="stats-card">
        <div className="card-header">
          <h3>Total Revenue This Session</h3>
        </div>
        <div className="card-content">
          <span className="card-value">${totalRevenue}</span>
          <span className="card-change">
            {getChangeText(revenuePercentageChange)} from previous session
          </span>
        </div>
      </div>

      {/* Card 3: Total Cancellation This Session */}
      <div className="stats-card">
        <div className="card-header">
          <h3>Total Cancellation This Session</h3>
        </div>
        <div className="card-content">
          <span className="card-value">{totalCancellation}</span>
          <span className="card-change">
            {getChangeText(cancellationPercentageChange)} from previous session
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;