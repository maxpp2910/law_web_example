import SITE from '../data/site.js';

export function initFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const year = new Date().getFullYear();
  const copy = footer.querySelector('.footer-copy');
  if (copy) {
    copy.textContent = `© ${year} ${SITE.name}. Todos los derechos reservados.`;
  }

  const phoneEl = footer.querySelector('[data-footer-phone]');
  if (phoneEl) phoneEl.textContent = SITE.phone;

  const emailEl = footer.querySelector('[data-footer-email]');
  if (emailEl) {
    emailEl.textContent = SITE.email;
    emailEl.href = `mailto:${SITE.email}`;
  }

  const addressEl = footer.querySelector('[data-footer-address]');
  if (addressEl) addressEl.textContent = SITE.address;
}
