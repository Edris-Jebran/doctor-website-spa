import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import siteContent from '../data/siteContent.json';
import { langFromPath, pathForLang, pageMeta } from '../seo/pageMeta';

const LanguageContext = createContext(null);
const LANGUAGE_STORAGE_KEY = 'doctor_website_language';
const LANGUAGES = ['fa', 'en'];
const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

const readStored = () => {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : null;
  } catch (e) {
    return null;
  }
};

const writeStored = (lang) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (e) {
    // storage unavailable (private mode); the URL still carries the language
  }
};

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * The URL decides the language: "/" is Dari, "/en/" is English.
 * `initialLang` is passed only when rendering at build time.
 */
export const LanguageProvider = ({ children, initialLang }) => {
  const [lang, setLangState] = useState(
    () => initialLang || (isBrowser ? langFromPath(window.location.pathname) : 'fa')
  );
  const isRTL = lang === 'fa';

  const setLang = useCallback((next, { replace = false } = {}) => {
    if (!LANGUAGES.includes(next)) return;
    const path = pathForLang(next);
    if (window.location.pathname !== path) {
      const url = `${path}${window.location.search}${window.location.hash}`;
      window.history[replace ? 'replaceState' : 'pushState']({}, '', url);
    }
    writeStored(next);
    setLangState(next);
  }, []);

  const toggleLanguage = useCallback(() => setLang(lang === 'fa' ? 'en' : 'fa'), [lang, setLang]);

  // A returning visitor who last used English lands on "/" -> show English.
  useEffect(() => {
    if (initialLang) return;
    if (window.location.pathname === '/' && readStored() === 'en') setLang('en', { replace: true });
    else writeStored(langFromPath(window.location.pathname));
  }, [initialLang, setLang]);

  useEffect(() => {
    const onPop = () => setLangState(langFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const meta = pageMeta(lang, siteContent[lang]);
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', meta.canonical);
  }, [lang]);

  const value = { lang, isRTL, content: siteContent[lang], setLang, toggleLanguage };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
