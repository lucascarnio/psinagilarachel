
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

// Active link on scroll (IntersectionObserver)
(function(){
  const header = document.querySelector('.header');
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) return;

  const idToLink = new Map();
  links.forEach(link => {
    const hash = link.hash ? decodeURIComponent(link.hash.slice(1)) : '';
    if (hash) idToLink.set(hash, link);
  });

  const sections = Array.from(idToLink.keys())
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) {
    // Fallback: mark active on click
    links.forEach(l => l.addEventListener('click', () => setActive(l)));
    return;
  }

  let currentId = null;
  const setActive = (link) => {
    links.forEach(a => {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    });
    if (link){
      link.classList.add('active');
      link.setAttribute('aria-current','page');
    }
  };

  const observer = new IntersectionObserver((entries) => {
    // Pick the entry with highest intersection ratio among intersecting
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;
    visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
    const top = visible[0].target;
    const id = top.id;
    if (id && id !== currentId) {
      currentId = id;
      const link = idToLink.get(id);
      if (link) setActive(link);
    }
  }, {
    // Offset by sticky header height to account for viewport top
    root: null,
    rootMargin: (() => {
      const h = header ? header.offsetHeight : 0;
      return `-${h + 8}px 0px -60% 0px`;
    })(),
    threshold: [0.3, 0.5, 0.7]
  });

  sections.forEach(sec => observer.observe(sec));

  // Initialize based on current hash (if any)
  if (location.hash) {
    const link = idToLink.get(decodeURIComponent(location.hash.slice(1)));
    if (link) setActive(link);
  }
})();
