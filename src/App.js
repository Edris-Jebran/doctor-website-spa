import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Procedures from './components/Procedures';
import Consultations from './components/Consultations';
import About from './components/About';
import Locations from './components/Locations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ScrollToTopButton from './components/ScrollToTopButton';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { initializeAnalytics } from './utils/analytics';

function AppContent() {
  useEffect(() => initializeAnalytics(), []);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Procedures />
        <Consultations />
        <About />
        <Locations />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
      <StickyCTA />
    </>
  );
}

function App({ initialLang }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
