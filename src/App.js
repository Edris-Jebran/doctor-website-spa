import React, { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ClinicInfo from './components/ClinicInfo';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import MedicalBackground from './components/MedicalBackground';
import StickyCTA from './components/StickyCTA';
import ScrollToTopButton from './components/ScrollToTopButton';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { initializeAnalytics } from './utils/analytics';
import './App.css';
import Header from './components/Header';

function AppContent() {
  const { content, isRTL } = useLanguage();
  
  // Initialize analytics when component mounts
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Keep document direction in sync with current language for proper RTL support
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
      document.documentElement.lang = isRTL ? 'fa' : 'en';
    }
  }, [isRTL]);
  
  return (
    <div className={`App ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background layer */}
      <MedicalBackground />

      <Header />
      <main id="main" className="safe-bottom pt-20 sm:pt-24">
        <Hero 
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          imageUrl={content.hero.imageUrl}
        />
        <About 
          bio={content.about.bio}
          credentials={content.about.credentials}
        />
        <Services services={content.services} />
        <ClinicInfo 
          address={content.clinicInfo.address}
          hours={content.clinicInfo.hours}
          coords={content.clinicInfo.coords}
        />
        <ContactForm />
        <Footer 
          phone={content.contact.phone}
          email={content.contact.email}
          socialLinks={content.contact.socialLinks}
        />
      </main>
      <ScrollToTopButton />
      <StickyCTA />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
