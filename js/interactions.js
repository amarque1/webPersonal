/**
 * INTERACTIONS & UI LOGIC
 * - Custom desktop cursor follower with magnetic feel
 * - Dual-identity mindset switcher & interactive focus
 * - Project details modal dialog with keyboard accessibility
 * - Copy-to-clipboard email utility with toast notification
 * - Back to top interaction
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  /* ==========================================================================
     1. CUSTOM DESKTOP CURSOR
     ========================================================================== */
  function initCustomCursor() {
    if (prefersReducedMotion || isTouchDevice) return;

    const dot = document.querySelector('.custom-cursor-dot');
    const ring = document.querySelector('.custom-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible = false;
    });

    // Smooth cursor ring animation loop
    function animateCursor() {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor over interactive targets
    const interactiveSelectors = 'a, button, input, textarea, [role="button"], .project-card, .mindset-card, .skill-item';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('is-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('is-hovering');
      }
    });
  }

  /* ==========================================================================
     2. DUAL-IDENTITY MINDSET SWITCHER (ABOUT ME)
     ========================================================================== */
  function initDualIdentity() {
    const tabs = document.querySelectorAll('.dual-tab-btn');
    const cards = document.querySelectorAll('.mindset-card');
    if (!tabs.length || !cards.length) return;

    function setProfile(profile) {
      tabs.forEach(btn => {
        const isActive = btn.dataset.profile === profile;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      cards.forEach(card => {
        if (profile === 'both') {
          card.classList.remove('is-highlighted');
          card.style.opacity = '1';
          card.style.transform = '';
        } else if (profile === 'technical') {
          const isTech = card.classList.contains('mindset-card--tech');
          card.classList.toggle('is-highlighted', isTech);
          card.style.opacity = isTech ? '1' : '0.45';
        } else if (profile === 'artistic') {
          const isArt = card.classList.contains('mindset-card--art');
          card.classList.toggle('is-highlighted', isArt);
          card.style.opacity = isArt ? '1' : '0.45';
        }
      });
    }

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        setProfile(btn.dataset.profile);
      });
    });

    // Hover emphasis on mindset cards
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => {
          if (c !== card) c.style.opacity = '0.5';
        });
        card.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        cards.forEach(c => {
          c.style.opacity = '1';
        });
      });
    });
  }

  /* ==========================================================================
     3. PROJECT DETAILS MODAL DIALOG
     ========================================================================== */
  function initProjectModal() {
    const modal = document.querySelector('.project-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.project-modal-close');
    const backdrop = modal.querySelector('.project-modal-backdrop');
    const detailBtns = document.querySelectorAll('.btn-project-details');

    // Project data repository for expanded architectural view
    const projectsData = {
      'chronoshift': {
        title: 'Project Chrono-Shift',
        role: 'Gameplay Systems & Physics Programmer',
        category: 'GAMEPLAY SYSTEMS // C# & UNITY',
        overview: 'A physics-based time-dilation prototype focusing on determinism, predictive trajectory calculation, and custom rigid-body collision management.',
        architecture: 'Engineered a modular state machine architecture decoupling player input from physics tick rate. Implemented a ring-buffer state history system allowing rewinds, trajectory scrubbing, and localized time dilation bubbles.',
        challenges: 'Overcoming Unity default PhysX tunneling artifacts during high-speed time scales by implementing continuous sweeping volume intersections and custom Verlet integration.',
        controls: 'WASD / Left Stick: Kinematic Move | Right Click / LT: Dilate Time | Space / A: Jump | E: Rewind Horizon'
      },
      'neoruins': {
        title: 'Neo-Ruins: Sector 7',
        role: '3D Artist, Level Designer & Art Director',
        category: '3D ENVIRONMENT // BLENDER & PBR',
        overview: 'An atmospheric dystopian sci-fi environment exploration designed to convey environmental storytelling through monolithic architectural silhouettes and brutalist cyberpunk structures.',
        architecture: 'Modular trim-sheet workflow created in Blender, baked with high-to-low poly normal transfers. PBR roughness/metallic workflow calibrated for volumetric fog and real-time screen-space reflections.',
        challenges: 'Balancing visual density with optimal draw call budgets. Optimized polycount to 48k tris for hero assets using hierarchical LODs and custom ambient occlusion vertex maps.',
        controls: 'Real-time 3D walkthrough demo viewable via WebGL / itch.io build.'
      },
      'odyssey': {
        title: 'Procedural Odyssey',
        role: 'Creative Technologist & Shader Developer',
        category: 'PROCEDURAL ENGINE // HLSL & COMPUTE SHADERS',
        overview: 'An infinite procedural voxel world generator powered by GPU compute shaders and Marching Cubes algorithm with multi-octave simplex noise biomes.',
        architecture: 'GPU compute shader dispatching 64x64x64 voxel density chunks asynchronously into compute buffers, generating watertight polygonal meshes on demand with zero main-thread hitching.',
        challenges: 'Seamless chunk stitching across LOD boundaries and dynamic dual-contouring resolution without visible cracks or vertex swimming.',
        controls: 'WASD: Fly Cam | Mouse: Orbit | [ / ]: Change Seed | Tab: Debug Node Inspector'
      }
    };

    let previousActiveElement = null;

    function openModal(projectId) {
      const data = projectsData[projectId];
      if (!data) return;

      previousActiveElement = document.activeElement;

      // Fill modal contents
      modal.querySelector('.modal-tag').textContent = data.category;
      modal.querySelector('.modal-title').textContent = data.title;
      modal.querySelector('.modal-role').textContent = data.role;
      modal.querySelector('.modal-overview').textContent = data.overview;
      modal.querySelector('.modal-architecture').textContent = data.architecture;
      modal.querySelector('.modal-challenges').textContent = data.challenges;
      modal.querySelector('.modal-controls').textContent = data.controls;

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    }

    detailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.dataset.project;
        openModal(projectId);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }

    // Keyboard support: ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     4. CLIPBOARD COPY UTILITY & TOAST NOTIFICATION
     ========================================================================== */
  function initCopyUtility() {
    const copyBtns = document.querySelectorAll('.btn-copy-email');
    const toast = document.querySelector('.toast');

    function showToast(message) {
      if (!toast) return;
      const textEl = toast.querySelector('.toast-text');
      if (textEl) textEl.textContent = message;
      toast.classList.add('is-visible');

      setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 3000);
    }

    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.dataset.copyText || 'developer@example.com';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showToast(`Copied ${email} to clipboard!`);
            const label = btn.querySelector('.copy-label');
            if (label) {
              const originalText = label.textContent;
              label.textContent = 'COPIED!';
              setTimeout(() => {
                label.textContent = originalText;
              }, 2000);
            }
          }).catch(() => {
            showToast(`Email: ${email}`);
          });
        } else {
          // Fallback
          showToast(`Email: ${email}`);
        }
      });
    });
  }

  /* ==========================================================================
     5. BACK TO TOP INTERACTION
     ========================================================================== */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.footer-back-to-top');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // Initialize all interactions on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initDualIdentity();
    initProjectModal();
    initCopyUtility();
    initBackToTop();
  });
})();
