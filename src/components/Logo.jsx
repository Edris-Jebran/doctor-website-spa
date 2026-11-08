import React from 'react';

// Dari letter ج (Jebran), from Vazirmatn ExtraBold, on a lapis tile. Same drawing as public/favicon.svg.
const JIM = 'M28.91 11.77Q27.73 11.75 26.44 11.37Q25.15 10.99 23.83 10.43Q22.52 9.87 21.28 9.31Q20.03 8.75 18.97 8.37Q17.9 8 17.1 8Q15.17 8 13.73 9.1Q12.29 10.19 11.26 11.88L10.62 12.93L13.84 14.51L14.61 13.54Q15.03 13 15.66 12.52Q16.3 12.04 17.08 12.04Q17.35 12.04 17.86 12.2Q18.37 12.37 19.1 12.66Q19.83 12.94 20.74 13.32Q18.82 13.87 17.07 14.79Q15.33 15.71 13.97 17Q12.61 18.3 11.83 19.99Q11.05 21.68 11.05 23.76Q11.05 25.98 11.84 27.54Q12.63 29.11 14.02 30.09Q15.41 31.08 17.24 31.54Q19.07 32 21.18 32Q23.22 32 25.33 31.64Q27.44 31.29 29.38 30.51L28.21 26.61Q26.75 27.18 24.9 27.56Q23.05 27.95 21.02 27.95Q19.23 27.95 17.8 27.46Q16.37 26.98 15.54 26.02Q14.71 25.07 14.71 23.67Q14.71 22.16 15.58 20.95Q16.45 19.73 17.94 18.78Q19.42 17.84 21.27 17.16Q23.11 16.49 25.09 16.08Q27.07 15.67 28.9 15.52ZM22.13 19.64 19.54 22.24 22.13 24.83 24.73 22.24Z';

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg data-logo="mark" className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" fill="#1F3A93" />
      <path d={JIM} fill="#FFFFFF" />
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
