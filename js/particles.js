/**
 * PARTICLE SYSTEM — CREATIVE DEVELOPER PORTFOLIO
 * Lightweight, high-performance interactive particle canvas.
 * Features:
 * - Autonomous particle drift
 * - Mouse proximity push & connection lines
 * - Cursor trailing & touch support
 * - Dynamic density based on device & resolution
 * - Page Visibility & Offscreen scroll pause (saves GPU & battery)
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isVisible = true;
  let isHeroInView = true;

  // Particle configuration
  const config = {
    rgbLime: '197, 255, 61',
    rgbCyan: '0, 240, 255',
    connectionDistance: 110,
    mouseRadius: 140,
    speedFactor: 0.6,
  };

  // State
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  const mouse = {
    x: null,
    y: null,
    targetX: null,
    targetY: null,
    isActive: false,
    radius: config.mouseRadius
  };

  /**
   * Determine optimal particle count based on screen area & device
   */
  function getParticleCount() {
    const area = width * height;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return Math.min(30, Math.floor(area / 28000));
    }
    return Math.min(80, Math.max(35, Math.floor(area / 18000)));
  }

  /**
   * Resize canvas to container / viewport with DPI scaling
   */
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    initParticles();
  }

  /**
   * Particle Class
   */
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.speedFactor;
      this.vy = (Math.random() - 0.5) * config.speedFactor;
      this.radius = Math.random() * 1.5 + 1;
      this.alpha = Math.random() * 0.5 + 0.25;
      // 80% lime accent, 20% cyan accent
      this.isCyan = Math.random() > 0.8;
      this.color = this.isCyan ? config.rgbCyan : config.rgbLime;
    }

    update() {
      // Gentle autonomous motion
      this.x += this.vx;
      this.y += this.vy;

      // Screen edge boundary wrap
      if (this.x < 0) this.x = width;
      else if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      else if (this.y > height) this.y = 0;

      // Mouse interaction (gentle displacement)
      if (mouse.isActive && mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.8;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  /**
   * Initialize particle instances
   */
  function initParticles() {
    const count = getParticleCount();
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  /**
   * Draw inter-particle connections and mouse cursor trails
   */
  function drawConnections() {
    const count = particles.length;
    for (let i = 0; i < count; i++) {
      const p1 = particles[i];

      // Connect to mouse cursor if within range
      if (mouse.isActive && mouse.x !== null && mouse.y !== null) {
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${config.rgbLime}, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to neighboring particles
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.connectionDistance) {
          const alpha = (1 - dist / config.connectionDistance) * 0.16;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${config.rgbLime}, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  /**
   * Main render loop
   */
  function render() {
    if (!isVisible || !isHeroInView) {
      animationFrameId = null;
      return;
    }

    // Smooth cursor interpolation
    if (mouse.targetX !== null && mouse.targetY !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      }
    }

    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawConnections();

    animationFrameId = requestAnimationFrame(render);
  }

  /**
   * Resume render loop if paused
   */
  function startLoop() {
    if (!animationFrameId && isVisible && isHeroInView) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  /**
   * Event Listeners for Mouse and Touch Interaction
   */
  const heroSection = canvas.closest('.hero-section') || window;

  function updatePointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = clientX - rect.left;
    mouse.targetY = clientY - rect.top;
    mouse.isActive = true;
  }

  window.addEventListener('mousemove', (e) => {
    updatePointer(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
    mouse.targetX = null;
    mouse.targetY = null;
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support
  heroSection.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  heroSection.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  heroSection.addEventListener('touchend', () => {
    mouse.isActive = false;
  }, { passive: true });

  // Page visibility API: pause loop when user changes tab
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible) {
      startLoop();
    }
  });

  // Pause when hero section is not visible on scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroInView = entry.isIntersecting;
        if (isHeroInView) {
          startLoop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas.parentElement);
  }

  // Handle window resizing with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
    }, 150);
  }, { passive: true });

  // Init
  resize();
  startLoop();
})();
