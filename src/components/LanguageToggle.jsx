import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackLanguageChange } from '../utils/analytics';

const LanguageToggle = ({ className = '' }) => {
  const { lang, content, toggleLanguage } = useLanguage();
  const { ui } = content;

  const handleClick = () => {
    trackLanguageChange(lang === 'fa' ? 'en' : 'fa');
    toggleLanguage();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ui.switchLang}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 font-medium underline-offset-4 hover:underline ${className}`}
    >
      <span lang={ui.langButtonLang}>{ui.langButton}</span>
    </button>
  );
};

export default LanguageToggle;
