import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const About = () => {
  const { content } = useLanguage();
  const { about } = content;
  const t = content.ui.about;

  return (
    <section id="about" className="section bg-white" aria-labelledby="about-title">
      <div className="container-page grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="about-title" className="h2">
            {t.title}
          </h2>
          <p className="mt-4 max-w-measure text-ink">{about.bio}</p>

          <h3 className="mt-8 text-lg">{t.credentials}</h3>
          <ul className="mt-3 space-y-2">
            {about.credentials.map((c) => (
              <li key={c} className="flex gap-3 text-ink">
                <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="space-y-8 md:pt-14">
          {about.highlights.map((h) => (
            <li key={h.title}>
              <h3 className="text-lg">{h.title}</h3>
              <p className="mt-2 max-w-measure text-steel">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
