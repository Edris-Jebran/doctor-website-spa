export const telHref = (contact) => `tel:${contact.phone.replace(/\s+/g, '')}`;

export const whatsappHref = (contact, message) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
