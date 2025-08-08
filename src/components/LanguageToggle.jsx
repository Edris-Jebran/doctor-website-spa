import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackLanguageChange } from '../utils/analytics';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  
  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'fa' : 'en';
    trackLanguageChange(newLanguage);
    toggleLanguage();
  };

  return (
    <button
      onClick={handleLanguageToggle}
      className="fixed top-6 right-3 sm:top-6 sm:right-6 z-50 bg-white/95 backdrop-blur text-primary px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary hover:bg-primary hover:text-white text-sm sm:text-base"
      style={{
        paddingTop: 'calc(0.5rem + env(safe-area-inset-top))',
      }}
      aria-label={currentLanguage === 'en' ? 'Switch to Farsi' : 'تغییر زبان به انگلیسی'}
    >
      {currentLanguage === 'en' ? 'فارسی' : 'English'}
    </button>
  );
};

export default LanguageToggle;
