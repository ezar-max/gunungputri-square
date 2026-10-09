export function waUrl(number, message) {
  const phone = String(number).replace(/[^\d]/g, '');
  const text = encodeURIComponent(message || '');
  return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
}

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text, n = 150) {
  if (!text) return '';
  if (text.length <= n) return text;
  return text.slice(0, n).replace(/\s+\S*$/, '') + '…';
}
