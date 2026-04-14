"use strict";

// Espera que todo el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("nav");
  const navHeight = nav.offsetHeight;

  // --- Navbar toggler (modo responsive) ---
  const navbarToggler = document.querySelector(".navbar-toggler");
  const mainNav = document.getElementById("mainNav");

  if (navbarToggler && mainNav) {
    navbarToggler.addEventListener("click", () => {
      if (!mainNav.classList.contains("navbar-reduce")) {
        mainNav.classList.add("navbar-reduce");
      }
    });
  }

  // --- Preloader ---
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.transition = "opacity 0.6s ease";
        preloader.style.opacity = "0";
        setTimeout(() => preloader.remove(), 600);
      }, 100);
    }
  });

  // --- Back to top button ---
  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTop?.classList.add("visible");
    } else {
      backToTop?.classList.remove("visible");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Scroll suave en links del menú ---
  const scrollLinks = document.querySelectorAll('a.js-scroll[href^="#"]:not([href="#"])');
  scrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - navHeight + 5;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
      // Cierra menú responsive si está abierto
      document.querySelector(".navbar-collapse")?.classList.remove("show");
    });
  });

  // --- Navbar dinámica (reduce/transparente) ---
  const navbar = document.querySelector(".navbar-expand-md");
  const scrollTopMf = document.querySelector(".scrolltop-mf");
  
  const handleScroll = () => {
    const pixels = 50;
    const top = 1200;
    if (window.scrollY > pixels) {
      navbar?.classList.add("navbar-reduce");
      navbar?.classList.remove("navbar-trans");
    } else {
      navbar?.classList.add("navbar-trans");
      navbar?.classList.remove("navbar-reduce");
    }
    if (window.scrollY > top) {
      scrollTopMf?.classList.add("visible");
    } else {
      scrollTopMf?.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Ejecuta al cargar

  // --- Botón scrolltop-mf ---
  scrollTopMf?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Efecto Typed.js (solo si la librería está incluida) ---
  const textSlider = document.querySelector(".text-slider");
  const textItems = document.querySelector(".text-slider-items");
  if (textSlider && textItems && typeof Typed !== "undefined" && !window._typedInstance) {
    window._typedInstance = new Typed(".text-slider", {
      strings: textItems.textContent.split(","),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  // --- Contador animado (versión simple sin plugin) ---
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 100;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

});
