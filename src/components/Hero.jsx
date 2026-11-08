import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackAppointmentClick, trackPhoneCall } from '../utils/analytics';
import { getOpenStatus, formatTime } from '../utils/clinicHours';
import { telHref, whatsappHref } from '../utils/contactLinks';
import Icon from './Icon';

const useNow = (intervalMs = 60000) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
};

const Hero = () => {
  const { lang, content } = useLanguage();
  const { hero, ui, contact, hours } = content;
  const now = useNow();
  const status = getOpenStatus(now, hours);
  const time = formatTime(status.state === 'open' ? status.close : status.open, lang);
  const statusText = ui.status[status.state].replace('{time}', time);
  const src = `${process.env.PUBLIC_URL}/${hero.imageUrl}`;

  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-20">
      <div className="container-page grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
        <div className="order-2 md:order-1">
          <h1 className="text-2xl sm:text-3xl">{hero.title}</h1>
          <p className="mt-3 text-lg text-ink">{hero.specialty}</p>
          <p className="mt-1 text-steel">{hero.since}</p>

          <p className="mt-5 inline-flex items-center gap-2 text-ink">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${status.state === 'open' ? 'bg-primary' : 'bg-steel'}`}
            />
            <span>{statusText}</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref(contact, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppointmentClick('hero_whatsapp')}
              className="btn btn-primary"
            >
              <Icon name="whatsapp" />
              <span>{ui.whatsappLong}</span>
            </a>
            <a href={telHref(contact)} onClick={trackPhoneCall} className="btn btn-secondary">
              <Icon name="phone" />
              <span>{ui.call}</span>
              <span className="ltr-number text-steel">{contact.phoneDisplay}</span>
            </a>
          </div>

          <a
            href="#surgery"
            className="mt-5 inline-flex min-h-[44px] items-center text-lapis underline underline-offset-4"
          >
            {ui.seeProcedures}
          </a>
        </div>

        <div className="order-1 md:order-2">
          <picture>
            <source srcSet={src.replace(/\.jpe?g$/, '.webp')} type="image/webp" />
            <img
              src={src}
              alt={hero.imageAlt}
              width="960"
              height="1280"
              fetchPriority="high"
              className="mx-auto aspect-[4/5] w-3/5 max-w-[240px] rounded-xl object-cover md:w-full md:max-w-md"
              style={{ objectPosition: '50% 20%' }}
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Hero;
