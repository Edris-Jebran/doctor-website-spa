export const GA_TRACKING_ID = 'G-PREHWT9P6B';

let initialized = false;
let cleanupHandlers = [];

function getGtag() {
  if (typeof window === 'undefined') {
    return null;
  }
  return typeof window.gtag === 'function' ? window.gtag : null;
}

function callGtag(command, eventName, payload) {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }
  gtag(command, eventName, payload);
}

export function trackPageView(url) {
  const pageTitle =
    typeof document !== 'undefined' && typeof document.title === 'string'
      ? document.title
      : 'Dr. Ehsan Medical Clinic';
  callGtag('event', 'page_view', {
    page_path: url,
    page_title: pageTitle
  });
}

export function trackEvent(action, category, label, value) {
  const payload = {
    event_category: category,
    event_label: label
  };
  if (typeof value === 'number') {
    payload.value = value;
  }
  callGtag('event', action, payload);
}

export const trackContactForm = (method) => trackEvent('contact_form_submit', 'engagement', method);
export const trackPhoneCall = () => trackEvent('phone_call', 'engagement', 'clinic_phone');
export const trackEmailClick = () => trackEvent('email_click', 'engagement', 'clinic_email');
export const trackWhatsAppClick = () => trackEvent('whatsapp_click', 'engagement', 'whatsapp_contact');
export const trackMapInteraction = (action) => trackEvent('map_interaction', 'engagement', action);
export const trackLanguageChange = (language) => trackEvent('language_change', 'user_preference', language);
export const trackServiceClick = (serviceName) => trackEvent('service_click', 'engagement', serviceName);
export const trackAppointmentClick = (section) => trackEvent('appointment_click', 'conversion', section);
export const trackScrollDepth = (depth) => trackEvent('scroll_depth', 'engagement', `${depth}%`);
export const trackTimeOnPage = (seconds) => trackEvent('time_on_page', 'engagement', `${seconds}s`);
export const trackUserLocation = (country, city) => trackEvent('user_location', 'demographics', `${city}, ${country}`);
export const trackDeviceType = (deviceType) => trackEvent('device_type', 'technology', deviceType);
export const trackBrowserType = (browser) => trackEvent('browser_type', 'technology', browser);
export const trackScreenResolution = (width, height) =>
  trackEvent('screen_resolution', 'technology', `${width}x${height}`);

export function setUserProperties(properties) {
  callGtag('set', 'user_properties', properties);
}

export const trackConversion = (goalName, value) => trackEvent('conversion', 'goal', goalName, value);
export const trackError = (errorType, errorMessage) => trackEvent('error', 'system', `${errorType}: ${errorMessage}`);
export const trackPerformance = (metric, value) => trackEvent('performance', 'system', metric, value);
export const trackEngagement = (metric, value) => trackEvent('engagement', 'user_behavior', metric, value);

export function getUserLocation() {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return;
  }
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

export function trackPageLoadPerformance() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }
  if (typeof performance.getEntriesByType !== 'function') {
    return;
  }
  const navigation = performance.getEntriesByType('navigation')[0];
  if (!navigation) {
    return;
  }
  const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
  if (Number.isFinite(loadTime)) {
    trackPerformance('page_load_time', Math.round(loadTime));
  }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined') {
    return () => {};
  }
  if (initialized) {
    return () => {};
  }
  initialized = true;

  trackPageView(window.location.pathname);

  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  trackDeviceType(isMobile ? 'mobile' : 'desktop');
  trackBrowserType(userAgent);
  trackScreenResolution(window.screen.width, window.screen.height);
  trackPageLoadPerformance();

  let maxScrollBucket = -1;
  let pendingScrollFrame = null;
  const onScroll = () => {
    if (pendingScrollFrame !== null) {
      return;
    }
    pendingScrollFrame = window.requestAnimationFrame(() => {
      pendingScrollFrame = null;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        return;
      }
      const scrollPercent = Math.round((window.scrollY / total) * 100);
      const bucket = Math.floor(scrollPercent / 25) * 25;
      if (bucket > maxScrollBucket && bucket > 0) {
        maxScrollBucket = bucket;
        trackScrollDepth(Math.min(bucket, 100));
      }
    });
  };

  let pageStart = Date.now();
  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      const elapsed = Math.max(0, Math.round((Date.now() - pageStart) / 1000));
      trackTimeOnPage(elapsed);
      return;
    }
    pageStart = Date.now();
  };

  const onBeforeUnload = () => {
    const elapsed = Math.max(0, Math.round((Date.now() - pageStart) / 1000));
    trackTimeOnPage(elapsed);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('beforeunload', onBeforeUnload);

  cleanupHandlers = [
    () => window.removeEventListener('scroll', onScroll),
    () => document.removeEventListener('visibilitychange', onVisibilityChange),
    () => window.removeEventListener('beforeunload', onBeforeUnload),
    () => {
      if (pendingScrollFrame !== null) {
        window.cancelAnimationFrame(pendingScrollFrame);
      }
    }
  ];

  return () => {
    cleanupHandlers.forEach((cleanup) => cleanup());
    cleanupHandlers = [];
    initialized = false;
  };
}
