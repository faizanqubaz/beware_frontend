import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Polyline, Marker, LoadScript } from '@react-google-maps/api';
import './detail_discount.css';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const DiscountMap = ({ destination }) => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Ensure destination has valid lat and lng properties
  const destinationLocation = destination?.lat && destination?.lng
    ? {
        lat: parseFloat(destination.lat),
        lng: parseFloat(destination.lng),
      }
    : null;

  // Create the path if both locations are valid
  const path = userLocation && destinationLocation ? [userLocation, destinationLocation] : [];

  // Use useEffect to fit bounds when both userLocation and destinationLocation are available
  useEffect(() => {
    if (mapRef.current && userLocation && destinationLocation) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(userLocation);
      bounds.extend(destinationLocation);
      mapRef.current.fitBounds(bounds); // Auto-zoom to fit both markers
    }
  }, [userLocation, destinationLocation]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs"> {/* Load the Google Maps API */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={(map) => (mapRef.current = map)} // Capture map reference
        center={userLocation || { lat: 0, lng: 0 }} // Fallback center
        zoom={5} // Default zoom, will be overridden by fitBounds if markers exist
        options={mapOptions}
      >
        {/* Marker for User's current location */}
        {userLocation && <Marker position={userLocation} label="You" />}

        {/* Marker for Destination location */}
        {destinationLocation && <Marker position={destinationLocation} label="Destination" />}

        {/* Only render polyline if both userLocation and destinationLocation are valid */}
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              strokeWeight: 4,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default DiscountMap;
