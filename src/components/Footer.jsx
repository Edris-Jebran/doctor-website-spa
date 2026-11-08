import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEmailClick, trackPhoneCall } from '../utils/analytics';
import { formatTime } from '../utils/clinicHours';
import { telHref } from '../utils/contactLinks';
import Icon from './Icon';
import { LogoMark, JTMark } from './Logo';

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
    <footer className="on-dark bg-ink text-white">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-2.5 text-lg font-bold">
            <LogoMark className="h-9 w-9 flex-none rounded-[11px] ring-1 ring-white/30" />
            <span>{brand.short}</span>
          </p>
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
        <div className="container-page flex flex-col gap-3 py-5 text-sm text-white/80 md:pe-20 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {brand.short}. {ui.footer.rights}
          </p>
          <a
            href="https://jebrantech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 text-white/90 hover:text-white"
          >
            <span>{ui.footer.builtBy}</span>
            <JTMark className="h-7 w-7 flex-none rounded-md ring-1 ring-white/25" />
            <span lang="en" className="font-bold text-white underline-offset-4 hover:underline">
              JT Web Services
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
