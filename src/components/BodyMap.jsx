import React from 'react';

// Single-line front-view figure. Symmetric, so it needs no mirroring in RTL.
const SHAPES = {
  neck: [<rect key="n" x="90" y="60" width="20" height="16" rx="4" />],
  chest: [<path key="c" d="M66 82 Q100 74 134 82 L138 150 L62 150 Z" />],
  abdomen: [<path key="a" d="M62 150 L138 150 L136 218 L64 218 Z" />],
  groin: [<path key="g" d="M64 218 L136 218 L128 248 L72 248 Z" />],
  arms: [
    <path key="al" d="M60 86 L44 92 L30 200 L26 252 L40 254 L48 202 L60 128 Z" />,
    <path key="ar" d="M140 86 L156 92 L170 200 L174 252 L160 254 L152 202 L140 128 Z" />,
  ],
  legs: [
    <path key="ll" d="M72 248 L98 248 L96 400 L76 400 Z" />,
    <path key="lr" d="M102 248 L128 248 L124 400 L104 400 Z" />,
  ],
  feet: [
    <path key="fl" d="M76 400 L96 400 L98 420 L66 422 Z" />,
    <path key="fr" d="M104 400 L124 400 L134 422 L102 420 Z" />,
  ],
};

export default function BodyMap({ regions, active, onSelect, label }) {
  const onKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg
      viewBox="0 0 200 440"
      role="group"
      aria-label={label}
      className="w-full max-w-[220px] text-primary"
    >
      <circle cx="100" cy="36" r="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" />
      {regions
        .filter((r) => SHAPES[r.id])
        .map((r) => {
          const isActive = active === r.id;
          return (
            <g
              key={r.id}
              role="button"
              tabIndex={0}
              aria-label={r.label}
              aria-pressed={isActive}
              onClick={() => onSelect(r.id)}
              onKeyDown={(e) => onKeyDown(e, r.id)}
              className="cursor-pointer outline-none [&:focus-visible>*]:stroke-lapis [&:focus-visible>*]:stroke-[4]"
              fill="currentColor"
              fillOpacity={isActive ? 0.85 : 0.04}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              style={{ transition: 'fill-opacity 150ms ease' }}
            >
              <title>{r.label}</title>
              {SHAPES[r.id]}
            </g>
          );
        })}
    </svg>
  );
}
