import React from 'react';

// Stitched incision in a round badge. Same drawing as public/favicon.svg.
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg data-logo="mark" className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="20" fill="#1E5B52" />
      <path d="M13 27.5C17 23 23 17 27 12.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M12.1 22.8L17.7 28M15.5 19.3L21 24.5M19 15.5L24.5 20.7M22.3 12L27.9 17.2"
        stroke="#9FE3D0"
        strokeWidth="2"
        strokeLinecap="round"
      />
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
