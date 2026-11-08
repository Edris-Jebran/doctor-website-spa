// Per-language <head> data. Used at build time (scripts/prerender.js) and in the
// browser when the visitor switches language.

export const SITE_URL = 'https://drjebran.com';
const PATHS = { fa: '/', en: '/en/' };
const HTML_LANG = { fa: 'fa-AF', en: 'en' };
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const langFromPath = (pathname = '/') => (/^\/en(\/|$)/.test(pathname) ? 'en' : 'fa');
export const pathForLang = (lang) => PATHS[lang] || '/';
export const htmlLang = (lang) => HTML_LANG[lang];

export function pageMeta(lang, content) {
  const canonical = `${SITE_URL}${pathForLang(lang)}`;
  const alternates = [
    { hreflang: 'fa-AF', href: `${SITE_URL}/` },
    { hreflang: 'en', href: `${SITE_URL}/en/` },
    { hreflang: 'x-default', href: `${SITE_URL}/` },
  ];
  const { contact, hours, hero, brand, procedures, locations } = content;
  const clinic = locations.find((l) => l.type === 'clinic');
  const hospital = locations.find((l) => l.type === 'hospital');
  const sameAs = Object.values(contact.socialLinks || {});
  const image = `${SITE_URL}/${hero.imageUrl}`;
  const logo = `${SITE_URL}/logo512.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${SITE_URL}/#doctor`,
        name: brand.short,
        alternateName: [
          'Dr. Mohammad Ehsan Wardak',
          'Dr. Ehsan',
          'Dr. Jebran',
          'Dr. Wardak',
          'داکتر احسان جبران',
          'داکتر محمد احسان وردک',
        ],
        url: canonical,
        image,
        logo,
        telephone: contact.phone,
        email: contact.email,
        medicalSpecialty: ['Surgical', 'Orthopedic'],
        knowsLanguage: ['fa-AF', 'ps', 'en'],
        sameAs,
        hospitalAffiliation: {
          '@type': 'Hospital',
          name: hospital ? hospital.name : 'Mawla Ali Hospital',
          address: {
            '@type': 'PostalAddress',
            ...(hospital && hospital.address ? { streetAddress: hospital.address } : {}),
            addressLocality: 'Kabul',
            addressCountry: 'AF',
          },
        },
        worksFor: { '@id': `${SITE_URL}/#clinic` },
        availableService: procedures.map((p) => ({ '@type': 'MedicalProcedure', name: p.name })),
      },
      {
        '@type': 'MedicalClinic',
        '@id': `${SITE_URL}/#clinic`,
        name: clinic.name,
        url: canonical,
        image,
        logo,
        telephone: contact.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: clinic.address,
          addressLocality: 'Kabul',
          addressCountry: 'AF',
        },
        geo: { '@type': 'GeoCoordinates', latitude: clinic.coords.lat, longitude: clinic.coords.lng },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: DAYS, opens: hours.open, closes: hours.close },
        ],
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: brand.short,
        inLanguage: ['fa-AF', 'en'],
        publisher: { '@id': `${SITE_URL}/#doctor` },
      },
    ],
  };

  return {
    lang,
    htmlLang: htmlLang(lang),
    dir: lang === 'fa' ? 'rtl' : 'ltr',
    title: content.seo.title,
    description: content.seo.description,
    ogImage: `${SITE_URL}/og-image.jpg`,
    ogImageAlt: content.seo.ogImageAlt,
    ogLocale: lang === 'fa' ? 'fa_AF' : 'en_US',
    ogLocaleAlternate: lang === 'fa' ? 'en_US' : 'fa_AF',
    canonical,
    alternates,
    jsonLd,
  };
}
