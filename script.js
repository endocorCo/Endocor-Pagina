/* ======================================================
   ENDOCOR — Premium Digital Studio
   script.js
====================================================== */

'use strict';

/* ---- Loader ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
  }, 1900);
});

/* ---- Custom Cursor ---- */
const cDot  = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cDot.style.left = mx + 'px';
  cDot.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cRing.style.left = rx + 'px';
  cRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .srv-card, .why-item, .port-card, .philosophy-item').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cDot.classList.add('big');
    cRing.classList.add('big');
  });
  el.addEventListener('mouseleave', () => {
    cDot.classList.remove('big');
    cRing.classList.remove('big');
  });
});

/* ---- Nav scroll state ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Ticker ---- */
const tickerItems = [
  'Diseño Web', 'Landing Pages', 'Presencia Digital',
  'SEO', 'Hosting', 'Mantenimiento', 'UI / UX', 'Experiencia Responsive'
];
const tickerTrack = document.getElementById('tickerTrack');

[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].forEach((text) => {
  const item = document.createElement('div');
  item.className = 'ticker-item';
  item.innerHTML = `<span class="ticker-dot"></span>${text}`;
  tickerTrack.appendChild(item);
});

/* ---- Hero Canvas — light theme particle system ---- */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const GRID   = 96;
const PCOUNT = 44;
const pts    = [];

class Particle {
  constructor() { this.init(); }

  init() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.sz = Math.random() * 0.9 + 0.2;
    this.vx = (Math.random() - 0.5) * 0.18;
    this.vy = (Math.random() - 0.5) * 0.18;
    this.op = Math.random() * 0.18 + 0.04;
    const r = Math.random();
    this.type = r > 0.7 ? 'navy' : r > 0.5 ? 'sage' : 'neutral';
  }

  step() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  }

  draw() {
    const colors = {
      sage:    `rgba(141, 166, 122, ${this.op})`,
      navy:    `rgba(47,  62,  70,  ${this.op * 0.6})`,
      neutral: `rgba(91,  102, 112, ${this.op * 0.4})`
    };
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
    ctx.fillStyle = colors[this.type];
    ctx.fill();
  }
}

for (let i = 0; i < PCOUNT; i++) pts.push(new Particle());

function drawGrid() {
  ctx.strokeStyle = 'rgba(47, 62, 70, 0.055)';
  ctx.lineWidth   = 0.5;
  for (let x = 0; x < W; x += GRID) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += GRID) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function drawLinks() {
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(141, 166, 122, ${(1 - d / 110) * 0.05})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
}

(function loop() {
  ctx.clearRect(0, 0, W, H); /* transparent — white body bg shows through */
  drawGrid();
  pts.forEach((p) => { p.step(); p.draw(); });
  drawLinks();
  requestAnimationFrame(loop);
})();

/* ---- Scroll Reveal ---- */
const revEls = document.querySelectorAll('.rev');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revEls.forEach((el) => revObs.observe(el));

/* ---- Portfolio ----
   To add a project: add an object to the array below.
   Set url to the live site URL.
   Leave url empty ('') to show a placeholder slot.
-------------------------------------------------------- */
const projects = [
  {
    title:    'MARARE',
    category: 'E-Commerce de Lujo',
    url:      '',        /* ← paste live URL here, e.g. 'https://marare.mx' */
    desc:     'Joyería de lujo inspirada en el mar'
  },
  {
    title:    'Nurse Station',
    category: 'Servicios de Salud',
    url:      '',        /* ← paste live URL here */
    desc:     'Agencia de enfermería domiciliaria en Mazatlán'
  },
  {
    title:    'Próximo Proyecto',
    category: 'Tu Marca Aquí',
    url:      '',
    desc:     'Espacio reservado para proyecto futuro'
  },
  {
    title:    'Próximo Proyecto',
    category: 'Tu Marca Aquí',
    url:      '',
    desc:     'Espacio reservado para proyecto futuro'
  }
];

const portGrid = document.getElementById('portGrid');

projects.forEach((proj, i) => {
  const delayClass = i % 2 === 0 ? 'd1' : 'd2';

  /* — Placeholder card (no URL) — */
  if (!proj.url) {
    const ph = document.createElement('div');
    ph.className = `port-add rev ${delayClass}`;
    ph.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
           stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <line x1="11" y1="4" x2="11" y2="18"/>
        <line x1="4"  y1="11" x2="18" y2="11"/>
      </svg>
      <div style="text-align:center">
        <div style="font-family:var(--font-d);font-size:.56rem;letter-spacing:.3em;
                    text-transform:uppercase;margin-bottom:5px;color:var(--petrol)">
          ${proj.title}
        </div>
        <div style="color:var(--sage);font-size:.53rem;letter-spacing:.24em;text-transform:uppercase">
          ${proj.category}
        </div>
      </div>`;
    portGrid.appendChild(ph);
    revObs.observe(ph);
    return;
  }

  /* — Real project card — */
  const uid  = `port-ph-${i}`;
  const card = document.createElement('div');
  card.className = `port-card rev ${delayClass}`;
  card.innerHTML = `
    <div class="port-iframe-wrap">
      <iframe
        src="${proj.url}"
        title="${proj.title}"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin">
      </iframe>
    </div>
    <div class="port-ph" id="${uid}" style="display:none">
      <div class="port-ph-ring">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
             stroke="currentColor" stroke-width="1.4">
          <circle cx="9" cy="9" r="6.5"/>
          <line x1="2.5" y1="9" x2="15.5" y2="9"/>
          <path d="M9 2.5a11 11 0 010 13M9 2.5a11 11 0 000 13"/>
        </svg>
      </div>
      <div class="port-ph-url">${proj.url.replace(/https?:\/\//, '')}</div>
    </div>
    <div class="port-overlay">
      <div class="port-cat">${proj.category}</div>
      <div class="port-name">${proj.title}</div>
      <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="port-link">
        Visitar Sitio
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M2 7h10M8.5 3.5l3.5 3.5-3.5 3.5"/>
        </svg>
      </a>
    </div>`;

  /* Fallback: show placeholder if iframe is blocked or empty */
  const iframe = card.querySelector('iframe');

  function showPlaceholder() {
    const wrap = card.querySelector('.port-iframe-wrap');
    const ph   = card.querySelector(`#${uid}`);
    if (wrap) wrap.style.display = 'none';
    if (ph)   ph.style.display   = 'flex';
  }

  iframe.addEventListener('error', showPlaceholder);

  /* Cross-origin sites block iframe access — we can't detect load failure directly.
     After 3.5 s, try reading the document; if we get an empty body it probably failed. */
  setTimeout(() => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc || !doc.body || doc.body.innerHTML === '') showPlaceholder();
    } catch (e) {
      /* SecurityError means cross-origin loaded fine — do nothing */
    }
  }, 3500);

  portGrid.appendChild(card);
  revObs.observe(card);
});

/* ---- Mobile Navigation ---- */
const navHam = document.getElementById('navHam');
const navLinks = document.querySelector('.nav-links');
let mobileNavOpen = false;

navHam.addEventListener('click', () => {
  mobileNavOpen = !mobileNavOpen;
  navLinks.style.cssText = mobileNavOpen
    ? `display:flex; flex-direction:column; position:fixed; top:0; left:0; right:0; bottom:0;
       background:rgba(248,250,252,0.97); align-items:center; justify-content:center;
       gap:30px; z-index:999;`
    : 'display:none';
});

navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mobileNavOpen = false;
    navLinks.style.cssText = 'display:none';
  });
});
