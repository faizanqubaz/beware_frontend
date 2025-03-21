import './populardestinationstats.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import batura2 from '../../components/assets/batura1.JPG';

const PopularDestinationDetailStats = ({ name }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleViewHuntsClick = () => {
    // Redirect to the SearchHuntingPage
    navigate('/searchhunt'); // Replace '/searchhunt' with the actual route for SearchHuntingPage
  };

  return (
    <div className='populardestinationdetail_main'>
      <div className="breadcrumb_populardestinationdetail">
        <a href="/">Home</a> &gt; Destination &gt; DestinationDetail
      </div>
      <div className="populardestinationdetail">
        <div className="populardestinationdetail-image-container">
          <img src={batura2} alt="Batura" className="populardestinationdetail-image-container-image" />
          <div className="populardestinationdetail-destination-content">
            <h1 className='populardestinationdetail-destination-content_head'>Hunting in {name}</h1>
            <button
              onClick={handleViewHuntsClick}
              className="populardestinationdetail-destination-content_head-view-hunts-button"
            >
              View 16 hunts
            </button>
            <p className='populardestinationdetail-destination-content_head-view-hunts-para'>
              16 hunting trips from many countries starting from November to April
            </p>
          </div>
        </div>
        <div className="populardestinationdetail-destination-content_head-view-hunts-stats-grid">
          <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
            <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">16</span>
            <span className="populardestinationdetail-destination-content_head-view-stat-label">hunts</span>
          </div>
          <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
            <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">2015</span>
            <span className="populardestinationdetail-destination-content_head-view-stat-label">starting from</span>
          </div>
          <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
            <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">33</span>
            <span className="populardestinationdetail-destination-content_head-view-stat-label">animals</span>
          </div>
          <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
            <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">2025</span>
            <span className="populardestinationdetail-destination-content_head-view-stat-label">to</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinationDetailStats;