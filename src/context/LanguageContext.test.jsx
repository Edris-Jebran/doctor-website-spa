import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext.jsx';
import siteContent from '../data/siteContent.json';

const KEY = 'doctor_website_language';

function Probe() {
  const { lang, isRTL, toggleLanguage } = useLanguage();
  return (
    <button type="button" data-testid="probe" onClick={toggleLanguage}>
      {`${lang}|${isRTL}`}
    </button>
  );
}

const renderProbe = (props) =>
  render(
    <LanguageProvider {...props}>
      <Probe />
    </LanguageProvider>
  );

const goTo = (path) => window.history.replaceState({}, '', path);

beforeEach(() => {
  window.localStorage.clear();
  goTo('/');
});

test('defaults to Dari at the root URL', () => {
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('fa|true');
  expect(document.documentElement.lang).toBe('fa-AF');
  expect(document.documentElement.dir).toBe('rtl');
});

test('serves English at /en/ with nothing stored', () => {
  goTo('/en/');
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('en|false');
  expect(document.documentElement.lang).toBe('en');
  expect(document.documentElement.dir).toBe('ltr');
});

test('a returning English visitor at the root is moved to /en/', () => {
  window.localStorage.setItem(KEY, 'en');
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('en|false');
  expect(window.location.pathname).toBe('/en/');
});

test('ignores garbage stored value', () => {
  window.localStorage.setItem(KEY, 'de');
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('fa|true');
  expect(window.location.pathname).toBe('/');
});

test('switching language changes the URL, title and stored choice', () => {
  renderProbe();
  act(() => screen.getByTestId('probe').click());
  expect(window.location.pathname).toBe('/en/');
  expect(document.title).toBe(siteContent.en.seo.title);
  expect(window.localStorage.getItem(KEY)).toBe('en');
});

test('browser back returns to the previous language', () => {
  renderProbe();
  act(() => screen.getByTestId('probe').click());
  act(() => {
    goTo('/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(screen.getByTestId('probe')).toHaveTextContent('fa|true');
});

test('initialLang prop wins (used for build-time rendering)', () => {
  renderProbe({ initialLang: 'en' });
  expect(screen.getByTestId('probe')).toHaveTextContent('en|false');
});

test('content has 22 procedures in both languages with identical ids and regions', () => {
  const shape = (lang) => siteContent[lang].procedures.map((p) => [p.id, p.specialty, p.regions.join(',')]);
  expect(siteContent.en.procedures).toHaveLength(22);
  expect(siteContent.fa.procedures).toHaveLength(22);
  expect(shape('fa')).toEqual(shape('en'));
  const regionIds = siteContent.en.regions.map((r) => r.id);
  siteContent.en.procedures.forEach((p) => p.regions.forEach((r) => expect(regionIds).toContain(r)));
});

test('no forbidden copy', () => {
  expect(JSON.stringify(siteContent)).not.toMatch(
    /24\/7|۲۴\/۷|under 10 minutes|Specialized in General Medicine/i
  );
});
