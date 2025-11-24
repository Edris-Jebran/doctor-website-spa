import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackAppointmentClick } from '../utils/analytics';

const Hero = ({ title, subtitle, imageUrl }) => {
  const { currentLanguage } = useLanguage();
  
  const getBookAppointment = () => {
    return currentLanguage === 'fa' ? 'رزرو نوبت' : 'Book Appointment';
  };
  
  const getFindUs = () => {
    return currentLanguage === 'fa' ? 'پیدا کردن کلینیک' : 'Find Our Clinic';
  };

  const trustLabels = [
    currentLanguage === 'fa' ? '۳۵+ سال تجربه' : '35+ years experience',
    currentLanguage === 'fa' ? 'انگلیسی | فارسی' : 'English | Farsi',
    currentLanguage === 'fa' ? 'پزشک خانواده' : 'Family physician',
  ];
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-accent/10 opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-8 ${currentLanguage === 'fa' ? 'lg:text-right' : 'lg:text-left'}`}>

            <div className="space-y-4">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${currentLanguage === 'fa' ? 'lg:justify-end' : 'lg:justify-start'}`}>
              <a 
                href="#contact" 
                className="btn btn-primary bg-white text-primary hover:bg-muted shadow-lg"
                onClick={() => trackAppointmentClick('hero_section')}
              >
                <span>{getBookAppointment()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="#clinic-info" 
                className="btn btn-secondary border-white/40 text-white hover:bg-white/10"
              >
                {getFindUs()}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {trustLabels.map((label, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/85 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Doctor's Photo */}
          <div className="relative">
            <div className="absolute inset-0 -translate-x-6 -translate-y-6 blur-3xl bg-accent/20 rounded-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur aspect-[4/5] max-w-md sm:max-w-lg mx-auto">
              <img 
                src={`${process.env.PUBLIC_URL}/${imageUrl}`} 
                alt={title}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: '50% 20%'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x1000/0f172a/FFFFFF?text=Dr.+Ehsan+Wardak';
                }}
              />
              <div className="absolute bottom-4 left-4 bg-white/90 text-primary px-4 py-3 rounded-xl shadow-lg">
                <p className="text-xs uppercase tracking-wide font-semibold">{currentLanguage === 'fa' ? 'کلینیک خانوادگی' : 'Family Clinic'}</p>
                <p className="text-sm text-ink mt-1">{currentLanguage === 'fa' ? 'در کابل' : 'Based in Kabul'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
