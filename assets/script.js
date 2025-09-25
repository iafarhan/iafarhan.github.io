// Scroll progress bar
const progress = document.getElementById('progress');
document.addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = p + '%';
});

// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Preprint toggle
const preprintToggle = document.getElementById('togglePreprints');
const preprints = () => Array.from(document.querySelectorAll('.pub.preprint'));
preprintToggle?.addEventListener('change', () => {
  preprints().forEach(el => el.style.display = preprintToggle.checked ? '' : 'none');
});

// Active section highlight
const navLinks = Array.from(document.querySelectorAll('#nav a'));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const onIntersect = entries => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = navLinks.find(a => a.getAttribute('href') === id);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      link?.classList.add('active');
    }
  });
};
const obs = new IntersectionObserver(onIntersect, { rootMargin: "-50% 0px -45% 0px", threshold: 0 });
sections.forEach(s => obs.observe(s));

// Reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal .card');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('revealed'); revObs.unobserve(e.target);} });
}, { threshold: 0.15 });
revealEls.forEach(el => revObs.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Parallax tilt on portrait
const portrait = document.getElementById('portrait');
portrait?.addEventListener('mousemove', (e) => {
  const r = portrait.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width/2)) / r.width;
  const dy = (e.clientY - (r.top + r.height/2)) / r.height;
  portrait.style.transform = `rotateX(${ -dy * 6 }deg) rotateY(${ dx * 6 }deg)`;
});
portrait?.addEventListener('mouseleave', () => { portrait.style.transform = 'rotate(0deg)'; });

// Back to top
document.getElementById('toTop')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
