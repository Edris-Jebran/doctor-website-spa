import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => window.localStorage.clear());

test('renders in Dari by default', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 2, name: 'جراحی‌هایی که داکتر انجام می‌دهد' })).toBeInTheDocument();
  expect(document.documentElement.dir).toBe('rtl');
});

test('switches the whole page to English', () => {
  render(<App />);
  userEvent.click(screen.getAllByRole('button', { name: 'Switch to English' })[0]);
  expect(screen.getByRole('heading', { level: 2, name: 'Operations he performs' })).toBeInTheDocument();
  expect(document.documentElement.dir).toBe('ltr');
});

test.each(['fa', 'en'])('page makes no unsupported claims (%s)', (lang) => {
  window.localStorage.setItem('doctor_website_language', lang);
  const { container } = render(<App />);
  expect(container).not.toHaveTextContent(/24\/7|۲۴\/۷|Emergency Care Available|under 10 minutes|Family physician|پزشک خانواده/i);
});
