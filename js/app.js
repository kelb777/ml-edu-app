// app.js — Main app controller, routing, theme toggle, navigation, progress

(function() {
  'use strict';

  // ========== STATE (in-memory only) ==========
  const state = {
    currentModule: null, // module id or null for home
    theme: null, // 'light' or 'dark', null = system
    visitedModules: new Set(),
    sidebarOpen: false
  };

  // ========== ELEMENTS ==========
  const $ = (sel) => document.querySelector(sel);
  const sidebar = $('#sidebar');
  const mainContent = $('#mainContent');
  const progressFill = $('#progressFill');
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const hamburgerBtn = $('#hamburgerBtn');
  const sidebarOverlay = $('#sidebarOverlay');
  const logoHome = $('#logoHome');

  // ========== THEME ==========
  function detectSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.innerHTML = theme === 'dark' ? '&#9790;' : '&#9728;';
  }

  function toggleTheme() {
    const current = state.theme || detectSystemTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Initialize theme
  applyTheme(detectSystemTheme());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!state.theme) applyTheme(e.matches ? 'dark' : 'light');
  });

  themeToggle.addEventListener('click', toggleTheme);

  // ========== SIDEBAR NAV ==========
  function buildSidebar() {
    let html = '';
    MODULE_SECTIONS.forEach(section => {
      html += `<div class="sidebar-section">`;
      html += `<div class="sidebar-section-title">${section.title}</div>`;
      section.modules.forEach(moduleId => {
        const mod = MODULES.find(m => m.id === moduleId);
        if (!mod) return;
        const active = state.currentModule === moduleId ? ' active' : '';
        const visited = state.visitedModules.has(moduleId) ? ' visited' : '';
        html += `<div class="sidebar-link${active}${visited}" data-module="${moduleId}">`;
        html += `<span class="link-number">${mod.number}.</span>`;
        html += `<span>${mod.title}</span>`;
        html += `</div>`;
      });
      html += `</div>`;
    });
    sidebar.innerHTML = html;

    // Bind clicks
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        navigateTo(link.dataset.module);
        closeSidebar();
      });
    });
  }

  // ========== SIDEBAR MOBILE ==========
  function openSidebar() {
    state.sidebarOpen = true;
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    sidebarOverlay.style.display = 'block';
  }

  function closeSidebar() {
    state.sidebarOpen = false;
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    setTimeout(() => { sidebarOverlay.style.display = 'none'; }, 200);
  }

  hamburgerBtn.addEventListener('click', () => {
    state.sidebarOpen ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener('click', closeSidebar);

  // ========== PROGRESS ==========
  function updateProgress() {
    const total = MODULES.length;
    const visited = state.visitedModules.size;
    const pct = total > 0 ? (visited / total) * 100 : 0;
    progressFill.style.width = pct + '%';
  }

  // ========== ROUTING ==========
  function navigateTo(moduleId) {
    if (moduleId === null || moduleId === 'home') {
      state.currentModule = null;
      renderHome();
    } else {
      state.currentModule = moduleId;
      state.visitedModules.add(moduleId);
      renderModule(moduleId);
    }
    buildSidebar();
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash
    if (moduleId) {
      history.pushState(null, '', '#' + moduleId);
    } else {
      history.pushState(null, '', window.location.pathname);
    }
  }

  // Logo click → home
  logoHome.addEventListener('click', () => navigateTo(null));

  // ========== RENDER HOME ==========
  function renderHome() {
    let overviewCards = '';
    MODULES.forEach(mod => {
      overviewCards += `
        <div class="overview-card" data-module="${mod.id}">
          <div class="oc-number">Module ${mod.number}</div>
          <div class="oc-title">${mod.title}</div>
          <div class="oc-desc">${mod.subtitle}</div>
        </div>`;
    });

    mainContent.innerHTML = `
      <div class="hero">
        <h1>Machine Learning <span class="highlight">Fundamentals</span></h1>
        <p class="subtitle">An interactive, non-technical guide to understanding ML — from data preparation through deployment, explained with real-world analogies and hands-on demos.</p>
        <button class="hero-cta" id="startBtn">Start the Course →</button>
      </div>
      <div class="overview-grid">${overviewCards}</div>
    `;

    // Bind overview card clicks
    mainContent.querySelectorAll('.overview-card').forEach(card => {
      card.addEventListener('click', () => navigateTo(card.dataset.module));
    });

    // Start button
    const startBtn = mainContent.querySelector('#startBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => navigateTo(MODULES[0].id));
    }
  }

  // ========== RENDER MODULE ==========
  function renderModule(moduleId) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) { renderHome(); return; }

    const modIndex = MODULES.findIndex(m => m.id === moduleId);
    const prev = modIndex > 0 ? MODULES[modIndex - 1] : null;
    const next = modIndex < MODULES.length - 1 ? MODULES[modIndex + 1] : null;

    let navHtml = '<div class="module-nav">';
    if (prev) {
      navHtml += `<button class="module-nav-btn prev" data-module="${prev.id}">← ${prev.title}</button>`;
    }
    if (next) {
      navHtml += `<button class="module-nav-btn next" data-module="${next.id}">${next.title} →</button>`;
    }
    navHtml += '</div>';

    mainContent.innerHTML = `
      <div class="module-header">
        <div class="module-label">Module ${mod.number}</div>
        <h1>${mod.title}</h1>
        <p class="module-subtitle">${mod.subtitle}</p>
      </div>
      ${mod.content}
      ${navHtml}
    `;

    // Bind nav buttons
    mainContent.querySelectorAll('.module-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.module));
    });

    // Initialize interactive elements
    initDefinitionCards();
    if (typeof initInteractions === 'function') {
      initInteractions(moduleId);
    }
  }

  // ========== DEFINITION CARD TOGGLES ==========
  function initDefinitionCards() {
    document.querySelectorAll('.def-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    });
  }

  // ========== HASH ROUTING ==========
  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && MODULES.find(m => m.id === hash)) {
      navigateTo(hash);
    } else {
      navigateTo(null);
    }
  }

  window.addEventListener('popstate', handleHash);

  // ========== INIT ==========
  handleHash();
})();