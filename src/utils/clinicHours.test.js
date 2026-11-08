import { getOpenStatus, formatTime } from './clinicHours';

const hours = { open: '17:30', close: '20:00', days: 'daily', tz: 'Asia/Kabul' };
// Kabul is UTC+4:30, so 17:30 Kabul = 13:00 UTC.
const at = (h, m) => new Date(Date.UTC(2026, 10, 7, h, m));

test.each([
  ['17:29 Kabul is later today', at(12, 59), 'later'],
  ['17:30 Kabul is open', at(13, 0), 'open'],
  ['19:59 Kabul is open', at(15, 29), 'open'],
  ['20:00 Kabul opens tomorrow', at(15, 30), 'tomorrow'],
  ['07:30 Kabul is later today', at(3, 0), 'later'],
  ['23:50 Kabul opens tomorrow', at(19, 20), 'tomorrow'],
])('%s', (_label, now, state) => {
  expect(getOpenStatus(now, hours)).toEqual({ state, open: '17:30', close: '20:00' });
});

test('formats times in English', () => {
  expect(formatTime('17:30', 'en')).toBe('5:30 PM');
  expect(formatTime('20:00', 'en')).toBe('8:00 PM');
});

test('formats times in Dari with Persian digits', () => {
  expect(formatTime('20:00', 'fa')).toBe('۸:۰۰ شب');
  expect(formatTime('17:30', 'fa')).toBe('۵:۳۰ عصر');
  expect(formatTime('09:15', 'fa')).toBe('۹:۱۵ صبح');
});
