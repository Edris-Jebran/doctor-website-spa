import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-white text-primary border border-primary rounded-full w-12 h-12 shadow-lg active:scale-[0.98] transition sm:w-12 sm:h-12"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
