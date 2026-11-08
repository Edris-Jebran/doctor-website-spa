import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackServiceClick, trackWhatsAppClick } from '../utils/analytics';
import { whatsappHref } from '../utils/contactLinks';
import BodyMap from './BodyMap';
import Icon from './Icon';

const Procedures = () => {
  const { lang, content } = useLanguage();
  const { regions, procedures, contact } = content;
  const t = content.ui.procedures;
  const [active, setActive] = useState(null);

  const select = (id) => {
    const next = id === active ? null : id;
    setActive(next);
    if (next) trackServiceClick(`region_${next}`);
  };

  const shown = active ? procedures.filter((p) => p.regions.includes(active)) : procedures;
  const count = t.count.replace('{n}', lang === 'fa' ? shown.length.toLocaleString('fa-AF') : shown.length);

  const chip = (id, label) => {
    const pressed = active === id;
    return (
      <button
        key={id ?? 'all'}
        type="button"
        aria-pressed={pressed}
        onClick={() => (id ? select(id) : setActive(null))}
        className={`min-h-[44px] rounded-md border px-4 transition-colors ${
          pressed ? 'border-primary bg-primary text-white' : 'border-primary/30 bg-white text-ink hover:border-primary'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <section id="surgery" className="section bg-white" aria-labelledby="surgery-title">
      <div className="container-page">
        <h2 id="surgery-title" className="h2">
          {t.title}
        </h2>
        <p className="mt-3 max-w-measure text-steel">{t.intro}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
          <div className="hidden md:block">
            <BodyMap regions={regions} active={active} onSelect={select} label={t.bodyMap} />
          </div>

          <div>
            <h3 id="filter-title" className="text-lg">
              {t.filterLabel}
            </h3>
            <div role="group" aria-labelledby="filter-title" className="mt-3 flex flex-wrap gap-2">
              {chip(null, t.all)}
              {regions.map((r) => chip(r.id, r.label))}
            </div>

            <p className="mt-6 text-sm text-steel" aria-live="polite">
              {count}
            </p>
            <ul aria-labelledby="surgery-title" className="mt-2 divide-y divide-primary/10 border-y border-primary/10">
              {shown.map((p) => (
                <li key={p.id} className="py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-medium text-ink">{p.name}</span>
                    <span className="text-sm text-steel">{t[p.specialty]}</span>
                  </div>
                  <p className="mt-1 max-w-measure text-steel">{p.plain}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-ink">{t.notSure}</p>
              <a
                href={whatsappHref(contact, contact.whatsappXrayMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="btn btn-primary"
              >
                <Icon name="whatsapp" />
                <span>{t.xrayCta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Procedures;
