import React, { createContext, useContext, useState } from 'react';
import siteContent from '../data/siteContent.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'fa' : 'en');
  };
  
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
