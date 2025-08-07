import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const Hero = ({ title, subtitle, imageUrl }) => {
  const { currentLanguage } = useLanguage();
  
  const getBookAppointment = () => {
    return currentLanguage === 'fa' ? 'رزرو نوبت' : 'Book Appointment';
  };
  
  const getFindUs = () => {
    return currentLanguage === 'fa' ? 'پیدا کردن کلینیک' : 'Find Our Clinic';
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/80"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/3 rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`order-2 ${currentLanguage === 'fa' ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-95 font-light leading-relaxed">
                {subtitle}
              </p>
              <div className={`flex flex-col sm:flex-row gap-6 ${currentLanguage === 'fa' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
                <a 
                  href="#contact" 
                  className="bg-white text-primary px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  {getBookAppointment()}
                </a>
                <a 
                  href="#clinic-info" 
                  className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  {getFindUs()}
                </a>
              </div>
            </div>
          </div>
          
          {/* Doctor's Photo */}
          <div className={`order-1 ${currentLanguage === 'fa' ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}>
            <div className="relative">
              <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover object-center"
                  style={{
                    objectPosition: 'center 25%' // Better face positioning
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/005E7A/FFFFFF?text=Dr.+Ehsan+Wardak';
                  }}
                />
              </div>
              
              {/* Professional Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-primary px-6 py-3 rounded-xl shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">35+</div>
                  <div className="text-sm font-semibold">
                    {currentLanguage === 'fa' ? 'سال تجربه' : 'Years Experience'}
                  </div>
                </div>
              </div>
              
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-4 bg-white rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
