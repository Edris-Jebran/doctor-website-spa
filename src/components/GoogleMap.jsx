import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ coords, address }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: coords.lat,
    lng: coords.lng
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        <Marker
          position={center}
          title={address}
          label={{
            text: "🏥",
            className: "marker-label"
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
