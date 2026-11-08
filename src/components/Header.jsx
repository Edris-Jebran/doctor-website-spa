import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall } from '../utils/analytics';
import { telHref } from '../utils/contactLinks';
import LanguageToggle from './LanguageToggle.jsx';
import Icon from './Icon';

const Header = () => {
  const { content } = useLanguage();
  const { ui, brand, contact } = content;
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const links = [
    { href: '#surgery', label: ui.nav.surgery },
    { href: '#about', label: ui.nav.about },
    { href: '#locations', label: ui.nav.locations },
    { href: '#contact', label: ui.nav.contact },
  ];

  useEffect(() => {
    if (!open) return undefined;
    const first = menuRef.current?.querySelector('a, button');
    if (first instanceof HTMLElement) first.focus();
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-primary/10 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#main" className="text-lg font-semibold text-primary">
          {brand.short}
        </a>

        <nav className="hidden md:flex items-center gap-1 text-ink" aria-label={ui.menu}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center rounded-md px-3 hover:text-primary hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle className="text-lapis" />
          <a href={telHref(contact)} onClick={trackPhoneCall} className="btn btn-primary ms-2">
            <Icon name="phone" className="w-4 h-4" />
            <span>{ui.call}</span>
          </a>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle className="text-lapis" />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? ui.closeMenu : ui.menu}
          >
            <Icon name={open ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav-panel" ref={menuRef} className="md:hidden border-t border-primary/10 bg-white" aria-label={ui.menu}>
          <ul className="container-page py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center text-lg text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
