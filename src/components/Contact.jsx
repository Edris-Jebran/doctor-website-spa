import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';
import { telHref, whatsappHref } from '../utils/contactLinks';
import useCopy from '../utils/useCopy';
import Icon from './Icon';

const Contact = () => {
  const { content } = useLanguage();
  const { contact, ui } = content;
  const t = ui.contact;
  const [copyStatus, copy] = useCopy();

  return (
    <section id="contact" className="section on-dark girih bg-primary text-white" aria-labelledby="contact-title">
      <div className="container-page max-w-3xl">
        <h2 id="contact-title" className="h2 !text-white">
          {t.title}
        </h2>
        <p className="mt-3 max-w-measure text-white/85">{t.intro}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref(contact, contact.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="btn btn-accent sm:flex-1"
          >
            <Icon name="whatsapp" />
            <span>{ui.whatsappLong}</span>
          </a>
          <a href={telHref(contact)} onClick={trackPhoneCall} className="btn btn-outline-light sm:flex-1">
            <Icon name="phone" />
            <span>{ui.call}</span>
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="ltr-number text-xl font-bold text-white">{contact.phoneDisplay}</span>
          <button
            type="button"
            onClick={() => copy(contact.phoneDisplay)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-3 text-accent hover:underline underline-offset-4"
          >
            <Icon name={copyStatus === 'copied' ? 'check' : 'copy'} className="w-4 h-4" />
            <span>{t.copyPhone}</span>
          </button>
          <span aria-live="polite" className="text-sm text-white/80">
            {copyStatus === 'copied' && ui.copied}
            {copyStatus === 'failed' && ui.copyFailed}
          </span>
        </div>

        <p className="mt-6 text-white/85">{contact.abroadNote}</p>
        <p className="mt-3 border-s-4 border-accent ps-3 text-white">{contact.emergencyNote}</p>
      </div>
    </section>
  );
};

export default Contact;
