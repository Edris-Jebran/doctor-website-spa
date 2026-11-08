import { telHref, whatsappHref } from './contactLinks';
import siteContent from '../data/siteContent.json';

const contact = siteContent.fa.contact;

test('telHref has no spaces', () => {
  expect(telHref(contact)).toBe('tel:+93789158627');
});

test('whatsappHref round-trips Dari text', () => {
  const href = whatsappHref(contact, contact.whatsappMessage);
  expect(href.startsWith('https://wa.me/93789158627?text=')).toBe(true);
  const text = decodeURIComponent(href.split('?text=')[1]);
  expect(text).toBe('سلام داکتر صاحب، می‌خواهم دربارهٔ وقت ملاقات بپرسم.');
});
