import './populardestinationmap.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polygon, useLoadScript } from '@react-google-maps/api';
import { Link, useLocation } from 'react-router-dom';
import batura2 from '../../components/assets/batura1.JPG';
import batura3 from '../../components/assets/passu1.jpg';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

// Default center for the map (Passu coordinates)
const defaultCenter = {
  lat: 36.5115, // Latitude for Passu
  lng: 74.5716, // Longitude for Passu
};

// Coordinates for the Passu territory (example coordinates)
const passuTerritory = [
  { lat: 36.5000, lng: 74.9000 },  // Janabad Village (north)
  { lat: 36.4870, lng: 74.5894 },  // Passu Sar Peak (northwest)
  { lat: 36.5104, lng: 74.5225 },  // Batura Sar Peak (west)
  { lat: 36.5333, lng: 74.6667 },  // Batura Glacier (northwest)
  { lat: 36.490, lng: 74.780 },    // West of Passu
  { lat: 36.4560, lng: 74.8700 },  // Khuramabad (southwest)
  { lat: 36.450, lng: 74.820 },    // South of Passu
  { lat: 36.4300, lng: 74.8500 },  // Yeshperth Village (southeast)
  { lat: 36.4225, lng: 74.8600 },  // Gucesm Village (approximate southeast)
  { lat: 36.4642, lng: 74.8856 },  // Passu Suspension Bridge (east)
  { lat: 36.467, lng: 74.900 },    // Passu Village (center north)
  { lat: 36.4694, lng: 74.8656 },  // Passu Cones (northeast)
];

const PopularDestinationDetailLocation = ({ location = defaultCenter, name = 'Passu' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pathname } = useLocation(); // Get current route location

  // Mock data for the popular hunts
  const discountData = [
    { id: 1, _id: '1', ibexphotos: [{ cloudinary_url: batura2 }], name: 'Fatmahhail' },
    { id: 2, _id: '2', ibexphotos: [{ cloudinary_url: batura2 }], name: 'Gucasem' },
    { id: 3, _id: '3', ibexphotos: [{ cloudinary_url: batura3 }], name: 'Yashpert' },
  ];

  // Auto-slide functionality for mobile only
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Check if the screen width is mobile size
    let interval;

    if (isMobile) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % discountData.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup interval on unmount
    };
  }, [discountData.length]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs', // Replace with your API key
  });

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="argentina-map-container_main">
      <div className="argentina-map-container">
        <h2 className="argentina-map-title">{name} on Map</h2>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={location}>
          <Marker position={location} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />
          <Polygon
            paths={passuTerritory}
            options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2, fillColor: '#FF0000', fillOpacity: 0.35 }}
          />
        </GoogleMap>
        <p className="argentina-map-note">
          Q. View bigger map | Keyboard download | Map data ©2025 Google, RGCI | Terms
        </p>
      </div>

      <div className="popular_main_destination_main_container">
        <div className="popular_main_destination_main_container_slider">
          <div
            className="popular_main_destination_main__image_container"
            style={{
              transform: window.innerWidth <= 768 ? `translateX(${-currentIndex * 100}%)` : 'none', // Slide only on mobile
            }}
          >
            {discountData.map((item, index) => (
              <Link
                key={item.id}
                to={`/populardestinationdetail/${item._id}`}
                state={{ item }}
                className="popular_main_destination_main__image_container_one"
              >
                <div className="popular_main_destination_main__image_wrapper">
                  <img
                    className="popular_main_destination_main__image_container_one_image"
                    src={item.ibexphotos[0].cloudinary_url}
                    alt={item.name}
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
  );
};

export default PopularDestinationDetailLocation;