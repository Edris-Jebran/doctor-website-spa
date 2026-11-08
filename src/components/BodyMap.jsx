import React from 'react';

// Single-line front-view figure. Symmetric, so it needs no mirroring in RTL.
const SHAPES = {
  neck: [<path key="n" d="M91 52 H109 V70 H91 Z" />],
  chest: [<path key="c" d="M64 74 C78 67 122 67 136 74 C140 96 140 124 138 148 H62 C60 124 60 96 64 74 Z" />],
  abdomen: [<path key="a" d="M62 148 H138 C138 174 136 196 134 216 H66 C64 196 62 174 62 148 Z" />],
  groin: [<path key="g" d="M66 216 H134 C132 232 120 247 100 249 C80 247 68 232 66 216 Z" />],
  arms: [
    <path key="al" d="M61 78 C50 82 44 90 42 104 L34 196 C32 214 30 232 28 248 C34 252 40 252 44 248 C46 230 50 212 52 196 L60 124 Z" />,
    <path key="ar" d="M139 78 C150 82 156 90 158 104 L166 196 C168 214 170 232 172 248 C166 252 160 252 156 248 C154 230 150 212 148 196 L140 124 Z" />,
  ],
  legs: [
    <path key="ll" d="M69 236 C77 247 87 252 98 253 L95 398 H79 C76 340 72 290 69 236 Z" />,
    <path key="lr" d="M131 236 C123 247 113 252 102 253 L105 398 H121 C124 340 128 290 131 236 Z" />,
  ],
  feet: [
    <path key="fl" d="M79 398 H95 C96 406 97 414 96 420 C88 422 76 423 70 420 C70 412 74 404 79 398 Z" />,
    <path key="fr" d="M121 398 H105 C104 406 103 414 104 420 C112 422 124 423 130 420 C130 412 126 404 121 398 Z" />,
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
      <circle cx="100" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" />
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
