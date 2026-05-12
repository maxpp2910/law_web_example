import { sanitize } from './helpers.js';

const overlay = document.getElementById('modal-overlay');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalBio = document.getElementById('modal-bio');
const modalImg = document.getElementById('modal-img');
const modalImgPlaceholder = document.getElementById('modal-img-placeholder');
const modalFb = document.getElementById('modal-fb');
const modalWa = document.getElementById('modal-wa');
const modalLi = document.getElementById('modal-li');

function openModal(member) {
  if (!overlay) return;

  modalName.textContent = member.name;
  modalRole.textContent = member.role;
  modalBio.textContent = member.bio;

  if (member.photo) {
    modalImg.setAttribute('data-src', member.photo);
    modalImg.alt = member.photoAlt;
    modalImg.src = member.photo;
    modalImg.onload = () => modalImg.classList.add('loaded');
    modalImgPlaceholder.style.display = 'none';
  } else {
    modalImg.src = '';
    modalImg.classList.remove('loaded');
    modalImgPlaceholder.style.display = 'flex';
    modalImgPlaceholder.textContent = 'Foto del abogado';
  }

  modalFb.href = member.facebook;
  modalWa.href = `https://wa.me/${member.whatsapp.replace(/\D/g, '')}`;
  modalLi.href = member.linkedin;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

export function initModal(teamData) {
  if (!overlay) return;

  document.querySelectorAll('[data-member-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-member-id');
      const member = teamData.find(m => m.id === id);
      if (member) openModal(member);
    });
  });

  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}
