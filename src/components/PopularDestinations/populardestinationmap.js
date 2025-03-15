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

const center = {
  lat: 36.5115, // Latitude for Batura Glacier, Hunza
  lng: 74.5716, // Longitude for Batura Glacier, Hunza
};

// Coordinates for the Passu territory (example coordinates)
const passuTerritory = [
  { lat: 36.28, lng: 74.54 },
  { lat: 36.52, lng: 74.58 },
  { lat: 36.51, lng: 74.60 },
  { lat: 36.49, lng: 74.59 },
  { lat: 36.48, lng: 76.56 },
];

const PopularDestinationDetailLocation = ({ location, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pathname } = useLocation(); // Get current route location

  // Mock data for the popular hunts
  const discountData = [
    { id: 1, _id: '1', ibexphotos: [{ cloudinary_url: batura2 }], name: 'Fatmahhail' },
    { id: 2, _id: '2', ibexphotos: [{ cloudinary_url: batura2 }], name: 'Gucasem' },
    { id: 3, _id: '3', ibexphotos: [{ cloudinary_url: batura3 }], name: 'Yashpert' },
  ];

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
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
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
          <div className="popular_main_destination_main__image_container">
            {visibleImages.map((item) => (
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
