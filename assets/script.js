// Scroll progress
const progress = document.getElementById('progress');
document.addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = p + '%';
});

// Theme toggle with localStorage
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
document.getElementById('themeToggle')?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Preprint toggle
const preToggle = document.getElementById('togglePreprints');
const getPreprints = () => Array.from(document.querySelectorAll('.pub.preprint'));
preToggle?.addEventListener('change', () => {
  getPreprints().forEach(el => el.style.display = preToggle.checked ? '' : 'none');
});

// Active section highlight
const navLinks = Array.from(document.querySelectorAll('#nav a'));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = navLinks.find(a => a.getAttribute('href') === id);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}, {rootMargin: "-55% 0px -40% 0px", threshold: 0});
sections.forEach(s => obs.observe(s));

// Reveal-on-scroll
const cards = document.querySelectorAll('.reveal .card');
const rev = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('revealed'); rev.unobserve(e.target);} });
}, { threshold: 0.12 });
cards.forEach(el => rev.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Back to top visibility
const toTop = document.getElementById('toTop');
const showTop = () => {
  if (window.scrollY > 600) toTop?.classList.add('show');
  else toTop?.classList.remove('show');
};
showTop();
document.addEventListener('scroll', showTop);
document.getElementById('toTop')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
