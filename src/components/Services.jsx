import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackAppointmentClick, trackPhoneCall } from '../utils/analytics';

const Services = ({ services }) => {
  const { currentLanguage } = useLanguage();
  
  const getServicesTitle = () => {
    return currentLanguage === 'fa' ? 'خدمات پزشکی ما' : 'Our Medical Services';
  };
  
  const getServicesDescription = () => {
    return currentLanguage === 'fa'
      ? 'خدمات بهداشتی جامع که برای رفع نیازهای پزشکی شما با بالاترین استانداردهای مراقبت طراحی شده است.'
      : 'Comprehensive healthcare services tailored to meet your medical needs with the highest standards of care.';
  };
  
  const getEmergencyTitle = () => {
    return currentLanguage === 'fa' ? 'مراقبت اورژانس ۲۴/۷ در دسترس است' : 'Emergency Care Available 24/7';
  };
  
  const getEmergencyDescription = () => {
    return currentLanguage === 'fa'
      ? 'ما خدمات پزشکی اورژانس شبانه‌روزی ارائه می‌دهیم. سلامت و ایمنی شما اولویت اصلی ما است و ما در زمانی که بیشترین نیاز را دارید در کنار شما هستیم.'
      : 'We provide round-the-clock emergency medical services. Your health and safety are our top priority, and we\'re here when you need us most.';
  };
  
  const getContactEmergency = () => {
    return currentLanguage === 'fa' ? 'تماس برای اورژانس' : 'Contact for Emergency';
  };
  
  const getCallNow = () => {
    return currentLanguage === 'fa' ? 'الان تماس بگیرید' : 'Call Now';
  };
  
  return (
    <section id="services" className="py-20 bg-white/95 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-6 lg:mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 lg:mb-6 px-4">{getServicesTitle()}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            {getServicesDescription()}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 lg:mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-6 sm:p-8 lg:p-10 text-white text-center relative overflow-hidden shadow-xl">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-3 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-3 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 lg:mb-6 px-4">{getEmergencyTitle()}</h3>
            <p className="text-base sm:text-lg md:text-xl mb-6 lg:mb-8 opacity-95 max-w-3xl mx-auto px-4">
              {getEmergencyDescription()}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="#contact" 
                className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base"
                onClick={() => trackAppointmentClick('emergency_section')}
              >
                {getContactEmergency()}
              </a>
              <a 
                href="tel:+93 78 915 8627" 
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base"
                onClick={trackPhoneCall}
              >
                {getCallNow()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
