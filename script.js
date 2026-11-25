// Включаем анимации только если JS работает
document.documentElement.classList.add('js');

// ===== Мобильное меню =====
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  });
});

// ===== Появление блоков при прокрутке =====
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// ===== Подсветка активного раздела в меню =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = nav.querySelectorAll('a');

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => navObserver.observe(section));
}

// ===== Копирование email =====
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Email скопирован: ' + text);
    } catch (error) {
      window.location.href = 'mailto:' + text;
    }
  });
});

// ===== Текущий год в подвале =====
document.getElementById('year').textContent = new Date().getFullYear();
