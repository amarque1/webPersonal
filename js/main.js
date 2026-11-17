/**
 * MAIN CONTROLLER
 * - Page loading lifecycle
 * - Sticky navigation & active section scroll-spy
 * - Mobile drawer navigation
 * - IntersectionObserver scroll-triggered reveals
 * - Real-time HUD system status telemetry (FPS, coordinates, system time)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initStickyNavAndScrollSpy();
    initMobileNav();
    initScrollReveals();
    initSystemTelemetry();
    initCopyrightYear();
  });

  /* ==========================================================================
     1. PAGE LOADER
     ========================================================================== */
  function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('is-loaded');
      }, 250);
    });

    // Fallback dismiss after 1.5s in case of slow resources
    setTimeout(() => {
      if (!loader.classList.contains('is-loaded')) {
        loader.classList.add('is-loaded');
      }
    }, 1500);
  }

  /* ==========================================================================
     2. STICKY NAV & SCROLL SPY
     ========================================================================== */
  function initStickyNavAndScrollSpy() {
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    if (!header || !sections.length) return;

    let ticking = false;

    function handleScroll() {
      const scrollY = window.scrollY;

      // Header background blur state
      if (scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Determine active section
      const headerOffset = header.offsetHeight + 100;
      let currentSectionId = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isCurrent = href === `#${currentSectionId}`;
          link.classList.toggle('active', isCurrent);
          if (isCurrent) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });

    handleScroll();
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link');
    if (!toggle || !drawer) return;

    function toggleMenu(open) {
      const isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
      toggle.classList.toggle('is-active', isOpen);
      drawer.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    toggle.addEventListener('click', () => toggleMenu());

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  }

  /* ==========================================================================
     4. SCROLL REVEALS (IntersectionObserver)
     ========================================================================== */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     5. DYNAMIC HUD SYSTEM STATUS & TELEMETRY
     ========================================================================== */
  function initSystemTelemetry() {
    const timeEl = document.querySelector('.hud-value-time');
    const fpsEl = document.querySelector('.hud-value-fps');
    const coordsEl = document.querySelector('.hud-value-coords');

    // Update real-time clock
    function updateClock() {
      if (timeEl) {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0] + ' UTC' + (now.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(now.getTimezoneOffset() / 60);
        timeEl.textContent = timeStr;
      }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Dynamic FPS simulation
    if (fpsEl) {
      let lastTime = performance.now();
      let frames = 0;
      function calcFps(currentTime) {
        frames++;
        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));
          fpsEl.textContent = `${Math.min(60, Math.max(58, fps))} FPS`;
          frames = 0;
          lastTime = currentTime;
        }
        requestAnimationFrame(calcFps);
      }
      requestAnimationFrame(calcFps);
    }

    // Coordinates subtle fluctuation
    if (coordsEl) {
      let baseLat = 37.7749;
      let baseLng = -122.4194;
      setInterval(() => {
        const jitterLat = (Math.random() - 0.5) * 0.0006;
        const jitterLng = (Math.random() - 0.5) * 0.0006;
        coordsEl.textContent = `${(baseLat + jitterLat).toFixed(4)}° N, ${(Math.abs(baseLng + jitterLng)).toFixed(4)}° W`;
      }, 3000);
    }
  }

  /* ==========================================================================
     6. AUTOMATIC COPYRIGHT YEAR SYNC
     ========================================================================== */
  function initCopyrightYear() {
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
})();
