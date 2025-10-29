// Mobile menu toggle, responsive collapse, smooth scroll
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');
  const nav = document.querySelector('.header .nav');
  const brand = document.querySelector('.brand');

  if (toggle){
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show');
    });
  }

  // Collapse menu only when it doesn't fit
  const measureNeededWidth = () => {
    if (!nav || !navLinks) return 0;
    const clone = navLinks.cloneNode(true);
    clone.classList.remove('show');
    clone.style.cssText = 'position:absolute;visibility:hidden;display:flex;white-space:nowrap;gap:22px;';
    nav.appendChild(clone);
    const linksWidth = clone.scrollWidth;
    nav.removeChild(clone);
    const brandWidth = brand ? brand.offsetWidth : 0;
    const padding = 48;
    return brandWidth + linksWidth + padding;
  };

  const updateMenuMode = () => {
    if (!header || !nav || !navLinks) return;
    const available = nav.clientWidth;
    const needed = measureNeededWidth();
    const shouldCollapse = needed > available;
    header.classList.toggle('nav-collapsed', shouldCollapse);
    if (!shouldCollapse) {
      navLinks.classList.remove('show');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  };

  const debounce = (fn, delay=120) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), delay); }; };
  window.addEventListener('resize', debounce(updateMenuMode, 100));
  window.addEventListener('orientationchange', updateMenuMode);
  window.addEventListener('load', updateMenuMode);
  updateMenuMode();

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

  const sections = Array.from(idToLink.keys()).map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) {
    links.forEach(l => l.addEventListener('click', () => setActive(l)));
    return;
  }

  let currentId = null;
  const setActive = (link) => {
    links.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
    if (link){ link.classList.add('active'); link.setAttribute('aria-current','page'); }
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    if (!visible.length) return;
    visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
    const id = visible[0].target.id;
    if (id && id !== currentId) {
      currentId = id;
      const link = idToLink.get(id);
      if (link) setActive(link);
    }
  }, {
    root: null,
    rootMargin: (() => {
      const h = header ? header.offsetHeight : 0;
      return `-${h + 8}px 0px -60% 0px`;
    })(),
    threshold: [0.3, 0.5, 0.7]
  });

  sections.forEach(sec => observer.observe(sec));

  if (location.hash) {
    const link = idToLink.get(decodeURIComponent(location.hash.slice(1)));
    if (link) setActive(link);
  }
})();

