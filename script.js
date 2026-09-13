(function () {
  'use strict';

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

  var nav = document.getElementById('nav');
  function updateNav() {
    if (window.scrollY > 40) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  var heroContent = document.querySelector('.hero__content');
  function parallax() {
    if (!heroContent) return;
    var scrolled = window.pageYOffset;
    var heroBottom = document.querySelector('.hero').offsetHeight;
    if (scrolled < heroBottom) {
      heroContent.style.transform = 'translateY(' + (scrolled * 0.18) + 'px)';
      heroContent.style.opacity = Math.max(1 - scrolled / (heroBottom * 0.8), 0);
    }
  }
  window.addEventListener('scroll', parallax, { passive: true });

  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  var cards = document.querySelectorAll('.terrain-card');
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (c) { if (c !== card) c.classList.remove('flipped'); });
        card.classList.toggle('flipped');
      });
    });
  }

  var compassImg = document.querySelector('.compass-rose__img');
  if (compassImg && 'IntersectionObserver' in window) {
    var compassObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        compassImg.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    compassObserver.observe(compassImg);
  }
})();