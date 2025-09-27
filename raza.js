// Basic interactive behavior: menu toggle, theme toggle, form validation, smooth scroll

document.addEventListener('DOMContentLoaded', function () {
  // NAV menu toggle (mobile)
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Theme toggle (dark / light) — remember preference in localStorage
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  function applyTheme(dark) {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('portfolio-dark', dark ? '1' : '0');
  }
  const saved = localStorage.getItem('portfolio-dark');
  if (saved === '1') applyTheme(true);

  themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    applyTheme(!isDark);
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu after click
        if (navLinks.classList.contains('open')) navLinks.classList.remove('open');
      }
    });
  });

  // Simple contact form validation + fake submit
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'براہ مہربانی تمام فیلڈز بھریں۔';
      formMsg.style.color = '#b91c1c';
      return;
    }
    // basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMsg.textContent = 'درست ای میل درج کریں۔';
      formMsg.style.color = '#b91c1c';
      return;
    }

    // fake submit: show success and reset
    formMsg.textContent = 'آپ کا پیغام بھیج دیا گیا — شکریہ! (یہ صرف demo ہے)';
    formMsg.style.color = '#065f46';
    form.reset();
  });

  // Demo links behavior (prevent navigation)
  document.querySelectorAll('[data-demo], [data-code]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('یہ صرف demo لنک ہے۔ آپ یہاں اپنی live demo یا code repository کا URL ڈال سکتے ہیں۔');
    });
  });
});
