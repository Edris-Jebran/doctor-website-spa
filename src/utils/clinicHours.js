// Opening status is always computed in the clinic's own time zone, so family
// members checking from abroad see the same answer as patients in Kabul.

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const clinicMinutesNow = (now, tz) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get('hour') * 60 + get('minute');
};

/** Open interval is [open, close). Assumes the clinic opens every day. */
export function getOpenStatus(now, hours) {
  const current = clinicMinutesNow(now, hours.tz);
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  let state = 'tomorrow';
  if (current < open) state = 'later';
  else if (current < close) state = 'open';
  return { state, open: hours.open, close: hours.close };
}

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toPersianDigits = (s) => s.replace(/\d/g, (d) => PERSIAN_DIGITS[d]);

const dariPeriod = (h) => {
  if (h < 12) return 'صبح';
  if (h < 15) return 'ظهر';
  if (h < 19) return 'عصر';
  return 'شب';
};

export function formatTime(hhmm, lang) {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const clock = `${h12}:${String(m).padStart(2, '0')}`;
  if (lang === 'fa') return `${toPersianDigits(clock)} ${dariPeriod(h)}`;
  return `${clock} ${h < 12 ? 'AM' : 'PM'}`;
}
