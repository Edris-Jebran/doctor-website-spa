import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall, trackAppointmentClick } from '../utils/analytics';

const StickyCTA = () => {
  const { currentLanguage } = useLanguage();

  const labels = {
    call: currentLanguage === 'fa' ? 'تماس' : 'Call',
    chat: currentLanguage === 'fa' ? 'واتساپ' : 'WhatsApp',
  };

  return (
    <div
      className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur border-t border-gray-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="region"
      aria-label={currentLanguage === 'fa' ? 'اقدامات سریع' : 'Quick actions'}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <a
          href="tel:+93 78 915 8627"
          onClick={trackPhoneCall}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-semibold shadow active:scale-[0.99] transition"
          aria-label={currentLanguage === 'fa' ? 'تماس تلفنی' : 'Call the clinic'}
        >
          <span>📞</span>
          <span>{labels.call}</span>
        </a>
        <a
          href="https://wa.me/93789158627?text=Hello%20Dr.%20Wardak,%20I%20would%20like%20to%20schedule%20an%20appointment."
          onClick={() => trackAppointmentClick('sticky_cta_whatsapp')}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold shadow active:scale-[0.99] transition"
          aria-label={currentLanguage === 'fa' ? 'پیام واتساپ' : 'WhatsApp the clinic'}
        >
          <span>💬</span>
          <span>{labels.chat}</span>
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
