import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall } from '../utils/analytics';
import LanguageToggle from './LanguageToggle.jsx';

const Header = () => {
  const { currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#services', label: currentLanguage === 'fa' ? 'خدمات' : 'Services' },
    { href: '#clinic-info', label: currentLanguage === 'fa' ? 'ساعات و آدرس' : 'Hours & Address' },
    { href: '#contact', label: currentLanguage === 'fa' ? 'تماس' : 'Contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-primary/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#main" className="text-white font-semibold text-lg tracking-tight">
          {currentLanguage === 'fa' ? 'کلینیک دکتر وردک' : 'Dr. Wardak Clinic'}
        </a>

        <nav className="hidden sm:flex items-center gap-4 text-white/80 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle size="compact" />
          <a
            href="tel:+93 78 915 8627"
            onClick={trackPhoneCall}
            className="btn bg-white text-primary px-4 py-2 rounded-lg font-semibold shadow hover:bg-muted transition"
          >
            <span>📞</span>
            <span>{currentLanguage === 'fa' ? 'تماس' : 'Call'}</span>
          </a>
        </nav>

        <button
          className="sm:hidden text-white/80 border border-white/20 rounded-lg px-3 py-2 text-sm"
          onClick={() => setOpen(!open)}
          aria-label={currentLanguage === 'fa' ? 'منو' : 'Menu'}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="sm:hidden bg-primary/90 backdrop-blur border-t border-white/10">
          <div className="px-4 py-3 space-y-2 text-white/90">
            <LanguageToggle size="compact" />
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+93 78 915 8627"
              onClick={(e) => {
                trackPhoneCall();
                setOpen(false);
              }}
              className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold shadow w-full justify-center"
            >
              <span>📞</span>
              <span>{currentLanguage === 'fa' ? 'تماس' : 'Call'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
