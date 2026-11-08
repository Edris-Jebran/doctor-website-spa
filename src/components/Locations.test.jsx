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
