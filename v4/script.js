// Scrollspy (highlights active menu item)
const sections = [...document.querySelectorAll('main section')];
const navLinks = [...document.querySelectorAll('.hero-nav a')];

const byId = id => document.getElementById(id);
const opts = { root:null, rootMargin:'-40% 0px -59% 0px', threshold:0 };

const io = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(a=>a.setAttribute('aria-current', String(a.getAttribute('href') === '#'+id)));
    }
  });
}, opts);

sections.forEach(s=>io.observe(s));

// Current year
document.getElementById('year').textContent = new Date().getFullYear();
