import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const Consultations = () => {
  const { content } = useLanguage();
  const t = content.ui.consultations;

  return (
    <section className="section" aria-labelledby="visits-title">
      <div className="container-page">
        <h2 id="visits-title" className="h2">
          {t.title}
        </h2>
        <p className="mt-3 max-w-measure text-steel">{t.intro}</p>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {content.consultations.map((c) => (
            <li key={c.id} className="border-t-2 border-primary pt-4">
              <h3 className="text-lg">{c.name}</h3>
              <p className="mt-2 text-steel">{c.plain}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Consultations;
