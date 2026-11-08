import React from 'react';
import { render, screen } from '@testing-library/react';
import Locations from './Locations';
import { LanguageProvider } from '../context/LanguageContext.jsx';
import siteContent from '../data/siteContent.json';

test('the hospital card shows where the hospital is', () => {
  render(
    <LanguageProvider>
      <Locations />
    </LanguageProvider>
  );
  const hospital = siteContent.fa.locations.find((l) => l.type === 'hospital');
  const card = screen.getByRole('heading', { name: hospital.name }).closest('article');
  expect(card).toHaveTextContent(hospital.address);
});

test('the hospital card has directions to the hospital pin', () => {
  render(
    <LanguageProvider>
      <Locations />
    </LanguageProvider>
  );
  const hospital = siteContent.fa.locations.find((l) => l.type === 'hospital');
  const card = screen.getByRole('heading', { name: hospital.name }).closest('article');
  const link = card.querySelector('a[href^="https://www.google.com/maps/dir/"]');
  expect(link).not.toBeNull();
  expect(link.getAttribute('href')).toContain(`${hospital.coords.lat},${hospital.coords.lng}`);
});
