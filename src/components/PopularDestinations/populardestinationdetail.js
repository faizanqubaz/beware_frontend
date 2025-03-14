import React,{useState} from 'react';
import './populardestinationdetail.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import batura from '../../components/assets/batura2.jpg';
import batura1 from '../../components/assets/batura3.jpg';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg'; 
import batura4 from '../../components/assets/focus.jpg'; 
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import HuntingInfo from './huntinginfo';
import DestinationReview from './review';
const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 36.5115, // Latitude for Batura Glacier, Hunza
  lng: 74.5716, // Longitude for Batura Glacier, Hunza
};

const baturaLocation = {
  lat: 36.5115, // Latitude for Batura Glacier, Hunza
  lng: 74.5716, // Longitude for Batura Glacier, Hunza
};

const PopularDestinationDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for the popular hunts
  const [discountData, setDiscountData] = useState([
    {
      id: 1,
      _id: '1',
      ibexphotos: [{ cloudinary_url: batura2 }],
      name: 'Fatmahhail',
    },
    {
      id: 2,
      _id: '2',
      ibexphotos: [{ cloudinary_url: batura2 }],
      name: 'Gucasem',
    },
    {
      id: 3,
      _id: '3',
      ibexphotos: [{ cloudinary_url: batura3 }],
      name: 'Yashpert'
    }
  ]);



  // Calculate the number of items to display (up to 3)
  const totalItems = discountData.length;
  const itemsToShow = Math.min(3, totalItems);
  const visibleImages = [];

  for (let i = 0; i < itemsToShow; i++) {
    visibleImages.push(discountData[(currentIndex + i) % totalItems]);
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs', // Replace with your API key
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
   <div className='populardestinationdetail_main'>
    <div className="breadcrumb_populardestinationdetail">
        <a href="/">Home</a> &gt; Destination &gt; DestinationDetail
      </div>
      <div className="populardestinationdetail">
      <div className="populardestinationdetail-image-container">
        <img src={batura2} alt="Batura" className="populardestinationdetail-image-container-image" />
        <div className="populardestinationdetail-destination-content">
          <h1 className='populardestinationdetail-destination-content_head'>Hunting in Batura</h1>
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


    <div className="why-argentina-container">
      <h1 className="why-argentina-title">Why Argentina</h1>
      <div className="why-argentina-content">
        <div className="why-argentina-section">
          <img src={batura2} alt="Wingshooting" className="why-argentina-section-image" />
          <h2 className="why-argentina-section-title">Wingshooting</h2>
          <p className="why-argentina-section-description">
            World-class high-volume wingshooting for doves, pigeons, ducks, and partridges
          </p>
        </div>
        <div className="why-argentina-section">
          <img src={batura} alt="Big-game hunting" className="why-argentina-section-image" />
          <h2 className="why-argentina-section-title">Big-game hunting</h2>
          <p className="why-argentina-section-description">
            Excellent big-game hunting, including some of the world's best red stag hunts
          </p>
        </div>
        <div className="why-argentina-section">
          <img src={batura3} alt="Accommodation and hospitality" className="why-argentina-section-image" />
          <h2 className="why-argentina-section-title">Accommodation and hospitality</h2>
          <p className="why-argentina-section-description">
            Upscale hunting accommodations with excellent food and wine are typical on Argentine hunts
          </p>
        </div>
      </div>
    </div>


   <div className='argentina-map-container_main'>
   <div className="argentina-map-container">
      <h2 className="argentina-map-title">Argentina on Map</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10} // Adjust the zoom level to focus on Argentina
        center={center}
      >
        <Marker
          position={baturaLocation}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red dot icon
          }}
        />
      </GoogleMap>
      <p className="argentina-map-note">
        Q. View bigger map | Keyboard download | Map data ©2025 Google, RGCI | Terms
      </p>
    </div>
    
    <div className="popular_main_destination_main_container">
         <div className='popular_main_destination_main_container_slider'>
           <div className='popular_main_destination_main__image_container'>
             {visibleImages.map((item) => (
               <Link
                 key={item.id}
                 to={`/populardestinationdetail/${item._id}`}
                 state={{ item }}
                 className='popular_main_destination_main__image_container_one'
               >
                 <div className="popular_main_destination_main__image_wrapper">
                   <img
                     className='popular_main_destination_main__image_container_one_image'
                     src={item.ibexphotos[0].cloudinary_url}
                     alt={item.description}
                   />
                   <div className="popular_main_destination_main__image_overlay">
                     <h3 className="popular_main_destination_main__image_overlay_text">{item.name}</h3>
                   </div>
                 </div>
               </Link>
             ))}
           </div>
         </div>
       </div>
   </div>


   <div className="about-hunting">
      <h1>About hunting in Argentina</h1>
      <p>
        Argentina is the most popular hunting destination in the world, attracting more than 20,000 foreign hunters every year. The vast majority are wingshooters, many of whom come for Argentina’s world-famous high-volume dove shooting. Doves are considered pests in this region; huge flocks come into agricultural fields in incredible numbers. However, Argentina is also an excellent destination for big-game hunters; it has some of the best free-range red stag hunting in the world.
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
<DestinationReview />
  

    </>
  
  );
};

export default PopularDestinationDetail;