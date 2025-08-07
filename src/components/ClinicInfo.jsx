import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import FallbackMap from './FallbackMap';

const ClinicInfo = ({ address, hours, coords }) => {
  const { currentLanguage } = useLanguage();
  
  const getFindClinicTitle = () => {
    return currentLanguage === 'fa' ? 'کلینیک ما را پیدا کنید' : 'Find Our Clinic';
  };
  
  const getFindClinicDescription = () => {
    return currentLanguage === 'fa'
      ? 'به راحتی در کابل واقع شده، کلینیک ما به راحتی قابل دسترسی است و محیطی استقبال‌کننده برای همه بیماران فراهم می‌کند.'
      : 'Conveniently located in Kabul, our clinic is easily accessible and provides a welcoming environment for all patients.';
  };
  
  const getInteractiveMap = () => {
    return currentLanguage === 'fa' ? 'نقشه تعاملی' : 'Interactive Map';
  };
  
  const getMapDescription = () => {
    return currentLanguage === 'fa' ? 'مسیرها را دریافت کنید و منطقه را کاوش کنید' : 'Get directions and explore the area';
  };
  
  const getStreetView = () => {
    return currentLanguage === 'fa' ? 'نمای خیابان' : 'Street View';
  };
  
  const getClinicAddress = () => {
    return currentLanguage === 'fa' ? 'آدرس کلینیک' : 'Clinic Address';
  };
  
  const getClinicHours = () => {
    return currentLanguage === 'fa' ? 'ساعات کاری کلینیک' : 'Clinic Hours';
  };
  
  const getNeedDirections = () => {
    return currentLanguage === 'fa' ? 'نیاز به مسیر دارید؟' : 'Need Directions?';
  };
  
  const getDirectionsDescription = () => {
    return currentLanguage === 'fa' ? 'با یک کلیک مسیر کلینیک ما را دریافت کنید' : 'Get directions to our clinic with just one click';
  };
  
  const getFindUsOnMaps = () => {
    return currentLanguage === 'fa' ? 'ما را در نقشه گوگل پیدا کنید' : 'Find Us on Google Maps';
  };
  
  return (
    <section id="clinic-info" className="py-20 bg-white/95 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-6 lg:mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 lg:mb-6 px-4">{getFindClinicTitle()}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            {getFindClinicDescription()}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map and Street View Section */}
          <div className="space-y-6">
            {/* Interactive Map */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-primary">{getInteractiveMap()}</h3>
                <p className="text-sm text-gray-700">{getMapDescription()}</p>
              </div>
              <FallbackMap coords={coords} address={address} />
            </div>
            
            {/* Street View */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-primary">{getStreetView()}</h3>
                <p className="text-sm text-gray-700">{address}</p>
              </div>
              <div className="relative h-48 sm:h-64">
                <iframe
                  title="Street View"
                  src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=18&output=embed&t=k`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  📍 {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Clinic Details */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{getClinicAddress()}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">{address}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    {currentLanguage === 'fa' ? 'مختصات' : 'Coordinates'}: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hours */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{getClinicHours()}</h3>
                  <div className="space-y-2">
                    {hours.map((hour, index) => (
                      <p key={index} className="text-gray-700 text-base md:text-lg">{hour}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Find Us Button */}
            <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white text-center">
              <h3 className="text-xl font-bold mb-4">{getNeedDirections()}</h3>
              <p className="mb-6 opacity-90 text-base md:text-lg">
                {getDirectionsDescription()}
              </p>
              <a 
                href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-block shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                {getFindUsOnMaps()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicInfo;
