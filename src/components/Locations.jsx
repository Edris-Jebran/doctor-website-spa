import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackMapInteraction } from '../utils/analytics';
import { formatTime } from '../utils/clinicHours';
import useCopy from '../utils/useCopy';
import Icon from './Icon';

const isWideScreen = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 768px)').matches;

// Desktop: load when scrolled near. Phones: wait for a tap, a Google Maps embed costs ~1 MB of data.
const LazyMap = ({ coords, t, lang }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isWideScreen()) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          trackMapInteraction('locations_auto_load_map');
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const show = () => {
    setVisible(true);
    trackMapInteraction('locations_tap_load_map');
  };

  return (
    <div ref={ref} className="h-56 overflow-hidden rounded-md bg-muted sm:h-64">
      {visible ? (
        <iframe
          title={t.mapTitle}
          src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=16&hl=${lang === 'fa' ? 'fa' : 'en'}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
          <button type="button" onClick={show} className="btn btn-secondary">
            <Icon name="map" />
            <span>{t.showMap}</span>
          </button>
          <p className="text-sm text-steel">{t.mapDataNote}</p>
        </div>
      )}
    </div>
  );
};

const Locations = () => {
  const { lang, content } = useLanguage();
  const { locations, hours, whatToBring, ui } = content;
  const t = ui.locations;
  const [copyStatus, copy] = useCopy();
  const hoursText = `${t.everyDay}: ${formatTime(hours.open, lang)} – ${formatTime(hours.close, lang)}`;

  return (
    <section id="locations" className="section bg-white" aria-labelledby="locations-title">
      <div className="container-page">
        <h2 id="locations-title" className="h2">
          {t.title}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {locations.map((loc) =>
            loc.type === 'clinic' ? (
              <article key={loc.name} className="rounded-xl border border-primary/15 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Icon name="clinic" className="w-6 h-6 text-primary" />
                  <h3 className="text-lg">{loc.name}</h3>
                </div>
                <p className="mt-1 text-steel">{loc.note}</p>

                <dl className="mt-4 space-y-3">
                  <div className="flex gap-3">
                    <dt className="sr-only">{t.title}</dt>
                    <Icon name="map" className="mt-1 w-5 h-5 flex-none text-steel" />
                    <dd className="text-ink">{loc.address}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="sr-only">{t.hours}</dt>
                    <Icon name="clock" className="mt-1 w-5 h-5 flex-none text-steel" />
                    <dd className="text-ink">{hoursText}</dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <LazyMap coords={loc.coords} t={t} lang={lang} />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coords.lat},${loc.coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMapInteraction('locations_directions')}
                    className="btn btn-primary"
                  >
                    <Icon name="map" />
                    <span>{t.directions}</span>
                  </a>
                  <button type="button" onClick={() => copy(loc.address)} className="btn btn-secondary">
                    <Icon name={copyStatus === 'copied' ? 'check' : 'copy'} />
                    <span>{t.copyAddress}</span>
                  </button>
                  <span aria-live="polite" className="text-sm text-steel">
                    {copyStatus === 'copied' && ui.copied}
                    {copyStatus === 'failed' && ui.copyFailed}
                  </span>
                </div>

                <h4 className="mt-6 font-bold text-primary">{t.whatToBring}</h4>
                <ul className="mt-2 space-y-1">
                  {whatToBring.map((item) => (
                    <li key={item} className="flex gap-3 text-ink">
                      <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : (
              <article key={loc.name} className="girih self-start rounded-xl bg-primary p-5 text-white sm:p-6 on-dark">
                <div className="flex items-center gap-3">
                  <Icon name="hospital" className="w-6 h-6" />
                  <h3 className="text-lg text-white">{loc.name}</h3>
                </div>
                <p className="mt-2 text-white/90">{loc.note}</p>
                {loc.address && (
                  <p className="mt-4 flex gap-3 text-white">
                    <Icon name="map" className="mt-1 w-5 h-5 flex-none text-accent" />
                    <span>{loc.address}</span>
                  </p>
                )}
                {loc.coords && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coords.lat},${loc.coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMapInteraction('hospital_directions')}
                    className="btn btn-outline-light mt-5"
                  >
                    <Icon name="map" />
                    <span>{t.directions}</span>
                  </a>
                )}
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Locations;
