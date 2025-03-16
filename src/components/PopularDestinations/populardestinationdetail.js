import React, { useState } from 'react';
import './populardestinationdetail.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg'; 
import batura4 from '../../components/assets/focus.jpg'; 
import bird from '../../components/assets/bird.jpg';
import hospility from '../../components/assets/hospitality.jpg';
import snow_leopard from '../../components/assets/snow_leopard.jpg';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import HuntingInfo from './huntinginfo';
import DestinationReview from './review';
import GuideComponent from '../guides/guide';
import AnimalDestination from './destinationanimal';
import FooterComponent from '../Footer/footer';
import PopularDestinationDetailStats from './populardestinationstats';
import PopularDestinationDetailLocation from './populardestinationmap';

const PopularDestinationDetail = () => {
  const location = useLocation();
  console.log('state',location.state)
  const { item } = location?.state || {};
console.log('l',item)
  return (
    <>
      <PopularDestinationDetailStats name={item?.name} />

      <div className="why-argentina-container">
        <h1 className="why-argentina-title">Why {item?.name}</h1>
        <div className="why-argentina-content">
          <div className="why-argentina-section">
            <img src={bird} alt="Wingshooting" className="why-argentina-section-image" />
            <h2 className="why-argentina-section-title">Wingshooting</h2>
            <p className="why-argentina-section-description">
              World-class high-volume wingshooting for doves, pigeons, ducks, and partridges
            </p>
          </div>
          <div className="why-argentina-section">
            <img src={snow_leopard} alt="Big-game hunting" className="why-argentina-section-image" />
            <h2 className="why-argentina-section-title">Big-game hunting</h2>
            <p className="why-argentina-section-description">
              Excellent big-game hunting, including some of the world's best red stag hunts
            </p>
          </div>
          <div className="why-argentina-section">
            <img src={hospility} alt="Accommodation and hospitality" className="why-argentina-section-image" />
            <h2 className="why-argentina-section-title">Accommodation and hospitality</h2>
            <p className="why-argentina-section-description">
              Upscale hunting accommodations with excellent food and wine are typical on {item?.name} hunts
            </p>
          </div>
        </div>
      </div>

      <PopularDestinationDetailLocation location={item?.location} name={item?.name} />

      <div className="about-hunting">
        <h1>About hunting in {item?.name}</h1>
        <p>
        {item?.name} is the most popular hunting destination in the world, attracting more than 20,000 foreign hunters every year. The vast majority are wingshooters, many of whom come for Argentina’s world-famous high-volume dove shooting. Doves are considered pests in this region; huge flocks come into agricultural fields in incredible numbers. However, Argentina is also an excellent destination for big-game hunters; it has some of the best free-range red stag hunting in the world.
        </p>
        <p>
          Cordoba Province is the most famous destination for high-volume dove shooting, but there are many other regions that have excellent wingshooting. Waterfowl and upland birds are plentiful in many areas and provide outstanding mixed-bag wingshooting. Most hunters choose either wingshooting or big-game hunting since they usually take place in different areas; however, combo hunts are possible. Red stags were originally introduced into Patagonia in the foothills of the Andes and La Pampa Province a hundred years ago. In addition to stags, other big game is available to hunt, including water buffalo, brochet deer, white-lipped pecsary, and wild boat. Other animals have been introduced in some areas, including axis deer, blackbuck, fallow deer, feral goats and sheep, and moulton. Pumas are also plentiful.
        </p>
        <p>
          Many lodges in Argentina are upscale, with excellent food and wine provided, and often a midday barbecue is served in the field. The country is filled with interesting culture and contrasts, including gauches in traditional dress sitting in sheepskin-lined saddles, villagers driving horse-drawn carts, and locals passing around the traditional gourd of mate.
        </p>
      </div>

      <div className='hunting_info_main_component'>
        <HuntingInfo />
      </div>
      <div>
        <GuideComponent />
      </div>
      <div className='destinationreview_info_main_component'>
        <DestinationReview />
      </div>
      <AnimalDestination />

      <FooterComponent />
    </>
  );
};

export default PopularDestinationDetail;