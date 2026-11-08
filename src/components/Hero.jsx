import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackAppointmentClick, trackPhoneCall } from '../utils/analytics';
import { getOpenStatus, formatTime } from '../utils/clinicHours';
import { telHref, whatsappHref } from '../utils/contactLinks';
import Icon from './Icon';

// null until mounted, so build-time HTML never contains a stale "open now".
const useNow = (intervalMs = 60000) => {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
};

const Hero = () => {
  const { lang, content } = useLanguage();
  const { hero, ui, contact, hours } = content;
  const now = useNow();
  const status = now ? getOpenStatus(now, hours) : null;
  const statusText = status
    ? ui.status[status.state].replace('{time}', formatTime(status.state === 'open' ? status.close : status.open, lang))
    : '\u00a0';
  const src = `${process.env.PUBLIC_URL}/${hero.imageUrl}`;

  const webp = src.replace(/\.jpe?g$/, '.webp');
  const webpSmall = src.replace(/\.jpe?g$/, '-480.webp');

  // Lapis band. Phones: small photo beside the name; desktop: large photo in its own column.
  return (
    <section className="on-dark girih relative bg-primary pt-16 text-white">
      <div className="container-page grid grid-cols-[96px_1fr] items-center gap-x-4 gap-y-5 py-8 sm:grid-cols-[128px_1fr] md:grid-cols-[1.1fr_0.9fr] md:gap-x-14 md:py-20">
        <picture className="col-start-1 row-start-1 md:col-start-2 md:row-span-2 md:row-start-1">
          <source
            srcSet={`${webpSmall} 480w, ${webp} 960w`}
            sizes="(min-width: 768px) 448px, 128px"
            type="image/webp"
          />
          <img
            src={src}
            alt={hero.imageAlt}
            width="960"
            height="1280"
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-xl object-cover ring-2 ring-accent/80 ring-offset-2 ring-offset-primary md:mx-auto md:max-w-md md:rounded-2xl md:ring-offset-8"
            style={{ objectPosition: '50% 20%' }}
          />
        </picture>

        <div className="col-start-2 row-start-1 md:col-start-1 md:self-end">
          <h1 className="text-2xl font-bold !text-white sm:text-3xl md:text-[2.75rem] md:leading-tight">{hero.title}</h1>
          <p className="mt-2 text-white/90 md:mt-4 md:text-lg">{hero.specialty}</p>
        </div>

        <div className="col-span-2 row-start-2 md:col-span-1 md:col-start-1 md:self-start">
          <p className="text-accent">{hero.since}</p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${status?.state === 'open' ? 'bg-accent' : 'bg-white/60'} ${status ? '' : 'invisible'}`}
            />
            <span>{statusText}</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref(contact, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppointmentClick('hero_whatsapp')}
              className="btn btn-accent"
            >
              <Icon name="whatsapp" />
              <span>{ui.whatsappLong}</span>
            </a>
            <a href={telHref(contact)} onClick={trackPhoneCall} className="btn btn-outline-light">
              <Icon name="phone" />
              <span>{ui.call}</span>
              <span className="ltr-number text-white/80">{contact.phoneDisplay}</span>
            </a>
          </div>

          <a
            href="#surgery"
            className="mt-4 inline-flex min-h-[44px] items-center text-white underline decoration-accent decoration-2 underline-offset-8"
          >
            {ui.seeProcedures}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
