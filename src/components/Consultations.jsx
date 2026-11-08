import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

// A real sequence (consult, prepare, recover), so the steps are numbered.
const Consultations = () => {
  const { lang, content } = useLanguage();
  const t = content.ui.consultations;
  const num = (n) => (lang === 'fa' ? n.toLocaleString('fa-AF') : n);

  return (
    <section className="section bg-white" aria-labelledby="visits-title">
      <div className="container-page">
        <h2 id="visits-title" className="h2">
          {t.title}
        </h2>
        <p className="mt-3 max-w-measure text-steel">{t.intro}</p>
        <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          <span aria-hidden="true" className="absolute bottom-6 start-5 top-6 w-0.5 bg-gold/50 md:hidden" />
          <span aria-hidden="true" className="absolute end-[16%] start-[16%] top-5 hidden h-0.5 bg-gold/50 md:block" />
          {content.consultations.map((c, i) => (
            <li key={c.id} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary text-lg font-bold text-white ring-4 ring-white">
                {num(i + 1)}
              </span>
              <div>
                <h3 className="text-lg">{c.name}</h3>
                <p className="mt-1 text-steel md:mt-2">{c.plain}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Consultations;
