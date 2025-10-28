// unique.js
// Small microinteraction utilities: tilt on hover for project cards, reveal on scroll, and button ripple

(function(){
  'use strict';

  // Reveal on scroll using IntersectionObserver
  function setupReveal(){
    const items = document.querySelectorAll('.work-box');
    if(!items.length) return;

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.12});

    items.forEach(item=> io.observe(item));
  }

  // Tilt effect for interactive cards
  function setupTilt(){
    // Disable tilt on touch devices to avoid accidental transforms
    if(('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;
    const cards = document.querySelectorAll('.work-box.interactive');
    cards.forEach(card=>{
      card.addEventListener('mousemove', e=>{
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = (-y) * 6; // rotateX
        const ry = (x) * 8; // rotateY
        card.style.transform = `translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', ()=>{
        card.style.transform = '';
      });
      card.addEventListener('mouseenter', ()=>{
        card.style.transition = 'transform .16s ease';
        setTimeout(()=> card.style.transition = '', 200);
      });
    });
  }

  // Simple ripple on .btn-unique
  function setupRipple(){
    document.addEventListener('click', function(e){
      const btn = e.target.closest('.btn-unique');
      if(!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.style.position = 'absolute';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.marginLeft = -size/2 + 'px';
      ripple.style.marginTop = -size/2 + 'px';
      ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.opacity = '0';
      ripple.style.transform = 'scale(.8)';
      ripple.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.3,1)';
      btn.appendChild(ripple);
      requestAnimationFrame(()=>{
        ripple.style.opacity = '1';
        ripple.style.transform = 'scale(1)';
      });
      setTimeout(()=>{
        ripple.style.opacity = '0';
        ripple.style.transform = 'scale(1.2)';
        setTimeout(()=> ripple.remove(), 650);
      }, 250);
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', function(){
    setupReveal();
    setupTilt();
    setupRipple();
  });

})();
