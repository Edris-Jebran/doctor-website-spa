import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEmailClick, trackPhoneCall } from '../utils/analytics';
import { formatTime } from '../utils/clinicHours';
import { telHref } from '../utils/contactLinks';
import Icon from './Icon';

const Footer = () => {
  const { lang, content } = useLanguage();
  const { brand, contact, hours, locations, ui } = content;
  const clinic = locations.find((l) => l.type === 'clinic');
  const year = new Date().getFullYear();
  const social = [
    { key: 'facebook', label: 'Facebook', href: contact.socialLinks?.facebook },
    { key: 'instagram', label: 'Instagram', href: contact.socialLinks?.instagram },
  ].filter((s) => s.href);

  return (
    <footer className="on-dark bg-primary text-white">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2">
        <div>
          <p className="text-lg font-semibold">{brand.short}</p>
          <p className="mt-1 text-white/85">{content.hero.specialty}</p>
          <p className="mt-4 text-white/85">{clinic?.address}</p>
          <p className="text-white/85">
            {ui.locations.everyDay}: {formatTime(hours.open, lang)} – {formatTime(hours.close, lang)}
          </p>
        </div>

        <div className="sm:justify-self-end">
          <a
            href={telHref(contact)}
            onClick={trackPhoneCall}
            className="flex min-h-[44px] items-center gap-2 text-white hover:underline underline-offset-4"
          >
            <Icon name="phone" />
            <span className="ltr-number">{contact.phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            onClick={trackEmailClick}
            className="flex min-h-[44px] items-center gap-2 text-white break-anywhere hover:underline underline-offset-4"
          >
            {contact.email}
          </a>
          {social.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-white/85">{ui.footer.followUs}</span>
              {social.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10"
                >
                  <Icon name={s.key} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-white/15 safe-bottom">
        <p className="container-page py-5 text-sm text-white/80">
          © {year} {brand.short}. {ui.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
