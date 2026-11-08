import React from 'react';
import { render, screen, within } from '@testing-library/react';
import About from './About';
import Consultations from './Consultations';
import { LanguageProvider } from '../context/LanguageContext.jsx';

beforeEach(() => window.localStorage.setItem('doctor_website_language', 'en'));

const wrap = (ui) => render(<LanguageProvider>{ui}</LanguageProvider>);

test('About shows three highlights and the surgeon credentials', () => {
  wrap(<About />);
  const section = screen.getByRole('region', { name: 'About Dr. Wardak' });
  expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(4); // credentials + 3 highlights
  expect(section).toHaveTextContent('Practising surgery since the late 1980s');
  expect(section).not.toHaveTextContent(/General Medicine|Philosophy/);
});

test('Clinic visits lists three visit types and no emergency promise', () => {
  wrap(<Consultations />);
  const section = screen.getByRole('region', { name: 'Clinic visits' });
  expect(within(section).getAllByRole('listitem')).toHaveLength(3);
  expect(section).not.toHaveTextContent(/24\/7|Emergency Care Available/i);
});
