// i18n.js
// Simple client-side toggle between English and Spanish using data-i18n attributes
(function(){
  'use strict';

  const translations = {
    es: {
      'nav.home':'Inicio',
      'nav.about':'Sobre mí',
      'nav.services':'Servicios',
      'nav.work':'Proyectos',
      'nav.contact':'Contacto',
      'hero.title':'Soy Santiago Bracamonte',
      'hero.cv':'Descargar CV',
      'about.title':'Sobre mí',
      'about.p1':'Soy responsable, dinámico y creativo, con capacidad para adaptarme y colaborar en equipo bajo presión. Tengo iniciativa para resolver problemas y enfoque en la mejora continua para contribuir al éxito de los proyectos tecnológicos.',
      'about.p2':'Siempre busco expandir mis conocimientos y mejorar mis habilidades técnicas. Recientemente realicé cursos en línea como "SQL for Data Science" y "Technical Support Fundamentals" en Coursera para profundizar en análisis de datos y soporte técnico.',
  'about.p3':'Mi experiencia técnica abarca HTML5, CSS, Bootstrap, así como conocimientos intermedios en Java, PHP y MySQL. También trabajo con Laravel, Visual Studio y entornos Linux. Manejo Microsoft Office y Adobe Photoshop.',
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
      'form.send':'Enviar Mensaje'
    }
    ,
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
      'about.p1':'I am responsible, dynamic and creative, with the ability to adapt and collaborate in a team under pressure. I have the initiative to solve problems effectively, and my focus on continuous improvement contributes to the success of technology projects and the achievement of business goals.',
      'about.p2':'I am always looking to expand my knowledge and enhance my technical abilities. Recently, I have completed several online courses, including \"SQL for Data Science\" and \"Technical Support Fundamentals\" on Coursera, to further improve my skills and keep up with the latest industry trends.',
      'about.p3':'My technical proficiency spans a wide range of programming languages and tools, including advanced knowledge of HTML5, CSS, and Bootstrap, as well as intermediate experience with Java, PHP, and MySQL. I am also skilled in frameworks such as Laravel and have solid experience with both Visual Studio and Linux environments.',
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
      'counters.clients':'TOTAL CLIENTS'
    }
  };

  function applyLang(lang){
    const dict = translations[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if(dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    // update typed.js items if present
    const skillsKey = dict['hero.skills'];
    if(skillsKey){
      const sliderItems = document.querySelector('.text-slider-items');
      if(sliderItems){
        sliderItems.textContent = skillsKey;
        // re-init Typed if available
        if(typeof Typed !== 'undefined'){
          // destroy previous typed (if any) by replacing node
          const old = document.querySelector('.text-slider');
          if(old){
            old.innerHTML = '';
          }
          try{
            // Destroy previous instance if exists to avoid stacking timers (prevents acceleration bug)
            if (window._typedInstance && typeof window._typedInstance.destroy === 'function') {
              try { window._typedInstance.destroy(); } catch(e) { /* ignore */ }
              window._typedInstance = null;
            }
            window._typedInstance = new Typed('.text-slider', {
              strings: sliderItems.textContent.split(','),
              typeSpeed: 80,
              loop: true,
              backDelay: 1100,
              backSpeed: 30
            });
          }catch(e){/* ignore typed init errors */}
        }
      }
    }
    const btn = document.getElementById('langToggle');
    if(btn) btn.textContent = (lang === 'es') ? 'EN' : 'ES';
    localStorage.setItem('siteLang', lang);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const saved = localStorage.getItem('siteLang') || 'en';
    applyLang(saved);

    const btn = document.getElementById('langToggle');
    if(btn){
      btn.addEventListener('click', ()=>{
        const current = localStorage.getItem('siteLang') || 'en';
        const next = (current === 'es') ? 'en' : 'es';
        applyLang(next);
      });
    }
  });
})();
