import siteContent from '../data/siteContent.json';
import { pageMeta, langFromPath, pathForLang, SITE_URL } from './pageMeta';

test.each(['fa', 'en'])('%s title and description fit in search results', (lang) => {
  const m = pageMeta(lang, siteContent[lang]);
  expect(m.title.length).toBeGreaterThan(20);
  expect(m.title.length).toBeLessThanOrEqual(60);
  expect(m.description.length).toBeGreaterThan(80);
  expect(m.description.length).toBeLessThanOrEqual(155);
});

test('canonical URLs and language alternates', () => {
  expect(pageMeta('fa', siteContent.fa).canonical).toBe(`${SITE_URL}/`);
  expect(pageMeta('en', siteContent.en).canonical).toBe(`${SITE_URL}/en/`);
  expect(pageMeta('en', siteContent.en).alternates).toEqual([
    { hreflang: 'fa-AF', href: `${SITE_URL}/` },
    { hreflang: 'en', href: `${SITE_URL}/en/` },
    { hreflang: 'x-default', href: `${SITE_URL}/` },
  ]);
});

test('language comes from the path', () => {
  expect(langFromPath('/')).toBe('fa');
  expect(langFromPath('/en')).toBe('en');
  expect(langFromPath('/en/')).toBe('en');
  expect(langFromPath('/english')).toBe('fa');
  expect(pathForLang('en')).toBe('/en/');
  expect(pathForLang('fa')).toBe('/');
});

test('structured data describes the doctor, the clinic and the site', () => {
  const { jsonLd } = pageMeta('en', siteContent.en);
  const types = jsonLd['@graph'].map((n) => n['@type']);
  expect(types).toEqual(expect.arrayContaining(['Physician', 'MedicalClinic', 'WebSite']));
  const doc = jsonLd['@graph'].find((n) => n['@type'] === 'Physician');
  expect(doc.sameAs).toEqual([
    'https://www.facebook.com/jebran.mohammadehsan/',
    'https://www.instagram.com/jebranmohammad/',
  ]);
  expect(doc.availableService).toHaveLength(22);
  const clinic = jsonLd['@graph'].find((n) => n['@type'] === 'MedicalClinic');
  expect(clinic.openingHoursSpecification).toEqual([
    expect.objectContaining({ opens: '17:30', closes: '20:00', dayOfWeek: expect.arrayContaining(['Monday', 'Sunday']) }),
  ]);
  expect(doc.logo).toBe(`${SITE_URL}/logo512.png`);
});
