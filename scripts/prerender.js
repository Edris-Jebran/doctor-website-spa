#!/usr/bin/env node
/*
 * Runs after `react-scripts build`. Renders the app to static HTML:
 *   build/index.html     -> Dari  (https://drjebran.com/)
 *   build/en/index.html  -> English (https://drjebran.com/en/)
 * so search engines and link previews see the full page without running JavaScript.
 *
 * The src/ files are transpiled with Babel into node_modules/.cache/prerender and required from there.
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const buildDir = path.join(root, 'build');
// Inside the project so the transpiled files can resolve react, react-dom, etc.
const outDir = path.join(root, 'node_modules', '.cache', 'prerender');

function transpileTree(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    if (entry.isDirectory()) {
      transpileTree(src, path.join(to, entry.name));
    } else if (/\.(js|jsx)$/.test(entry.name) && !/\.test\./.test(entry.name)) {
      const { code } = babel.transformFileSync(src, {
        babelrc: false,
        configFile: false,
        presets: [
          [require.resolve('@babel/preset-env'), { targets: { node: 'current' }, modules: 'commonjs' }],
          [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
        ],
      });
      // Imports keep their ".jsx" extension, so write the output under the same name.
      fs.writeFileSync(path.join(to, entry.name), code);
    } else if (entry.name.endsWith('.json')) {
      fs.copyFileSync(src, path.join(to, entry.name));
    }
    // CSS and other assets are ignored: the browser bundle provides them.
  }
}

function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  transpileTree(srcDir, outDir);
  require.extensions['.jsx'] = require.extensions['.js'];
  process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';
  const { renderPage } = require(path.join(outDir, 'seo', 'renderPage.js'));

  const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
  const pages = { fa: path.join(buildDir, 'index.html'), en: path.join(buildDir, 'en', 'index.html') };

  for (const [lang, file] of Object.entries(pages)) {
    const html = renderPage(lang, template);
    if (!html.includes('<div id="root"><')) throw new Error(`prerender: ${lang} page body is empty`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    console.log(`prerender: ${path.relative(root, file)} (${lang}, ${Math.round(html.length / 1024)} kB)`);
  }
  fs.rmSync(outDir, { recursive: true, force: true });
}

main();
