import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext.jsx';
import siteContent from '../data/siteContent.json';

const KEY = 'doctor_website_language';

function Probe() {
  const { lang, isRTL } = useLanguage();
  return <div data-testid="probe">{`${lang}|${isRTL}`}</div>;
}

const renderProbe = () =>
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );

beforeEach(() => {
  window.localStorage.clear();
});

test('defaults to Dari with no stored choice', () => {
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('fa|true');
  expect(document.documentElement.lang).toBe('fa-AF');
  expect(document.documentElement.dir).toBe('rtl');
});

test('respects stored English', () => {
  window.localStorage.setItem(KEY, 'en');
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('en|false');
  expect(document.documentElement.lang).toBe('en');
  expect(document.documentElement.dir).toBe('ltr');
});

test('ignores garbage stored value', () => {
  window.localStorage.setItem(KEY, 'de');
  renderProbe();
  expect(screen.getByTestId('probe')).toHaveTextContent('fa|true');
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
