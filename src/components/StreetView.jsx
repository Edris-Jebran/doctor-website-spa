import React from 'react';

const StreetView = ({ coords, address }) => {
  // Use a static street view URL that doesn't require API key
  const streetViewUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=18&output=embed&t=k`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-primary">Street View</h3>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
      <div className="relative h-64">
        <iframe
          title="Street View"
          src={streetViewUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          📍 {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
        </div>
      </div>
    </div>
  );
};

export default StreetView;
