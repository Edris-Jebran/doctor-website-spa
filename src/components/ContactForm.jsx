import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';

const ContactForm = () => {
  const { currentLanguage } = useLanguage();
  
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

  const getCallUs = () => {
    return currentLanguage === 'fa' ? 'تماس تلفنی' : 'Call Us';
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

  return (
    <section id="contact" className="py-20 bg-white/95 backdrop-blur-sm relative z-10">
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
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-6 lg:mb-8">{getGetInTouch()}</h3>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4 sm:mr-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                      {currentLanguage === 'fa' ? 'تلفن' : 'Phone'}
                    </h4>
                    <p className="text-gray-600 text-base sm:text-lg">+93 78 915 8627</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {currentLanguage === 'fa' ? 'برای تماس فوری' : 'For immediate contact'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                      {getWhatsApp()}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      {getWhatsAppDescription()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Options */}
          <div className="space-y-6">
            {/* Phone Option */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{getCallUs()}</h4>
                  <p className="text-gray-600 mt-1">{getCallDescription()}</p>
                </div>
              </div>
              <a 
                href="tel:+93 78 915 8627"
                className="bg-gradient-to-r from-accent to-primary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-block transform hover:-translate-y-1"
                onClick={trackPhoneCall}
              >
                {currentLanguage === 'fa' ? 'تماس تلفنی' : 'Call Now'}
              </a>
            </div>
            
            {/* WhatsApp Option */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{getWhatsApp()}</h4>
                  <p className="text-gray-600 mt-1">{getWhatsAppDescription()}</p>
                </div>
              </div>
              <a 
                href="https://wa.me/93789158627?text=Hello%20Dr.%20Wardak,%20I%20would%20like%20to%20schedule%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 inline-block transform hover:-translate-y-1"
                onClick={trackWhatsAppClick}
              >
                {currentLanguage === 'fa' ? 'واتساپ' : 'WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
