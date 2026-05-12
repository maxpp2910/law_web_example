import { initHeader } from './modules/header.js';
import { initFooter } from './modules/footer.js';
import { loadLayout } from './modules/layout.js';
import { initForm } from './modules/form.js';
import { initModal } from './modules/modal.js';
import TEAM from './data/team.js';
import { lazyLoadImages, animateOnScroll } from './modules/helpers.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadLayout();
  } catch (error) {
    console.error(error);
  }

  initHeader();
  initFooter();
  initForm();
  initModal(TEAM);
  lazyLoadImages();
  animateOnScroll();
});
