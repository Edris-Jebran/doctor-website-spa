import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 bg-white text-primary px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-primary hover:bg-primary hover:text-white"
      style={{
        // Force consistent positioning regardless of RTL
        right: '1.5rem',
        left: 'auto'
      }}
    >
      {currentLanguage === 'en' ? 'فارسی' : 'English'}
    </button>
  );
};

export default LanguageToggle;
