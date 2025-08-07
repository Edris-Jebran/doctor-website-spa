// Analytics utility for tracking user interactions
export const GA_TRACKING_ID = 'G-PREHWT9P6B'; // Google Analytics 4 Tracking ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: 'Dr. Ehsan Medical Clinic',
      page_location: window.location.href,
      send_page_view: true
    });
  }
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: 'Dr. Ehsan Medical Clinic'
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track contact form submissions
export const trackContactForm = (method) => {
  trackEvent('contact_form_submit', 'engagement', method);
};

// Track phone calls
export const trackPhoneCall = () => {
  trackEvent('phone_call', 'engagement', 'clinic_phone');
};

// Track email clicks
export const trackEmailClick = () => {
  trackEvent('email_click', 'engagement', 'clinic_email');
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'engagement', 'whatsapp_contact');
};

// Track map interactions
export const trackMapInteraction = (action) => {
  trackEvent('map_interaction', 'engagement', action);
};

// Track language changes
export const trackLanguageChange = (language) => {
  trackEvent('language_change', 'user_preference', language);
};

// Track service clicks
export const trackServiceClick = (serviceName) => {
  trackEvent('service_click', 'engagement', serviceName);
};

// Track appointment button clicks
export const trackAppointmentClick = (section) => {
  trackEvent('appointment_click', 'conversion', section);
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', 'engagement', `${depth}%`);
};

// Track time on page
export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', 'engagement', `${seconds}s`);
};

// Track user location (country/city)
export const trackUserLocation = (country, city) => {
  trackEvent('user_location', 'demographics', `${city}, ${country}`);
};

// Track device type
export const trackDeviceType = (deviceType) => {
  trackEvent('device_type', 'technology', deviceType);
};

// Track browser type
export const trackBrowserType = (browser) => {
  trackEvent('browser_type', 'technology', browser);
};

// Track screen resolution
export const trackScreenResolution = (width, height) => {
  trackEvent('screen_resolution', 'technology', `${width}x${height}`);
};

// Enhanced analytics with user properties
export const setUserProperties = (properties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

// Track conversion goals
export const trackConversion = (goalName, value) => {
  trackEvent('conversion', 'goal', goalName, value);
};

// Track error events
export const trackError = (errorType, errorMessage) => {
  trackEvent('error', 'system', `${errorType}: ${errorMessage}`);
};

// Track performance metrics
export const trackPerformance = (metric, value) => {
  trackEvent('performance', 'system', metric, value);
};

// Utility to get user's location (requires user consent)
export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        trackEvent('user_location_coords', 'demographics', `${latitude},${longitude}`);
      },
      (error) => {
        trackError('geolocation_error', error.message);
      }
    );
  }
};

// Track page load performance
export const trackPageLoadPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      trackPerformance('page_load_time', Math.round(loadTime));
    }
  }
};

// Track user engagement metrics
export const trackEngagement = (metric, value) => {
  trackEvent('engagement', 'user_behavior', metric, value);
};

// Initialize analytics when the app loads
export const initializeAnalytics = () => {
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Track device and browser information
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  
  trackDeviceType(deviceType);
  
  // Track screen resolution
  trackScreenResolution(screen.width, screen.height);
  
  // Track page load performance
  trackPageLoadPerformance();
  
  // Set up scroll tracking
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (maxScroll % 25 === 0) { // Track every 25%
        trackScrollDepth(maxScroll);
      }
    }
  });
  
  // Track time on page
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeOnPage);
  });
};
