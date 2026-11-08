// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Some suites (build-time rendering) run in the Node environment without a window.
if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  // The URL carries the language; start every test at the Dari root.
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });
}
