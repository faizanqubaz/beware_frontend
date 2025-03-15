import './populardestinationstats.css'
import React,{useState} from 'react';
import batura2 from '../../components/assets/batura1.JPG';
const PopularDestinationDetailStats = ({name}) => {
    return(
        <div className='populardestinationdetail_main'>
    <div className="breadcrumb_populardestinationdetail">
        <a href="/">Home</a> &gt; Destination &gt; DestinationDetail
      </div>
      <div className="populardestinationdetail">
      <div className="populardestinationdetail-image-container">
        <img src={batura2} alt="Batura" className="populardestinationdetail-image-container-image" />
        <div className="populardestinationdetail-destination-content">
          <h1 className='populardestinationdetail-destination-content_head'>Hunting in {name}</h1>
          <button className="populardestinationdetail-destination-content_head-view-hunts-button">View 16 hunts</button>
          <p className='populardestinationdetail-destination-content_head-view-hunts-para'>16 hunting trips from 33 countries starting from $945</p>
        </div>
      </div>
      <div className="populardestinationdetail-destination-content_head-view-hunts-stats-grid">
        <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
          <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">164</span>
          <span className="populardestinationdetail-destination-content_head-view-stat-label">hunts</span>
        </div>
        <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
          <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">$945</span>
          <span className="populardestinationdetail-destination-content_head-view-stat-label">starting from</span>
        </div>
        <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
          <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">33</span>
          <span className="populardestinationdetail-destination-content_head-view-stat-label">animals</span>
        </div>
        <div className="populardestinationdetail-destination-content_head-view-hunts-stat-item">
          <span className="populardestinationdetail-destination-content_head-view-hunts-stat-number">15105km</span>
          <span className="populardestinationdetail-destination-content_head-view-stat-label">to the nearest trip</span>
        </div>
      </div>
    </div>

    </div>
    )
}

export default PopularDestinationDetailStats