import React, { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ClinicInfo from './components/ClinicInfo';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LanguageToggle from './components/LanguageToggle';
import AmbientBackground from './components/AmbientBackground';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { initializeAnalytics } from './utils/analytics';
import './App.css';

function AppContent() {
  const { content, isRTL } = useLanguage();
  
  // Initialize analytics when component mounts
  useEffect(() => {
    initializeAnalytics();
  }, []);
  
  return (
    <div className={`App ${isRTL ? 'rtl' : 'ltr'}`}>
      <AmbientBackground />
      <LanguageToggle />
      
      <Hero 
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        imageUrl={content.hero.imageUrl}
      />
      
      <About 
        bio={content.about.bio}
        credentials={content.about.credentials}
      />
      
      <Services 
        services={content.services}
      />
      
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
