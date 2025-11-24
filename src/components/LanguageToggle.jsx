import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackLanguageChange } from '../utils/analytics';

const LanguageToggle = ({ size = 'default' }) => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  
  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'fa' : 'en';
    trackLanguageChange(newLanguage);
    toggleLanguage();
  };

  const sizing = size === 'compact'
    ? 'px-3 py-2 text-sm'
    : 'px-4 py-2 text-base';

  return (
    <button
      onClick={handleLanguageToggle}
      className={`inline-flex items-center justify-center bg-white/95 backdrop-blur text-primary rounded-xl font-semibold shadow hover:shadow-md transition-all duration-200 border-2 border-primary hover:bg-primary hover:text-white ${sizing}`}
      aria-label={currentLanguage === 'en' ? 'Switch to Farsi' : 'تغییر زبان به انگلیسی'}
    >
      {currentLanguage === 'en' ? 'فارسی' : 'English'}
    </button>
  );
};

export default LanguageToggle;
