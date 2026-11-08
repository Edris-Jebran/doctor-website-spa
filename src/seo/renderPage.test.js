/**
 * @jest-environment node
 */
import { renderPage } from './renderPage';

const TEMPLATE = `<!DOCTYPE html><html lang="fa-AF" dir="rtl"><head><meta charset="utf-8" />
<title>placeholder</title>
<meta name="description" content="placeholder" />
<link rel="canonical" href="https://drjebran.com/" />
<meta name="x-seo-head" content="">
</head><body><div id="root"></div><script src="/static/js/main.js"></script></body></html>`;

test('English page is fully rendered with English head', () => {
  const html = renderPage('en', TEMPLATE);
  expect(html).toContain('<html lang="en" dir="ltr">');
  expect(html).toContain('<title>Dr. Ehsan Jebran | Orthopedic &amp; General Surgeon, Kabul</title>');
  expect(html).toContain('<link rel="canonical" href="https://drjebran.com/en/" />');
  expect(html).toContain('<link rel="alternate" hreflang="fa-AF" href="https://drjebran.com/" />');
  expect(html).toContain('<link rel="alternate" hreflang="x-default" href="https://drjebran.com/" />');
  expect(html).toContain('<meta property="og:url" content="https://drjebran.com/en/" />');
  expect(html).toContain('"@type":"Physician"');
  expect(html).toMatch(/<div id="root"><header/);
  expect(html).toContain('Dr. Mohammad Ehsan Wardak');
  expect(html).toContain('Hernia repair');
  expect(html).toContain('/static/js/main.js');
});

test('Dari page is fully rendered right-to-left', () => {
  const html = renderPage('fa', TEMPLATE);
  expect(html).toContain('<html lang="fa-AF" dir="rtl">');
  expect(html).toContain('<link rel="canonical" href="https://drjebran.com/" />');
  expect(html).toContain('داکتر محمد احسان وردک');
  expect(html).toContain('عملیات فتق');
  expect(html).not.toContain('placeholder');
});

test('time-dependent opening status is not baked into the HTML', () => {
  const html = renderPage('en', TEMPLATE);
  expect(html).not.toMatch(/Open now|Opens today|Opens tomorrow/);
});

test('the head marker is replaced', () => {
  expect(renderPage('fa', TEMPLATE)).not.toContain('x-seo-head');
});
