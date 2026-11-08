import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackLanguageChange } from '../utils/analytics';
import { pathForLang } from '../seo/pageMeta';

// A real link to the other language's URL, so search engines can follow it.
const LanguageToggle = ({ className = '' }) => {
  const { lang, content, setLang } = useLanguage();
  const { ui } = content;
  const target = lang === 'fa' ? 'en' : 'fa';

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
    event.preventDefault();
    trackLanguageChange(target);
    setLang(target);
  };

  return (
    <a
      href={pathForLang(target)}
      hrefLang={target === 'fa' ? 'fa-AF' : 'en'}
      onClick={handleClick}
      aria-label={ui.switchLang}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 font-bold underline-offset-4 hover:underline ${className}`}
    >
      <span lang={ui.langButtonLang}>{ui.langButton}</span>
    </a>
  );
};

export default LanguageToggle;
