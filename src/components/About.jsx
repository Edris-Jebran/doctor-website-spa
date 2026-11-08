import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import Icon from './Icon';

const About = () => {
  const { content } = useLanguage();
  const { about } = content;
  const t = content.ui.about;

  return (
    <section id="about" className="section bg-muted" aria-labelledby="about-title">
      <div className="container-page grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <h2 id="about-title" className="h2">
            {t.title}
          </h2>
          <p className="mt-5 max-w-measure border-s-4 border-accent ps-4 text-ink md:text-lg">{about.bio}</p>

          <h3 className="mt-8 text-lg">{t.credentials}</h3>
          <ul className="mt-3 space-y-2">
            {about.credentials.map((c) => (
              <li key={c} className="flex gap-3 text-ink">
                <span aria-hidden="true" className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/25 text-accentInk">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="divide-y divide-primary/10 md:pt-12">
          {about.highlights.map((h) => (
            <li key={h.title} className="py-5 first:pt-0">
              <h3 className="text-lg">{h.title}</h3>
              <p className="mt-1.5 max-w-measure text-steel">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
