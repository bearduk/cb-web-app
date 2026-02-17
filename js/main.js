/* ===================================================
   CB Web App — Main JS (ES5 compatible)
   =================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------
     Theme Toggle
     -------------------------------------------------- */
  var STORAGE_KEY = 'cb-web-app-theme';
  var htmlEl = document.documentElement;
  var toggleBtn = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');

  // Sun and moon symbols
  var ICON_LIGHT = '\u2600'; // ☀
  var ICON_DARK = '\u263E';  // ☾

  function getPreferredTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // localStorage unavailable
    }
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? ICON_LIGHT : ICON_DARK;
    toggleBtn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable
    }
  }

  // Initialise theme
  applyTheme(getPreferredTheme());

  toggleBtn.addEventListener('click', function () {
    var current = htmlEl.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  /* --------------------------------------------------
     Link Filter
     -------------------------------------------------- */
  var filterInput = document.getElementById('filterInput');
  var linkList = document.getElementById('linkList');
  var noResults = document.getElementById('noResults');
  var linkCards = linkList.getElementsByClassName('link-card');

  filterInput.addEventListener('input', function () {
    var query = filterInput.value.toLowerCase();
    var visibleCount = 0;
    var i, text;

    for (i = 0; i < linkCards.length; i++) {
      text = linkCards[i].textContent.toLowerCase();
      if (text.indexOf(query) !== -1) {
        linkCards[i].classList.remove('hidden');
        visibleCount++;
      } else {
        linkCards[i].classList.add('hidden');
      }
    }

    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  });
})();
