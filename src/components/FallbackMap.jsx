import React from 'react';

const FallbackMap = ({ coords, address }) => {
  const mapUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=15&output=embed`;
  
  return (
    <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
      <iframe
        title="Clinic Location"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default FallbackMap;
