import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const Footer = ({ phone, email, socialLinks }) => {
  const { currentLanguage } = useLanguage();
  
  const getClinicName = () => {
    return currentLanguage === 'fa' ? 'کلینیک دکتر محمد احسان وردک' : 'Dr. Mohammad Ehsan Wardak Clinic';
  };
  
  const getClinicDescription = () => {
    return currentLanguage === 'fa'
      ? 'ارائه مراقبت‌های بهداشتی استثنایی با بیش از ۳۵ سال تجربه. سلامت و رفاه شما اولویت اصلی ما است.'
      : 'Providing exceptional healthcare with over 35 years of experience. Your health and well-being are our top priority.';
  };
  
  const getQuickContact = () => {
    return currentLanguage === 'fa' ? 'تماس سریع' : 'Quick Contact';
  };
  
  const getFollowUs = () => {
    return currentLanguage === 'fa' ? 'ما را دنبال کنید' : 'Follow Us';
  };
  
  const getRightsReserved = () => {
    return currentLanguage === 'fa' 
      ? `© ${new Date().getFullYear()} کلینیک دکتر محمد احسان وردک. تمامی حقوق محفوظ است.`
      : `© ${new Date().getFullYear()} Dr. Mohammad Ehsan Wardak Clinic. All rights reserved.`;
  };
  
  const getQualityHealthcare = () => {
    return currentLanguage === 'fa'
      ? 'ارائه خدمات بهداشتی با کیفیت در کابل، افغانستان'
      : 'Providing quality healthcare services in Kabul, Afghanistan';
  };
  
  return (
    <footer className="bg-primary text-white relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Clinic Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{getClinicName()}</h3>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              {getClinicDescription()}
            </p>
            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              <p>📍 {currentLanguage === 'fa' ? 'سَرَک فامیلی‌ها، چهارراهی قمبر، کابل' : 'Family Street, Chahrahi Qambar, Kabul'}</p>
              <p>🕒 {currentLanguage === 'fa' ? 'هر روز: ۵:۳۰ عصر - ۸:۰۰ شب' : 'Everyday: 5:30 PM - 8:00 PM'}</p>
            </div>
          </div>
          
          {/* Quick Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{getQuickContact()}</h3>
            <div className="space-y-3">
              <a 
                href={`tel:${phone}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>
              <a 
                href={`mailto:${email}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </a>
            </div>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{getFollowUs()}</h3>
            <div className="flex space-x-4">
              {socialLinks?.facebook && (
                <a 
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socialLinks?.instagram && (
                <a 
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            {getRightsReserved()}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {getQualityHealthcare()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
