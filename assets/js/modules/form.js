import SITE from '../data/site.js';
import { sanitize } from './helpers.js';

function showError(input, msg) {
  input.classList.add('error');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) errEl.textContent = msg;
}

function clearError(input) {
  input.classList.remove('error');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) errEl.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[\d\s\+\-\(\)]{7,15}$/.test(phone);
}

export function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const nameInput = form.querySelector('#f-name');
    const emailInput = form.querySelector('#f-email');
    const phoneInput = form.querySelector('#f-phone');
    const subjectInput = form.querySelector('#f-subject');
    const msgInput = form.querySelector('#f-message');

    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      showError(nameInput, 'Ingresa tu nombre completo.');
      valid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    if (phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
      showError(phoneInput, 'Ingresa un número de teléfono válido.');
      valid = false;
    }

    if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
      showError(msgInput, 'Por favor, describe brevemente tu consulta.');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Enviar consulta';
      submitBtn.disabled = false;
      const successEl = document.getElementById('form-success');
      if (successEl) successEl.classList.add('visible');
      setTimeout(() => successEl && successEl.classList.remove('visible'), 5000);
    }, 1200);
  });
}
