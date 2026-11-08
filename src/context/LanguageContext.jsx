import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import siteContent from '../data/siteContent.json';

const LanguageContext = createContext(null);
const LANGUAGE_STORAGE_KEY = 'doctor_website_language';
const LANGUAGES = ['fa', 'en'];
const DEFAULT_LANGUAGE = 'fa';
const HTML_LANG = { fa: 'fa-AF', en: 'en' };

const readStoredLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
  } catch (e) {
    return DEFAULT_LANGUAGE;
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readStoredLanguage);
  const isRTL = lang === 'fa';

  const setLang = (next) => {
    if (LANGUAGES.includes(next)) setLangState(next);
  };
  const toggleLanguage = () => setLangState((prev) => (prev === 'fa' ? 'en' : 'fa'));

  useLayoutEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      // storage unavailable (private mode); language still works for this visit
    }
  }, [lang]);

  const value = {
    lang,
    currentLanguage: lang,
    isRTL,
    content: siteContent[lang],
    setLang,
    toggleLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
