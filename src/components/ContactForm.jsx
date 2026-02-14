import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';

const ContactForm = () => {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'fa';
  const [copied, setCopied] = useState(false);
  
  const getContactTitle = () => {
    return currentLanguage === 'fa' ? 'تماس با ما' : 'Contact Us';
  };

  const getContactDescription = () => {
    return currentLanguage === 'fa'
      ? 'آماده رزرو نوبت یا سوال دارید؟ ما اینجا هستیم تا کمک کنیم.'
      : 'Ready to schedule an appointment or have questions? We\'re here to help.';
  };

  const getGetInTouch = () => {
    return currentLanguage === 'fa' ? 'با ما در تماس باشید' : 'Get in Touch';
  };

  const getCallDescription = () => {
    return currentLanguage === 'fa'
      ? 'برای مشاوره فوری یا رزرو نوبت، مستقیماً با ما تماس بگیرید.'
      : 'For immediate consultation or appointment booking, call us directly.';
  };

  const getWhatsApp = () => {
    return currentLanguage === 'fa' ? 'واتساپ' : 'WhatsApp';
  };

  const getWhatsAppDescription = () => {
    return currentLanguage === 'fa'
      ? 'برای پیام‌های سریع و رزرو نوبت از طریق واتساپ.'
      : 'For quick messages and appointment booking via WhatsApp.';
  };

  const getCopy = () => currentLanguage === 'fa' ? 'کپی' : 'Copy';
  const getCopied = () => currentLanguage === 'fa' ? 'کپی شد' : 'Copied';
  const phoneNumber = '+93 78 915 8627';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore clipboard failures
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-6 lg:mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 lg:mb-6 px-4">{getContactTitle()}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            {getContactDescription()}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
            <div className={`flex items-start mb-6 gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center text-white text-2xl">
                📞
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-1">{getGetInTouch()}</h3>
                <p className="text-gray-600 mt-1">{getCallDescription()}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {currentLanguage === 'fa' ? 'پاسخ معمولی کمتر از ۱۰ دقیقه' : 'Typical reply under 10 minutes'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex-1 btn btn-primary hover:shadow-lg transform hover:-translate-y-1"
                onClick={trackPhoneCall}
              >
                <span>📞</span>
                <span>{currentLanguage === 'fa' ? 'تماس' : 'Call'}</span>
              </a>
              <a 
                href="https://wa.me/93789158627?text=Hello%20Dr.%20Wardak,%20I%20would%20like%20to%20schedule%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 transform hover:-translate-y-1"
                onClick={trackWhatsAppClick}
              >
                <span>💬</span>
                <span>{getWhatsApp()}</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-muted px-4 py-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-base">
                <span>📱</span>
                <span className="ltr-number">{phoneNumber}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-primary text-sm font-semibold hover:border-primary/60 transition"
                aria-label={currentLanguage === 'fa' ? 'کپی شماره تلفن' : 'Copy phone number'}
              >
                <span>📋</span>
                <span>{copied ? getCopied() : getCopy()}</span>
              </button>
              <p className={`text-xs text-gray-500 ${isRTL ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                {getWhatsAppDescription()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
