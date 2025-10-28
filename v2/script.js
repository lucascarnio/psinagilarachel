
// Mobile menu toggle and smooth scroll offset for header
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');

  if (toggle){
    toggle.addEventListener('click', ()=>{
      navLinks.classList.toggle('show');
    });
  }

  // Smooth scroll with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href.length>1){
        const target = document.querySelector(href);
        if (target){
          e.preventDefault();
          const offset = header ? header.offsetHeight + 12 : 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({top, behavior:'smooth'});
          navLinks.classList.remove('show');
        }
      }
    });
  });
})();
