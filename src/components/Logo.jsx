import React from 'react';

const img = (name) => `${process.env.PUBLIC_URL}/images/${name}`;

// Shield mark from the clinic logo (hands holding a cross). Decorative: the name is always beside it.
export function LogoMark({ className = 'h-9 w-auto' }) {
  return (
    <picture>
      <source srcSet={img('logo-mark.webp')} type="image/webp" />
      <img data-logo="mark" src={img('logo-mark.png')} alt="" width="93" height="112" className={className} />
    </picture>
  );
}

// Full English logo: shield + "Dr. Jebran Medical Clinic". `alt` carries the brand name.
export function LogoFull({ alt, className = 'h-10 w-auto' }) {
  return (
    <picture>
      <source srcSet={img('logo-full.webp')} type="image/webp" />
      <img data-logo="full" src={img('logo-full.png')} alt={alt} width="328" height="96" className={className} />
    </picture>
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
