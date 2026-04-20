
(function(){
  'use strict';

  var translations = {
    es: {
      'nav.home':'Inicio',
      'nav.about':'Sobre mí',
      'nav.services':'Servicios',
      'nav.work':'Proyectos',
      'nav.contact':'Contacto',
      'hero.title':'Soy Santiago Bracamonte',
      'hero.cv':'Descargar CV',
      'about.title':'Sobre mí',
      'about.p1':'Estudiante de Analista de Sistemas con una fuerte pasión por el desarrollo de software. Busco aplicar mis habilidades técnicas en un rol de desarrollador. Mi experiencia corporativa actual en optimización de procesos y análisis de datos me da un enfoque único para resolver problemas empresariales con tecnología.',
      'about.p2':'Siempre busco expandir mis conocimientos y mejorar mis habilidades técnicas. Recientemente realicé cursos en línea como "SQL for Data Science" y "Technical Support Fundamentals" en Coursera para mantenerme actualizado con las últimas tendencias de la industria.',
      'about.p3':'Mi competencia técnica abarca una amplia gama de lenguajes de programación y herramientas. Tengo experiencia con frameworks como Laravel y experiencia sólida tanto en Visual Studio como en entornos Linux, lo que me permite abordar cualquier proyecto con un enfoque versátil.',
      'hero.skills':'Desarrollador Web,Diseñador Web,FullStack Developer',
      'services.title':'Servicios',
      'services.subtitle':'Soluciones de alta calidad para cubrir tus necesidades tecnológicas.',
      'services.webdesign':'Diseño Web',
      'services.webdesign.desc':'Diseños web atractivos y fáciles de usar que refuerzan la identidad de tu marca.',
      'services.webdev':'Desarrollo Web',
      'services.webdev.desc':'Desarrollo a medida con PHP, Java, MySQL y PostgreSQL para sitios responsivos y dinámicos.',
      'services.techsupport':'Soporte Técnico',
      'services.techsupport.desc':'Soporte, mantenimiento y resolución de incidencias para asegurar operaciones eficientes.',
      'services.responsive':'Diseño Responsive',
      'services.responsive.desc':'Sitios que se adaptan a cualquier dispositivo para una experiencia óptima.',
      'services.db':'Gestión de Bases de Datos',
      'services.db.desc':'Diseño y optimización de bases de datos con MySQL y PostgreSQL.',
      'services.custom':'Desarrollo de Software a Medida',
      'services.custom.desc':'Soluciones a medida en Java, PHP y Laravel según las necesidades del negocio.',
      'projects.title':'Proyectos',
      'projects.subtitle':'Algunos de mis proyectos disponibles en GitHub.',
      'projects.screenshots':'Ver Capturas',
      'projects.jumbox.title':'Jumbox - Sistema de Inventario',
      'projects.jumbox.desc':'Aplicación de escritorio para gestión completa de inventario con seguimiento en tiempo real y reportes.',
      'projects.storemanager.title':'StoreManager',
      'projects.storemanager.desc':'Sistema completo de gestión de tienda con administración de usuarios, catálogo de productos y seguimiento de ventas.',
      'projects.blackjack.title':'Juego de Blackjack',
      'projects.blackjack.desc':'Juego de cartas interactivo con interfaz gráfica, lógica de juego y soporte multijugador.',
      'projects.soccer.title':'Torneo de Fútbol',
      'projects.soccer.desc':'Sistema de gestión de torneos con seguimiento de equipos, programación de partidos y estadísticas.',
      'projects.hospital.title':'App de Gestión Hospitalaria',
      'projects.hospital.desc':'Aplicación móvil para gestión de pacientes, citas y registros médicos con interfaz intuitiva.',
      'projects.portfolio.title':'Portfolio Personal',
      'projects.portfolio.desc':'Sitio web de portfolio responsivo que muestra proyectos y habilidades con diseño moderno y animaciones.',
      'counters.works':'TRABAJOS COMPLETADOS',
      'counters.years':'AÑOS DE EXPERIENCIA',
      'counters.clients':'CLIENTES',
      'contact.send':'Enviar Mensaje',
      'contact.get':'Ponte en Contacto',
      'contact.p':'Contáctame si tienes preguntas o ideas para colaborar. Gracias por visitar mi Portfolio.',
      'form.name':'Tu nombre',
      'form.email':'Tu email',
      'form.subject':'Asunto',
      'form.message':'Mensaje',
      'form.send':'Enviar Mensaje',
      'form.error.name':'Por favor ingresa tu nombre (mínimo 2 caracteres).',
      'form.error.email':'Por favor ingresa un email válido.',
      'form.error.subject':'Por favor ingresa un asunto (mínimo 2 caracteres).',
      'form.error.message':'Por favor ingresa un mensaje (mínimo 10 caracteres).',
      'form.success':'✓ ¡Mensaje enviado con éxito!',
      'form.error.generic':'✗ Error al enviar el mensaje. Por favor intenta de nuevo.',
      'form.error.timeout':'✓ La solicitud tardó demasiado. Por favor intenta de nuevo.',
      'form.error.network':'✓ Error de red. Verifica tu conexión.'
    },
    en: {
      'nav.home':'Home',
      'nav.about':'About me',
      'nav.services':'Services',
      'nav.work':'Work',
      'nav.contact':'Contact',
      'hero.title':'I am Santiago Bracamonte',
      'hero.cv':'Download CV',
      'hero.skills':'Web Developer,Web Designer,FullStack Developer',
      'about.title':'About me',
      'about.p1':'Advanced Systems Analyst student with a strong passion for software development. I am looking to apply my technical skills in a developer role. My current corporate experience in process optimization and data analysis gives me a unique approach to solving business problems with technology.',
      'about.p2':'I am always looking to expand my knowledge and enhance my technical abilities. Recently, I have completed several online courses, including "SQL for Data Science" and "Technical Support Fundamentals" on Coursera, to further improve my skills and keep up with the latest industry trends.',
      'about.p3':'My technical proficiency spans a wide range of programming languages and tools. I am skilled in frameworks such as Laravel and have solid experience with both Visual Studio and Linux environments, ensuring I can tackle any project with a versatile approach.',
      'services.title':'Services',
      'services.subtitle':'High-quality solutions to meet your technological needs.',
      'services.webdesign':'Web Design',
      'services.webdesign.desc':'User-friendly and visually appealing website designs that align with your brand\'s identity and enhance user experience.',
      'services.webdev':'Web Development',
      'services.webdev.desc':'I offer custom web development services using technologies such as PHP, Java, MySQL, and PostgreSQL to build responsive and dynamic websites.',
      'services.techsupport':'Technical Support',
      'services.techsupport.desc':'Providing troubleshooting, maintenance, and technical support for a variety of systems and software, ensuring smooth and efficient operations.',
      'services.responsive':'Responsive Design',
      'services.responsive.desc':'Designing websites that adapt seamlessly to any device, ensuring an optimal viewing experience across smartphones, tablets, and desktops.',
      'services.db':'Database Management',
      'services.db.desc':'Expertise in database design, optimization and management with tools such as MySQL and PostgreSQL to ensure data integrity and performance.',
      'services.custom':'Custom Software Development',
      'services.custom.desc':'Focus on developing custom software solutions using Java, PHP and Laravel, tailored to your business needs.',
      'projects.title':'Projects',
      'projects.subtitle':'Some of my projects available on GitHub.',
      'projects.screenshots':'View Screenshots',
      'projects.jumbox.title':'Jumbox - Inventory System',
      'projects.jumbox.desc':'Desktop application for complete inventory management with real-time tracking and reporting.',
      'projects.storemanager.title':'StoreManager',
      'projects.storemanager.desc':'Complete store management system with user administration, product catalog and sales tracking.',
      'projects.blackjack.title':'Blackjack Game',
      'projects.blackjack.desc':'Interactive card game with graphical interface, game logic and multiplayer support.',
      'projects.soccer.title':'Soccer Tournament',
      'projects.soccer.desc':'Tournament management system with team tracking, match scheduling and statistics.',
      'projects.hospital.title':'Hospital Management App',
      'projects.hospital.desc':'Mobile app for patient management, appointments and medical records with intuitive interface.',
      'projects.portfolio.title':'Personal Portfolio',
      'projects.portfolio.desc':'Responsive portfolio website showcasing projects and skills with modern design and animations.',
      'contact.send':'Send Message',
      'contact.get':'Get in Touch',
      'contact.p':'Feel free to contact me if you have any questions, ideas for collaboration or if you just want to say hello, thank you very much for visiting my Portfolio.',
      'form.name':'Your Name',
      'form.email':'Your Email',
      'form.subject':'Subject',
      'form.message':'Message',
      'form.send':'Send Message',
      'counters.works':'WORKS COMPLETED',
      'counters.years':'YEARS OF EXPERIENCE',
      'counters.clients':'TOTAL CLIENTS',
      'form.error.name':'Please enter your name (min 2 characters).',
      'form.error.email':'Please enter a valid email address.',
      'form.error.subject':'Please enter a subject (min 2 characters).',
      'form.error.message':'Please enter a message (min 10 characters).',
      'form.success':'✓ Message sent successfully!',
      'form.error.generic':'✗ Error sending message. Please try again.',
      'form.error.timeout':'✗ Request timed out. Please try again.',
      'form.error.network':'✗ Network error. Check your connection.'
    }
  };

  function updateDocumentLanguage(lang) {
    document.documentElement.setAttribute('lang', lang === 'es' ? 'es' : 'en');
    var toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.setAttribute('data-current-lang', lang);
      toggle.setAttribute('aria-label', lang === 'es'
        ? 'Cambiar idioma. Idioma actual: Español'
        : 'Change language. Current language: English');
    }
  }

  function applyLang(lang){
    var dict = translations[lang] || {};
    window.i18n = dict; // Expose for contact-config.js
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      var key = el.getAttribute('data-i18n-placeholder');

      // En campos con floating label el placeholder debe quedar " " para no duplicar texto.
      if (el.closest('.floating-label')) {
        el.setAttribute('placeholder', ' ');
        return;
      }

      if(dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    // Update floating labels
    document.querySelectorAll('.floating-label label[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
    // Update typed.js
    var skillsKey = dict['hero.skills'];
    if(skillsKey){
      var sliderItems = document.querySelector('.text-slider-items');
      if(sliderItems){
        sliderItems.textContent = skillsKey;
        if (typeof window.initHeroTyped === 'function') {
          window.initHeroTyped(sliderItems.textContent);
        } else if(typeof Typed !== 'undefined'){
          // Fallback por si main.js todavia no registro el helper.
          try{
            if (window._typedInstance && typeof window._typedInstance.destroy === 'function') {
              try { window._typedInstance.destroy(); } catch(e) { /* ignore */ }
              window._typedInstance = null;
            }
            window._typedInstance = new Typed('.text-slider', {
              strings: sliderItems.textContent.split(','),
              typeSpeed: 80,
              loop: true,
              backDelay: 1100,
              backSpeed: 30,
              cursorChar: '|',
              smartBackspace: true
            });
          }catch(e){/* ignore typed init errors */}
        }
      }
    }
    updateDocumentLanguage(lang);
    localStorage.setItem('siteLang', lang);
  }

  document.addEventListener('DOMContentLoaded', function(){
    var saved = localStorage.getItem('siteLang') || 'en';
    applyLang(saved);

    var btn = document.getElementById('langToggle');
    if(btn){
      btn.addEventListener('click', function(){
        var current = localStorage.getItem('siteLang') || 'en';
        var next = (current === 'es') ? 'en' : 'es';
        applyLang(next);
      });
    }
  });
})();
