import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import Icon from './Icon';

const ScrollToTopButton = () => {
  const { content } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={content.ui.scrollTop}
      className="hidden md:inline-flex fixed bottom-6 end-6 z-30 h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary"
    >
      <Icon name="arrow-up" />
    </button>
  );
};

export default ScrollToTopButton;
