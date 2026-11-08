// Build-time only (scripts/prerender.js and tests). Not imported by the browser bundle.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import siteContent from '../data/siteContent.json';
import { pageMeta } from './pageMeta';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headTags(m) {
  const tags = [
    ...m.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Dr. Ehsan Jebran" />`,
    `<meta property="og:url" content="${m.canonical}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${m.ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(m.ogImageAlt)}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${m.ogLocaleAlternate}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.join('\n    ');
}

export function renderPage(lang, template) {
  const m = pageMeta(lang, siteContent[lang]);
  const body = renderToString(<App initialLang={lang} />);
  return template
    .replace(/<html[^>]*>/, `<html lang="${m.htmlLang}" dir="${m.dir}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${esc(m.description)}" />`)
    .replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${m.canonical}" />`)
    .replace(/<meta\s+name="x-seo-head"[^>]*>/, headTags(m))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}
