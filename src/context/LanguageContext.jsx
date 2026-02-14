import React, { createContext, useContext, useEffect, useState } from 'react';
import siteContent from '../data/siteContent.json';

const LanguageContext = createContext();
const LANGUAGE_STORAGE_KEY = 'doctor_website_language';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'fa' ? 'fa' : 'en';
  });
  
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'fa' : 'en');
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  }, [currentLanguage]);
  
  const content = siteContent[currentLanguage];
  
  const value = {
    currentLanguage,
    toggleLanguage,
    content,
    isRTL: currentLanguage === 'fa'
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
