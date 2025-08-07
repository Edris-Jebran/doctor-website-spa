import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const About = ({ bio, credentials }) => {
  const { currentLanguage } = useLanguage();
  
  const getAboutTitle = () => {
    return currentLanguage === 'fa' 
      ? 'درباره دکتر محمد احسان وردک'
      : 'About Dr. Mohammad Ehsan Wardak';
  };
  
  const getAboutDescription = () => {
    return currentLanguage === 'fa'
      ? 'با بیش از ۳۵ سال تجربه، دکتر محمد احسان وردک متعهد به ارائه مراقبت‌های بهداشتی استثنایی با تمرکز بر مراقبت‌های متمرکز بر بیمار و تعالی پزشکی است.'
      : 'With over 35 years of experience, Dr. Mohammad Ehsan Wardak is committed to providing exceptional healthcare with a focus on patient-centered care and medical excellence.';
  };
  
  const getProfessionalBackground = () => {
    return currentLanguage === 'fa' ? 'سابقه حرفه‌ای' : 'Professional Background';
  };
  
  const getCredentialsTraining = () => {
    return currentLanguage === 'fa' ? 'مدارک و آموزش' : 'Credentials & Training';
  };
  
  const getWhyChooseTitle = () => {
    return currentLanguage === 'fa' ? 'چرا دکتر محمد احسان وردک را انتخاب کنید؟' : 'Why Choose Dr. Mohammad Ehsan Wardak?';
  };
  
  const getMedicalPhilosophy = () => {
    return currentLanguage === 'fa' ? 'فلسفه پزشکی' : 'Medical Philosophy';
  };
  
  const getPhilosophyQuote = () => {
    return currentLanguage === 'fa'
      ? 'هر بیمار شایسته مراقبت شخصی و دلسوزانه است. رویکرد من تخصص پزشکی را با نگرانی واقعی برای رفاه هر فرد ترکیب می‌کند.'
      : 'Every patient deserves personalized, compassionate care. My approach combines medical expertise with genuine concern for each individual\'s well-being.';
  };
  
  const getExperienceText = () => {
    return currentLanguage === 'fa' ? '۳۵+ سال تجربه پزشکی' : '35+ Years of Medical Experience';
  };
  
  const getInternationalTraining = () => {
    return currentLanguage === 'fa' ? 'آموزش و تخصص بین‌المللی' : 'International Training & Expertise';
  };
  
  const getPatientCentered = () => {
    return currentLanguage === 'fa' ? 'رویکرد مراقبت متمرکز بر بیمار' : 'Patient-Centered Care Approach';
  };
  
  const getComprehensiveServices = () => {
    return currentLanguage === 'fa' ? 'خدمات پزشکی جامع' : 'Comprehensive Medical Services';
  };
  
  return (
    <section id="about" className="py-20 bg-white/95 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-6 lg:mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 lg:mb-6 px-4">{getAboutTitle()}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            {getAboutDescription()}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {getProfessionalBackground()}
              </h3>
              <div className="space-y-6">
                <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                  {bio}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 flex items-center">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                {getCredentialsTraining()}
              </h3>
              <div className="space-y-4">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <p className="text-gray-800 leading-relaxed text-base md:text-lg">{credential}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">{getWhyChooseTitle()}</h3>
              <div className="grid gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-primary">{getExperienceText()}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentLanguage === 'fa' 
                      ? 'بیش از سه دهه تجربه در ارائه مراقبت‌های پزشکی با کیفیت بالا به بیماران در تمام سنین.'
                      : 'Over three decades of experience providing high-quality medical care to patients of all ages.'
                    }
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-primary">{getInternationalTraining()}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentLanguage === 'fa'
                      ? 'آموزش و تخصص بین‌المللی با ترکیبی از شیوه‌های پزشکی مدرن و سنتی.'
                      : 'International training and expertise combining modern and traditional medical practices.'
                    }
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-primary">{getPatientCentered()}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentLanguage === 'fa'
                      ? 'رویکرد مراقبت شخصی که هر بیمار را به عنوان یک فرد منحصر به فرد درمان می‌کند.'
                      : 'Personalized care approach treating each patient as a unique individual.'
                    }
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-primary">{getComprehensiveServices()}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentLanguage === 'fa'
                      ? 'طیف گسترده‌ای از خدمات پزشکی از معاینات عمومی تا مراقبت‌های تخصصی.'
                      : 'Wide range of medical services from general check-ups to specialized care.'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {/* Medical Philosophy Quote */}
            <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white text-center shadow-xl">
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{getMedicalPhilosophy()}</h3>
              <p className="text-lg leading-relaxed opacity-95">
                {getPhilosophyQuote()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
