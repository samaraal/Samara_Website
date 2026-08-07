const PUBLIC_PORTAL_VERSION = '1.0.0';
const SAMARA_PHONE = '917395961616';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

function clean(value) {
  return String(value || '').trim();
}

function openWhatsApp(message, statusElement) {
  const url = `https://wa.me/${SAMARA_PHONE}?text=${encodeURIComponent(message)}`;
  localStorage.setItem('samara_last_public_enquiry', JSON.stringify({ message, created_at: new Date().toISOString() }));
  statusElement.textContent = 'Opening WhatsApp with your request…';
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.getElementById('visit-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const status = event.currentTarget.querySelector('.form-status');
  const message = [
    '*Samara – Visit Request*',
    `Visitor: ${clean(form.get('name'))}`,
    `Mobile: ${clean(form.get('mobile'))}`,
    `Preferred Date: ${clean(form.get('date'))}`,
    `Preferred Time: ${clean(form.get('time'))}`,
    `Purpose / Care Requirement: ${clean(form.get('message')) || 'Not specified'}`
  ].join('\n');
  openWhatsApp(message, status);
});

document.getElementById('enquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const status = event.currentTarget.querySelector('.form-status');
  const message = [
    '*Samara – Admission Enquiry*',
    `Resident: ${clean(form.get('resident'))}`,
    `Age: ${clean(form.get('age')) || 'Not specified'}`,
    `Contact Person: ${clean(form.get('contact'))}`,
    `Mobile: ${clean(form.get('mobile'))}`,
    `Care Type: ${clean(form.get('care'))}`,
    `Preferred Room: ${clean(form.get('room'))}`,
    `Condition / Requirements: ${clean(form.get('condition')) || 'Not specified'}`
  ].join('\n');
  openWhatsApp(message, status);
});

console.info(`Samara Public Portal ${PUBLIC_PORTAL_VERSION}`);
