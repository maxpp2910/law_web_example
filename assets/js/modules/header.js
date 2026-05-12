import SITE from '../data/site.js';
import { setActiveNav } from './helpers.js';

export function initHeader() {
  const headerEl = document.getElementById('site-header');
  if (!headerEl) return;

  const logoWrap = headerEl.querySelector('.site-header__logo');
  if (logoWrap) {
    if (SITE.logo.src) {
      logoWrap.innerHTML = `<a href="/"><img src="${SITE.logo.src}" alt="${SITE.logo.alt}" width="160" height="40"></a>`;
    } else {
      logoWrap.innerHTML = `<a href="/"><div class="site-header__logo-placeholder">${SITE.logo.text}</div></a>`;
    }
  }

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  setActiveNav();
}
