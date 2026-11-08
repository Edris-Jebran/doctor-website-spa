import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { LanguageProvider } from '../context/LanguageContext.jsx';

beforeEach(() => window.localStorage.clear());

const renderHeader = () =>
  render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );

test('shows the Dari brand by default', () => {
  renderHeader();
  expect(screen.getByRole('link', { name: 'داکتر احسان جبران' })).toBeInTheDocument();
});

test('language button switches to English', () => {
  renderHeader();
  const toggles = screen.getAllByRole('link', { name: 'Switch to English' });
  expect(toggles[0]).toHaveAttribute('href', '/en/');
  expect(toggles[0]).toHaveAttribute('hreflang', 'en');
  userEvent.click(toggles[0]);
  expect(screen.getByRole('link', { name: 'Dr. Ehsan Jebran' })).toBeInTheDocument();
});

test('call link dials the number without spaces', () => {
  renderHeader();
  const calls = screen.getAllByRole('link', { name: /تماس/ }).filter((a) => a.getAttribute('href')?.startsWith('tel:'));
  expect(calls[0]).toHaveAttribute('href', 'tel:+93789158627');
});

test('brand link shows the logo mark without changing its name', () => {
  const { container } = renderHeader();
  const brand = screen.getByRole('link', { name: 'داکتر احسان جبران' });
  expect(brand.querySelector('svg[data-logo="mark"]')).not.toBeNull();
  expect(container).toBeTruthy();
});
