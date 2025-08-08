import React from 'react';

const SkipLink = () => {
  const handleSkip = (e) => {
    e.preventDefault();
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#main';
    }
  };

  return (
    <a href="#main" className="skip-link" onClick={handleSkip}>Skip to content</a>
  );
};

export default SkipLink;
