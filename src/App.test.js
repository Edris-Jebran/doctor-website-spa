import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.removeItem('doctor_site_language');
});

test('renders key english sections by default', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /dr\. wardak clinic/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /our medical services/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
});
