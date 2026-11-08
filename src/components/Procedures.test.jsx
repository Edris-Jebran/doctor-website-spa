import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Procedures from './Procedures';
import { LanguageProvider } from '../context/LanguageContext.jsx';

beforeEach(() => {
  window.localStorage.setItem('doctor_website_language', 'en');
});

const renderEn = () =>
  render(
    <LanguageProvider>
      <Procedures />
    </LanguageProvider>
  );

const section = () => screen.getByRole('region', { name: 'Operations he performs' });
const items = () => within(section()).queryAllByRole('listitem');
const names = () => items().map((li) => li.textContent);
const chips = () => screen.getByRole('group', { name: 'Where does it hurt?' });

test('shows all 22 operations at first', () => {
  renderEn();
  expect(items()).toHaveLength(22);
});

test('Groin filter shows groin operations only', () => {
  renderEn();
  const groin = within(chips()).getByRole('button', { name: 'Groin' });
  userEvent.click(groin);
  const items = names().join('|');
  expect(items).toMatch('Hernia repair');
  expect(items).toMatch('Hydrocele and varicocele repair');
  expect(items).not.toMatch('Clubfoot correction');
  expect(groin).toHaveAttribute('aria-pressed', 'true');
});

test('choosing the active region again shows everything', () => {
  renderEn();
  const groin = within(chips()).getByRole('button', { name: 'Groin' });
  userEvent.click(groin);
  userEvent.click(groin);
  expect(items()).toHaveLength(22);
  expect(within(chips()).getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
});

test('Neck shows exactly the thyroid operation', () => {
  renderEn();
  userEvent.click(within(chips()).getByRole('button', { name: 'Neck' }));
  expect(names()).toHaveLength(1);
  expect(names()[0]).toMatch('Thyroid surgery for goiter');
});

test('body map region filters the same list', () => {
  renderEn();
  const map = screen.getByRole('group', { name: 'Body map' });
  userEvent.click(within(map).getByRole('button', { name: 'Feet' }));
  expect(names().join('|')).toMatch('Clubfoot correction');
  expect(names().join('|')).not.toMatch('Appendectomy');
});

test('X-ray call to action opens WhatsApp', () => {
  renderEn();
  const cta = screen.getByRole('link', { name: /Send a photo of your X-ray or report/ });
  expect(cta.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);
});

test('operations are grouped under Orthopedic and General surgery', () => {
  renderEn();
  const ortho = screen.getByRole('list', { name: 'Orthopedic' });
  const general = screen.getByRole('list', { name: 'General surgery' });
  expect(within(ortho).getAllByRole('listitem')).toHaveLength(10);
  expect(within(general).getAllByRole('listitem')).toHaveLength(12);
});

test('a group with no matching operations is hidden', () => {
  renderEn();
  userEvent.click(within(chips()).getByRole('button', { name: 'Neck' }));
  expect(screen.queryByRole('list', { name: 'Orthopedic' })).not.toBeInTheDocument();
  expect(screen.getByRole('list', { name: 'General surgery' })).toBeInTheDocument();
});
