import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import { LanguageProvider } from '../context/LanguageContext.jsx';

beforeEach(() => {
  window.localStorage.clear();
  jest.useFakeTimers();
});
afterEach(() => jest.useRealTimers());

const renderHero = () =>
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );

test('main heading is the full Dari name', () => {
  jest.setSystemTime(Date.UTC(2026, 10, 7, 13, 10));
  renderHero();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('داکتر محمد احسان وردک');
});

test('shows open status in Kabul time', () => {
  jest.setSystemTime(Date.UTC(2026, 10, 7, 13, 10)); // 17:40 Kabul
  renderHero();
  expect(screen.getByText(/اکنون باز است تا ۸:۰۰ شب/)).toBeInTheDocument();
});

test('shows when the clinic opens later today', () => {
  jest.setSystemTime(Date.UTC(2026, 10, 7, 6, 0)); // 10:30 Kabul
  renderHero();
  expect(screen.getByText(/امروز ساعت ۵:۳۰ عصر باز می‌شود/)).toBeInTheDocument();
});

test('WhatsApp is the primary action', () => {
  jest.setSystemTime(Date.UTC(2026, 10, 7, 13, 10));
  renderHero();
  const wa = screen.getByRole('link', { name: /پیام در واتساپ/ });
  expect(wa.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/93789158627/);
});
