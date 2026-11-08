import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';
import { telHref, whatsappHref } from '../utils/contactLinks';
import Icon from './Icon';

const StickyCTA = () => {
  const { content } = useLanguage();
  const { ui, contact } = content;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-primary/10 bg-white shadow-[0_-4px_16px_rgba(20,33,31,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="region"
      aria-label={ui.quickActions}
    >
      <div className="flex gap-3 px-4 py-3">
        <a
          href={whatsappHref(contact, contact.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="btn btn-primary flex-1"
        >
          <Icon name="whatsapp" />
          <span>{ui.whatsapp}</span>
        </a>
        <a href={telHref(contact)} onClick={trackPhoneCall} className="btn btn-secondary flex-1">
          <Icon name="phone" />
          <span>{ui.call}</span>
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
