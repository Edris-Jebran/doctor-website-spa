import React from 'react';

// "EJ" monogram over a stitched incision. Same drawing as public/favicon.svg.
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg data-logo="mark" className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="9" fill="#1E5B52" />
      <g stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="square">
        <path d="M10 9.5V25.5M10 9.5H18.5M10 17.5H16.5M10 25.5H18.5" />
        <path d="M29 9.5V21a4.5 4.5 0 0 1-4.5 4.5H23" />
      </g>
      <g stroke="#9FE3D0" strokeLinecap="round">
        <path d="M8 31.5H32" strokeWidth="2" />
        <path d="M12 29.5V33.5M17.3 29.5V33.5M22.6 29.5V33.5M28 29.5V33.5" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

// JT Web Services mark, copied from jebrantech.com (professional_services/JebranTechnologies/public/favicon.svg).
export function JTMark({ className = 'h-7 w-7' }) {
  return (
    <svg data-logo="jt" className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="9" fill="#0B0F14" />
      <g transform="translate(1.5 0)">
        <path d="M14 9V19a6 6 0 0 1-6 6" stroke="#F6F4EE" strokeWidth="4.4" />
        <path d="M20 11.2H33M26.5 11.2V27" stroke="#F6F4EE" strokeWidth="4.4" />
        <path d="M8 32H29" stroke="#42D3C1" strokeWidth="2.4" />
        <circle cx="32" cy="32" r="2.6" fill="#42D3C1" />
      </g>
    </svg>
  );
}
