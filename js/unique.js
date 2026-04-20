
(function() {
  'use strict';

  // ============================================================
  // 1. PARTICLE NETWORK (Hero Canvas)
  // ============================================================
  var canvas = document.getElementById('particle-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouse = { x: null, y: null };
    var animationId;
    var isVisible = true;

    function resizeCanvas() {
      var parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    function createParticles() {
      particles = [];
      var count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          var dx = mouse.x - p.x;
          var dy = mouse.y - p.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            var force = (150 - dist) / 150;
            p.vx -= (dx / dist) * force * 0.02;
            p.vy -= (dy / dist) * force * 0.02;
          }
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Clamp velocity
        var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 212, 191, ' + p.opacity + ')';
        ctx.fill();
      }

      // Draw connections
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var opacity = (1 - dist / 120) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(45, 212, 191, ' + opacity + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (isVisible) {
        animationId = requestAnimationFrame(drawParticles);
      }
    }

    // Mouse tracking
    canvas.addEventListener('mousemove', function(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', function() {
      mouse.x = null;
      mouse.y = null;
    });

    // Visibility observer (pause when off-screen)
    var heroObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) drawParticles();
      });
    }, { threshold: 0.1 });
    heroObserver.observe(canvas);

    // Init
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', function() {
      resizeCanvas();
      createParticles();
    });
  }

  // ============================================================
  // 2. 3D TILT CARDS
  // ============================================================
  var tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / centerY * -8;
      var rotateY = (x - centerX) / centerX * 8;
      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';

      // Update shine position
      var shine = card.querySelector('.card-shine');
      if (shine) {
        var percentX = (x / rect.width) * 100;
        var percentY = (y / rect.height) * 100;
        shine.style.setProperty('--mouse-x', percentX + '%');
        shine.style.setProperty('--mouse-y', percentY + '%');
      }
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================================
  // 3. SCROLL REVEAL (Intersection Observer)
  // ============================================================
  var revealElements = document.querySelectorAll('.reveal, .reveal-text, .service-box, .counter-box, .work-box, .glass-project');

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function(el, index) {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-text')) {
      el.classList.add('reveal');
    }
    // Add stagger delay for grid items
    var delayClass = 'reveal-delay-' + ((index % 6) + 1);
    if (!el.classList.contains(delayClass)) {
      el.classList.add(delayClass);
    }
    revealObserver.observe(el);
  });

  // ============================================================
  // 4. NAVBAR SCROLL EFFECT
  // ============================================================
  var navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================================
  // 5. BACK TO TOP VISIBILITY
  // ============================================================
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
  }

  // ============================================================
  // 6. ACTIVE NAV LINK ON SCROLL
  // ============================================================
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-link.js-scroll');

  window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

})();
