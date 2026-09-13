/* ═══════════════════════════════════════════════════════════════
   Carta Memoriae — Landing Page Interactions
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var navHeight = document.querySelector('.nav').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Nav Shadow on Scroll ─── */
  var nav = document.getElementById('nav');
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ─── Subtle Parallax on Hero ─── */
  var heroContent = document.querySelector('.hero__content');
  function parallax() {
    if (!heroContent) return;
    var scrolled = window.pageYOffset;
    var heroBottom = document.querySelector('.hero').offsetHeight;
    if (scrolled < heroBottom) {
      /* Move content up slightly as user scrolls */
      heroContent.style.transform = 'translateY(' + (scrolled * 0.18) + 'px)';
      heroContent.style.opacity = Math.max(1 - scrolled / (heroBottom * 0.8), 0);
    }
  }
  window.addEventListener('scroll', parallax, { passive: true });

  /* ─── Intersection Observer — Scroll Reveal ─── */
  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback — reveal all immediately */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ─── Terrain Card Touch Support ─── */
  /* On touch devices, tap to flip (hover doesn't work) */
  var cards = document.querySelectorAll('.terrain-card');
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        /* Close any other open card */
        cards.forEach(function (c) {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  /* ─── Compass Rose Slow Rotation (CSS handles it, but add a
        play/pause on visibility for performance) ─── */
  var compassSvg = document.querySelector('.compass-rose__svg');
  if (compassSvg && 'IntersectionObserver' in window) {
    var compassObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        compassSvg.style.animationPlayState =
          entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    compassObserver.observe(compassSvg);
  }

})();