import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import Footer from './Footer';
import Locations from './Locations';
import { LanguageProvider } from '../context/LanguageContext.jsx';

const wrap = (ui) => render(<LanguageProvider>{ui}</LanguageProvider>);
const originalClipboard = navigator.clipboard;

beforeEach(() => window.localStorage.setItem('doctor_website_language', 'en'));
afterEach(() => {
  Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
});

test('copy without a clipboard API says it failed, never "Copied"', async () => {
  Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
  wrap(<Contact />);
  userEvent.click(screen.getByRole('button', { name: /Copy number/ }));
  await waitFor(() => expect(screen.getByText(/Couldn't copy/)).toBeInTheDocument());
  expect(screen.queryByText('Copied')).not.toBeInTheDocument();
});

test('copy with a working clipboard says "Copied"', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  wrap(<Contact />);
  userEvent.click(screen.getByRole('button', { name: /Copy number/ }));
  await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
  expect(writeText).toHaveBeenCalledWith('+93 78 915 8627');
});

test('contact shows the emergency guidance', () => {
  wrap(<Contact />);
  expect(screen.getByText(/nearest hospital emergency department/)).toBeInTheDocument();
});

test('footer social links have names', () => {
  wrap(<Footer />);
  expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();
});

test('locations show clinic and Mawla Ali Hospital, each with its own directions button', () => {
  const { container } = wrap(<Locations />);
  expect(screen.getByRole('heading', { name: 'Mawla Ali Hospital' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Get directions/ })).toHaveLength(2);
  expect(container).not.toHaveTextContent(/Need Directions|Find Us on Google Maps/);
});

test('footer credits JT Web Services with a link to jebrantech.com', () => {
  wrap(<Footer />);
  const credit = screen.getByRole('link', { name: /JT Web Services/ });
  expect(credit).toHaveAttribute('href', 'https://jebrantech.com');
  expect(credit).toHaveAttribute('rel', expect.stringContaining('noopener'));
  expect(screen.getByText(/Built and maintained by/)).toBeInTheDocument();
});

test('on phones the map waits for a tap (saves mobile data)', () => {
  // setupTests' matchMedia reports no match, i.e. a phone-sized screen
  const { container } = wrap(<Locations />);
  expect(container.querySelector('iframe')).toBeNull();
  const buttons = screen.getAllByRole('button', { name: 'Show map' });
  expect(buttons).toHaveLength(2);
  userEvent.click(buttons[0]);
  expect(container.querySelectorAll('iframe')).toHaveLength(1);
});
