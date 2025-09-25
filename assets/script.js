// Theme toggle
const btn = document.getElementById('themeToggle');
btn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
});

// Preprint toggle
const toggle = document.getElementById('togglePreprints');
const getPreprints = () => Array.from(document.querySelectorAll('.pub.preprint'));
if (toggle) {
  toggle.addEventListener('change', () => {
    getPreprints().forEach(el => el.style.display = toggle.checked ? '' : 'none');
  });
}

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
