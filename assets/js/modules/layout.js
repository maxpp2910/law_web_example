export async function loadLayout() {
  const slots = [
    { selector: '#site-header-slot', url: '/assets/partials/header.html' },
    { selector: '#site-footer-slot', url: '/assets/partials/footer.html' }
  ];

  // Try multiple candidate URLs (absolute and relative) to be robust
  const tryFetch = async (candidates) => {
    for (const u of candidates) {
      try {
        const resp = await fetch(u);
        if (resp && resp.ok) return resp;
      } catch (e) {
        // ignore and try next
      }
    }
    return null;
  };

  await Promise.all(slots.map(async ({ selector, url }) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const candidates = [
      url,
      url.replace(/^\//, ''),
      `.${url}`,
      `..${url}`
    ];

    const response = await tryFetch(candidates);
    if (!response) {
      throw new Error(`No se pudo cargar ninguna variante de ${url}`);
    }

    container.innerHTML = await response.text();
  }));
}