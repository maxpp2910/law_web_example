export function sanitize(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function setActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const links = document.querySelectorAll('.site-nav__item a, .mobile-menu__item a');

  links.forEach(link => link.classList.remove('active'));

  links.forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    const isRoot = href === '/';
    const isNestedMatch = path === href || path.startsWith(`${href}/`);

    if ((isRoot && path === '/') || (!isRoot && isNestedMatch)) {
      link.classList.add('active');
    }
  });
}

export function lazyLoadImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      const src = img.getAttribute('data-src');
      if (!src) return;
      img.src = src;
      img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      observer.unobserve(img);
    });
  }, { rootMargin: '120px' });
  imgs.forEach(img => observer.observe(img));
}

export function animateOnScroll() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}
