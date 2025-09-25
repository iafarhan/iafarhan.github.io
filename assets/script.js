// Theme toggle
const btn = document.getElementById('themeToggle');
btn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
});

// Preprint toggle
const toggle = document.getElementById('togglePreprints');
const preprints = () => Array.from(document.querySelectorAll('.pub.preprint'));
if (toggle) {
  toggle.addEventListener('change', () => {
    preprints().forEach(el => el.style.display = toggle.checked ? '' : 'none');
  });
}

// Optional light theme
const setLight = () => {
  document.documentElement.style.setProperty('--bg', '#f8faf9');
  document.documentElement.style.setProperty('--bg-alt', '#eef5f2');
  document.documentElement.style.setProperty('--text', '#13221d');
  document.documentElement.style.setProperty('--muted', '#4b6b5f');
  document.documentElement.style.setProperty('--card', '#ffffff');
  document.documentElement.style.setProperty('--border', '#cfe2db');
  document.documentElement.style.setProperty('--shadow', '0 6px 20px rgba(0,0,0,.09)');
};
document.documentElement.classList.contains('light') && setLight();
const observer = new MutationObserver(() => {
  if (document.documentElement.classList.contains('light')) setLight();
  else location.reload(); // quick reset back to dark vars
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
