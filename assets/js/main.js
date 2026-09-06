/* monicavendituoli.com — small progressive-enhancement layer */
(function () {
  'use strict';

  /* ---- Theme toggle -------------------------------------------------- */
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    var forced = root.getAttribute('data-theme');
    if (forced === 'dark' || forced === 'light') return forced;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('mv-theme', theme); } catch (e) { /* private mode */ }
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });
  setTheme(currentTheme());

  /* ---- Mobile nav ---------------------------------------------------- */
  var navToggle = document.querySelector('.nav__toggle');
  var navLinks = document.getElementById('nav-links');

  function syncNav() {
    if (!navToggle || !navLinks) return;
    if (window.matchMedia('(max-width: 700px)').matches) {
      if (navToggle.getAttribute('aria-expanded') !== 'true') navLinks.hidden = true;
    } else {
      navLinks.hidden = false;
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navLinks.hidden = open;
    });
    window.addEventListener('resize', syncNav);
    syncNav();
  }

  /* ---- Work-page section scrollspy ----------------------------------- */
  var subnavLinks = Array.prototype.slice.call(document.querySelectorAll('.subnav a[href^="#"]'));
  if (subnavLinks.length && 'IntersectionObserver' in window) {
    var targets = subnavLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var visible = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      var firstVisible = targets.find(function (t) { return visible.has(t.id); });
      subnavLinks.forEach(function (a) {
        a.classList.toggle('is-active', !!firstVisible && a.getAttribute('href') === '#' + firstVisible.id);
      });
    }, { rootMargin: '-120px 0px -55% 0px', threshold: 0 });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---- Current year in footer ---------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
