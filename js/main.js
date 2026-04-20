

(function($) {
  "use strict";

  function initHeroTyped(stringsCsv) {
    if (typeof Typed === 'undefined' || $('.text-slider').length !== 1) {
      return;
    }

    // Evita instancias duplicadas que aceleran o rompen la animacion.
    if (window._typedInstance && typeof window._typedInstance.destroy === 'function') {
      try { window._typedInstance.destroy(); } catch (e) { /* ignore */ }
      window._typedInstance = null;
    }

    var strings = (stringsCsv || '').split(',').map(function(item) {
      return item.trim();
    }).filter(Boolean);

    if (!strings.length) return;

    window._typedInstance = new Typed('.text-slider', {
      strings: strings,
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30,
      cursorChar: '|',
      smartBackspace: true
    });
  }

  // Lo exponemos para reusar la misma inicializacion cuando cambia el idioma.
  window.initHeroTyped = initHeroTyped;

  // ===== PRELOADER =====
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(800).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // ===== TYPED.JS =====
  if ($('.text-slider').length === 1) {
    var typedStrings = $('.text-slider-items').text();
    initHeroTyped(typedStrings);
  }

  // ===== SMOOTH SCROLL =====
  $('a.js-scroll[href*="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 1000, 'easeInOutExpo');
    }
  });

  // ===== SCROLLSpy =====
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // ===== COLLAPSE NAVBAR ON CLICK =====
  $('.navbar-nav>li>a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  // ===== COUNTERS WITH ODOMETER EFFECT =====
  var countersTriggered = false;
  function animateCounters() {
    if (countersTriggered) return;
    var counterSection = $('.section-counter');
    if (counterSection.length) {
      var rect = counterSection[0].getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersTriggered = true;
        $('.odometer').each(function() {
          var $this = $(this);
          var target = parseInt($this.data('target'), 10);
          var duration = 2000;
          var startTime = null;
          function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            $this.text(Math.floor(easeOut * target));
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    }
  }
  $(window).on('scroll', animateCounters);
  animateCounters();

  // ===== YEAR =====
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})(jQuery);
