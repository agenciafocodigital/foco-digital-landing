(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('[data-category]').forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      });
    });
  });

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const demos = [...document.querySelectorAll('.automation-demo')];
  if ('IntersectionObserver' in window) {
    const processObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-running', entry.isIntersecting && !motionPreference.matches));
    }, { threshold: .25 });
    demos.forEach(demo => processObserver.observe(demo));
    motionPreference.addEventListener('change', () => {
      demos.forEach(demo => { if (motionPreference.matches) demo.classList.remove('is-running'); });
    });
  }

  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll(
    '.hero .eyebrow,.hero h1,.hero .intro,.hero .actions,.hero .micro,.hero-image,.page-hero .breadcrumb,.page-hero .eyebrow,.page-hero h1,.page-hero p:not(.eyebrow),.section-heading,.section > .wrap > h2,.card,.step,.audit-panel,.visual-story > div,.privacy-feature > div,.privacy-feature > figure,.service-detail > div,.split > div,.split > figure'
  )];
  // Don't nest entrance transitions; text and cards stay readable without JavaScript.
  const roots = targets.filter(element => !targets.some(parent => parent !== element && parent.contains(element)));
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.add('is-visible');
      observer.unobserve(element);
      const delay = Number(element.dataset.revealDelay || 0);
      window.setTimeout(() => {
        element.classList.remove('fd-reveal', 'from-left', 'from-right');
        element.style.removeProperty('--reveal-delay');
      }, 950 + delay);
    });
  }, { threshold: .08, rootMargin: '0px 0px -16px' });
  roots.forEach(element => {
    const siblings = [...element.parentElement.children].filter(item => roots.includes(item));
    const delay = Math.min(siblings.indexOf(element) * 90, 270);
    element.dataset.revealDelay = String(delay);
    element.style.setProperty('--reveal-delay', delay + 'ms');
    element.classList.add('fd-reveal');
    if (element.matches('.hero-grid > div,.visual-story > div:first-child')) element.classList.add('from-left');
    if (element.matches('.hero-image,.privacy-feature > figure')) element.classList.add('from-right');
    observer.observe(element);
  });
  const showAll = () => {
    if (!motionPreference.matches) return;
    observer.disconnect();
    roots.forEach(element => element.classList.remove('fd-reveal', 'from-left', 'from-right'));
    document.documentElement.classList.remove('motion-ready');
  };
  motionPreference.addEventListener('change', showAll);
  // A focused link must never remain hidden while navigating with the keyboard.
  document.addEventListener('focusin', event => {
    const element = event.target.closest('.fd-reveal');
    if (element) { element.classList.add('is-visible'); observer.unobserve(element); }
  });
})();

// Barra de acciones: aparece al dejar atrás la cabecera; siempre visible si recibe el foco.
(() => {
  const bar = document.querySelector('.action-bar');
  if (!bar) return;
  document.documentElement.classList.add('js-action-bar');
  const update = () => bar.classList.toggle('is-visible', window.scrollY > Math.min(520, window.innerHeight * 0.6));
  update();
  window.addEventListener('scroll', update, { passive: true });
  bar.addEventListener('focusin', () => bar.classList.add('is-visible'));
})();

/* Clics a WhatsApp para Google Analytics */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
  if (a && typeof window.gtag === 'function') window.gtag('event', 'whatsapp_clic', { ubicacion: location.pathname });
});
