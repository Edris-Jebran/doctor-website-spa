import React, { useRef, useState } from 'react';
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
  const listTop = useRef(null);

  // When the filter bar is stuck and the list gets shorter, bring the list's start back into view.
  const revealList = () => {
    const el = listTop.current;
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 140 });
    }
  };

  const select = (id) => {
    const next = id === active ? null : id;
    setActive(next);
    revealList();
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
        onClick={() => {
          if (id) {
            select(id);
          } else {
            setActive(null);
            revealList();
          }
        }}
        className={`min-h-[44px] flex-none whitespace-nowrap rounded-md border px-4 transition-colors ${
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
          <div className="hidden md:block md:sticky md:top-24 md:self-start">
            <BodyMap regions={regions} active={active} onSelect={select} label={t.bodyMap} />
          </div>

          <div className="min-w-0">
            <h3 id="filter-title" className="text-lg">
              {t.filterLabel}
            </h3>
            <div
              role="group"
              aria-labelledby="filter-title"
              className="sticky top-16 z-20 -mx-5 mt-3 flex gap-2 overflow-x-auto border-b border-primary/10 bg-white px-5 py-2 [scrollbar-width:none] md:static md:mx-0 md:flex-wrap md:overflow-visible md:border-0 md:px-0 md:py-0"
            >
              {chip(null, t.all)}
              {regions.map((r) => chip(r.id, r.label))}
            </div>

            <p ref={listTop} className="mt-4 text-sm text-steel md:mt-6" aria-live="polite">
              {count}
            </p>
            {['orthopedic', 'general'].map((specialty) => {
              const group = shown.filter((p) => p.specialty === specialty);
              if (group.length === 0) return null;
              return (
                <div key={specialty} className="mt-6 first:mt-2">
                  <h4 id={`group-${specialty}`} className="text-base font-semibold text-primary">
                    {t[specialty]}
                  </h4>
                  <ul aria-labelledby={`group-${specialty}`} className="mt-2 divide-y divide-primary/10 border-y border-primary/10">
                    {group.map((p) => (
                      <li key={p.id} className="py-3.5">
                        <span className="font-semibold text-ink">{p.name}</span>
                        <p className="mt-0.5 max-w-measure text-steel">{p.plain}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

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
