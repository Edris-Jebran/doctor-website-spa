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
  const [open, setOpen] = useState(null);
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
        className={`min-h-[44px] flex-none whitespace-nowrap rounded-full border px-4 transition-colors ${
          pressed ? 'border-primary bg-primary text-white' : 'border-primary/20 bg-white text-ink hover:border-primary'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <section id="surgery" className="section bg-muted" aria-labelledby="surgery-title">
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
              className="sticky top-16 z-20 -mx-5 mt-3 flex gap-2 overflow-x-auto border-b border-primary/10 bg-muted px-5 py-2 [scrollbar-width:none] md:static md:mx-0 md:flex-wrap md:overflow-visible md:border-0 md:px-0 md:py-0"
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
                  <h4 id={`group-${specialty}`} className="inline-block border-b-2 border-gold pb-0.5 text-base font-bold text-goldInk">
                    {t[specialty]}
                  </h4>
                  <ul aria-labelledby={`group-${specialty}`} className="mt-3 grid items-start gap-2 md:grid-cols-2">
                    {group.map((p) => {
                      const isOpen = open === p.id;
                      return (
                        <li key={p.id} className={`rounded-lg border bg-white transition-colors ${isOpen ? 'border-primary' : 'border-primary/15'}`}>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`op-${p.id}`}
                            onClick={() => {
                              setOpen(isOpen ? null : p.id);
                              if (!isOpen) trackServiceClick(`procedure_${p.id}`);
                            }}
                            className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2.5 text-start font-bold text-ink"
                          >
                            <span className="flex-1">{p.name}</span>
                            <Icon name="chevron" className={`h-4 w-4 flex-none text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div id={`op-${p.id}`} className="px-4 pb-4">
                              <p className="text-steel">{p.plain}</p>
                              <a
                                href={whatsappHref(contact, contact.whatsappProcedureMessage.replace('{name}', p.name))}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={trackWhatsAppClick}
                                className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-bold text-primary underline-offset-4 hover:underline"
                              >
                                <Icon name="whatsapp" className="h-5 w-5" />
                                <span>{t.askAbout}</span>
                              </a>
                            </div>
                          )}
                        </li>
                      );
                    })}
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
