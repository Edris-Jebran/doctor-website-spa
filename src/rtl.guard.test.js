import fs from 'fs';
import path from 'path';

// Direction must come from `dir`, not hand-flipped classes. Use start/end, ms/me, ps/pe instead.
const FORBIDDEN = /flex-row-reverse|\b(ml|mr|pl|pr)-(\d|\[)|\b(left|right)-(\d|\[)|\btext-(left|right)\b|\bisRTL\s*\?/;

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.jsx') && !f.includes('.test.'));

test.each(files)('%s uses logical (RTL-safe) classes only', (file) => {
  const source = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = source.match(FORBIDDEN);
  expect(match ? match[0] : null).toBeNull();
});
