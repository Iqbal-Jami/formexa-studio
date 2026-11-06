import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ───────── Smooth scroll ───────── */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = id === '#top' ? 0 : $(id);
    if (target === null || target === undefined) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else (target === 0 ? window.scrollTo(0, 0) : target.scrollIntoView());
  });
});

/* ───────── Mobile menu ───────── */
const burger = $('[data-burger]');
const menu = $('[data-menu]');
function closeMenu() {
  if (!menu || !menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Open menu');
  lenis && lenis.start();
}
burger?.addEventListener('click', () => {
  const open = !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (lenis) open ? lenis.stop() : lenis.start();
});
addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* ───────── Nav: hide on scroll down, scroll progress, active link ───────── */
const nav = $('[data-nav]');
let lastY = 0;
ScrollTrigger.create({
  onUpdate(self) {
    const y = self.scroll();
    nav?.classList.toggle('is-hidden', y > 160 && self.direction === 1 && y > lastY + 4);
    if (self.direction === -1) nav?.classList.remove('is-hidden');
    lastY = y;
  },
});
const bar = $('[data-progress]');
if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
$$('[data-nav-link]').forEach((link) => {
  const sec = $(link.getAttribute('href'));
  if (!sec) return;
  ScrollTrigger.create({
    trigger: sec,
    start: 'top 55%',
    end: 'bottom 55%',
    onToggle: (self) => link.classList.toggle('is-active', self.isActive),
  });
});

/* ───────── Custom cursor + magnetic buttons ───────── */
const cursor = $('[data-cursor]');
let mx = innerWidth / 2;
let my = innerHeight / 2;
let moved = false;
addEventListener('pointermove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  moved = true;
}, { passive: true });
document.addEventListener('pointerleave', () => (moved = false));

if (fine && !reduce && cursor) {
  document.body.classList.add('has-cursor');
  const cx = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3' });
  const cy = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3' });
  addEventListener('pointermove', (e) => { cx(e.clientX); cy(e.clientY); }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    cursor.classList.toggle('is-big', !!e.target.closest('a, button, input, select, textarea, [data-row]'));
  });
}

if (fine && !reduce) {
  $$('[data-magnetic]').forEach((el) => {
    const qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.28);
      qy((e.clientY - (r.top + r.height / 2)) * 0.36);
    });
    el.addEventListener('pointerleave', () => { qx(0); qy(0); });
  });
}

/* ───────── Variable-font letters that react to the cursor ───────── */
// Each glyph's weight and width are driven by distance to the pointer.
// Without a pointer (touch, or before it moves) a slow wave runs through the type instead.
const letterCfg = {
  'hero__title': { base: [520, 86], peak: [800, 100], radius: 2.2, wave: true },
  'contact__title': { base: [560, 88], peak: [800, 100], radius: 2.4, wave: false },
  'footer__word': { base: [800, 78], peak: [300, 100], radius: 1.8, wave: false },
};
const groups = $$('[data-letters]').map((el) => {
  const key = Object.keys(letterCfg).find((k) => el.classList.contains(k));
  const cfg = letterCfg[key] || letterCfg.hero__title;
  const chars = $$('[data-ch]', el).map((c, i) => ({ c, i, w: cfg.base[0], x: cfg.base[1] }));
  chars.forEach((o) => { o.c.style.setProperty('--w', cfg.base[0]); o.c.style.setProperty('--x', cfg.base[1]); });
  return { el, cfg, chars, visible: false };
});
if (!reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const g = groups.find((x) => x.el === en.target);
      if (g) g.visible = en.isIntersecting;
    });
  }, { rootMargin: '100px' });
  groups.forEach((g) => io.observe(g.el));

  gsap.ticker.add((time) => {
    for (const g of groups) {
      if (!g.visible) continue;
      const { cfg, chars } = g;
      for (const o of chars) {
        const r = o.c.getBoundingClientRect();
        let k = 0;
        if (moved && fine) {
          const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
          k = Math.pow(clamp(1 - d / (r.height * cfg.radius), 0, 1), 1.6);
        } else if (cfg.wave) {
          k = (Math.sin(time * 1.4 - o.i * 0.55) + 1) / 2;
        }
        const tw = cfg.base[0] + (cfg.peak[0] - cfg.base[0]) * k;
        const tx = cfg.base[1] + (cfg.peak[1] - cfg.base[1]) * k;
        o.w += (tw - o.w) * 0.14;
        o.x += (tx - o.x) * 0.14;
        o.c.style.setProperty('--w', o.w.toFixed(1));
        o.c.style.setProperty('--x', o.x.toFixed(1));
      }
    }
  });
}

/* ───────── Hero: spotlight + blob parallax ───────── */
const hero = $('[data-hero]');
const spot = $('[data-spot]');
if (hero && spot && fine && !reduce) {
  const sx = gsap.quickTo(spot, 'x', { duration: 0.9, ease: 'power3' });
  const sy = gsap.quickTo(spot, 'y', { duration: 0.9, ease: 'power3' });
  const ba = gsap.quickTo('.blob--a', 'x', { duration: 1.6, ease: 'power3' });
  const bb = gsap.quickTo('.blob--b', 'x', { duration: 1.6, ease: 'power3' });
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.opacity = 1;
    sx(e.clientX - r.left); sy(e.clientY - r.top);
    ba((e.clientX / innerWidth - 0.5) * -60);
    bb((e.clientX / innerWidth - 0.5) * 80);
  });
  hero.addEventListener('pointerleave', () => (spot.style.opacity = 0));
  gsap.to('.blob--a', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
}

/* ───────── Loader → orchestrated hero entrance ───────── */
const loader = $('[data-loader]');
function intro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to('.hero [data-ch]', { yPercent: 0, duration: 1.3, stagger: { each: 0.028, from: 'start' } }, 0)
    .to('.blob', { scale: 1, opacity: 1, duration: 1.8 }, 0)
    .to('[data-reveal-hero]', { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.35);
}
if (loader && !reduce) {
  lenis && lenis.stop();
  gsap.set('.hero [data-ch]', { yPercent: 125 });
  gsap.set('[data-reveal-hero]', { opacity: 0, y: 26 });
  gsap.set('.blob', { scale: 0.6, opacity: 0 });
  const counter = $('[data-count-load]');
  const o = { v: 0 };
  gsap.timeline()
    .to(o, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => (counter.textContent = Math.round(o.v)) })
    .to('.loader__word', { scale: 1.06, duration: 1.5, ease: 'power2.inOut' }, 0)
    .to(loader, { yPercent: -100, duration: 1, ease: 'power4.inOut', onStart: intro }, '+=0.1')
    .set(loader, { display: 'none' })
    .add(() => lenis && lenis.start());
} else if (loader) {
  loader.remove();
}

/* ───────── Split headlines into masked words ───────── */
$$('[data-split]').forEach((el) => {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  text.split(/\s+/).forEach((word, i, arr) => {
    const w = document.createElement('span');
    w.className = 'w';
    w.setAttribute('aria-hidden', 'true');
    const wi = document.createElement('span');
    wi.className = 'wi';
    wi.textContent = word;
    w.appendChild(wi);
    el.appendChild(w);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
  });
  if (reduce) return;
  gsap.from($$('.wi', el), {
    yPercent: 115,
    rotate: 4,
    duration: 1.1,
    ease: 'expo.out',
    stagger: 0.06,
    scrollTrigger: { trigger: el, start: 'top 88%' },
  });
});

/* Contact + footer letters rise in on scroll */
if (!reduce) {
  ['.contact__title', '.footer__word'].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    gsap.from($$('[data-ch]', el), {
      yPercent: 120,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.018,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/* ───────── Marquees: speed up with scroll, reverse when you scroll back up ───────── */
// Position is advanced by hand (not a GSAP tween) so the direction can flip at any moment without
// a repeating tween getting stuck at time 0.
const marquees = $$('[data-marquee]').map((track) => ({
  track,
  half: 0,
  x: 0,
  dir: track.dataset.dir === 'right' ? 1 : -1,
  speed: Number(track.dataset.speed) || 80,
  visible: true,
}));
if (marquees.length && !reduce) {
  const measure = () => marquees.forEach((m) => {
    m.half = m.track.scrollWidth / 2;
    if (m.dir === 1 && m.x === 0) m.x = -m.half;
  });
  document.fonts.ready.then(measure);
  addEventListener('resize', measure);

  const mio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const m = marquees.find((o) => o.track.parentElement === en.target);
      if (m) m.visible = en.isIntersecting;
    });
  }, { rootMargin: '200px' });
  marquees.forEach((m) => mio.observe(m.track.parentElement));

  let lastY = scrollY;
  let vel = 0;
  let flow = 1;
  gsap.ticker.add((time, deltaTime) => {
    const dt = Math.min(deltaTime, 50) / 1000;
    if (!dt) return;
    vel += (((scrollY - lastY) / dt) - vel) * 0.12;
    lastY = scrollY;
    // 1 when idle; larger when scrolling down, negative when scrolling up
    flow += ((1 + clamp(vel / 320, -8, 8)) - flow) * 0.08;
    for (const m of marquees) {
      if (!m.visible || !m.half) continue;
      m.x += m.dir * m.speed * flow * dt;
      if (m.x <= -m.half) m.x += m.half;
      if (m.x > 0) m.x -= m.half;
      m.track.style.transform = `translate3d(${m.x.toFixed(1)}px,0,0)`;
    }
  });
}

/* ───────── Responsive scroll scenes ───────── */
const mm = gsap.matchMedia();

// Stacked cards (Solutions, Why Formexa, any .stack): each card shrinks back as the next slides over it.
// Scoped per .stack so one section's last card isn't driven by the next section's first card.
mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
  $$('.stack').forEach((stack) => {
    const cards = $$('[data-card]', stack);
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.fromTo(card, { scale: 1, filter: 'brightness(1)' }, {
        scale: 0.93,
        filter: 'brightness(0.9)',
        ease: 'none',
        // measured after any pinned sections above, so pin spacing is included
        scrollTrigger: { trigger: next, start: 'top 82%', end: 'top 14%', scrub: true, refreshPriority: -1 },
      });
    });
  });
});

// Industries: pinned horizontal journey.
mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
  const section = $('[data-industries]');
  const trackEl = $('[data-track]');
  const meter = $('[data-meter]');
  if (!section || !trackEl) return;
  const dist = () => trackEl.scrollWidth - innerWidth;
  const tween = gsap.to(trackEl, {
    x: () => -dist(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + dist(),
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => meter && gsap.set(meter, { scaleX: self.progress }),
    },
  });
  $$('[data-panel]').forEach((panel) => {
    const big = $('.panel__big', panel);
    gsap.fromTo(big, { xPercent: 8 }, {
      xPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
    });
  });
});


/* ───────── Industries list: rows rise in once (hover itself is pure CSS) ───────── */
const indRows = $$('[data-ind-row]');
if (indRows.length && !reduce) {
  gsap.fromTo(indRows, { opacity: 0, y: 24 }, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'expo.out',
    stagger: 0.08,
    clearProps: 'transform',
    scrollTrigger: { trigger: '[data-ind-list]', start: 'top 85%', once: true },
  });
}

/* ───────── Process: rail fills, steps light up ───────── */
const steps = $$('[data-step]');
if (steps.length) {
  const rail = $('[data-rail]');
  if (!reduce && rail) {
    gsap.to(rail, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 60%', end: 'bottom 70%', scrub: true } });
  }
  steps.forEach((step) => {
    if (reduce) return step.classList.add('is-on');
    ScrollTrigger.create({
      trigger: step,
      start: 'top 62%',
      onEnter: () => step.classList.add('is-on'),
      onLeaveBack: () => step.classList.remove('is-on'),
    });
  });
}

/* ───────── Work: hover preview follows the cursor ───────── */
const peek = $('[data-peek]');
if (peek && fine && !reduce) {
  const label = $('[data-peek-label]', peek);
  const px = gsap.quickTo(peek, 'x', { duration: 0.6, ease: 'power3' });
  const py = gsap.quickTo(peek, 'y', { duration: 0.6, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    px(e.clientX + 36);
    py(e.clientY - peek.offsetHeight / 2);
  }, { passive: true });
  $$('[data-row]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      peek.style.setProperty('--a', row.style.getPropertyValue('--a'));
      peek.style.setProperty('--b', row.style.getPropertyValue('--b'));
      peek.style.color = row.style.getPropertyValue('--fg');
      label.textContent = $('.work__name', row).textContent;
      peek.classList.add('is-on');
    });
    row.addEventListener('pointerleave', () => peek.classList.remove('is-on'));
  });
}

/* ───────── Pricing: numbers count up ───────── */
$$('[data-count]').forEach((el) => {
  const target = Number(el.dataset.count);
  if (reduce) return;
  el.textContent = '0';
  const o = { v: 0 };
  gsap.to(o, {
    v: target,
    duration: 1.6,
    ease: 'expo.out',
    onUpdate: () => (el.textContent = Math.round(o.v)),
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
  });
});

/* ───────── Solutions list: one open at a time ───────── */
const sols = $$('[data-sol]');
function setSol(sol, open) {
  sol.classList.toggle('is-open', open);
  $('.sol__btn', sol).setAttribute('aria-expanded', String(open));
}
sols.forEach((sol) => {
  $('.sol__btn', sol).addEventListener('click', () => {
    const open = !sol.classList.contains('is-open');
    sols.forEach((o) => setSol(o, false));
    setSol(sol, open);
    setTimeout(() => ScrollTrigger.refresh(), 750);
    if (open && lenis) {
      // keep the opened row in view when the rows above it have just collapsed
      setTimeout(() => {
        const r = sol.getBoundingClientRect();
        if (r.top < 90 || r.top > innerHeight * 0.6) lenis.scrollTo(sol, { offset: -110, duration: 1 });
      }, 120);
    }
  });
});

/* ───────── FAQ accordion ───────── */
const qas = $$('[data-qa]');
function setQa(qa, open) {
  qa.classList.toggle('is-open', open);
  $('.qa__q', qa).setAttribute('aria-expanded', String(open));
}
qas.forEach((qa) => {
  $('.qa__q', qa).addEventListener('click', () => {
    const open = !qa.classList.contains('is-open');
    qas.forEach((o) => setQa(o, false));
    setQa(qa, open);
    setTimeout(() => ScrollTrigger.refresh(), 650);
  });
});
if (qas[0]) setQa(qas[0], true);

/* ───────── Contact form (opens the visitor's email app) ───────── */
const form = $('[data-form]');
if (form) {
  const err = $('[data-error]', form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const bad = [];
    if (!d.name?.trim()) bad.push('name');
    if (!/^\S+@\S+\.\S+$/.test(d.email || '')) bad.push('email');
    if (!d.message?.trim()) bad.push('message');
    $$('.field', form).forEach((f) => {
      const input = $('input, textarea', f);
      f.classList.toggle('is-bad', !!input && bad.includes(input.name));
    });
    if (bad.length) {
      err.hidden = false;
      err.textContent = 'Please check your ' + bad.join(', ') + ' and try again.';
      return;
    }
    err.hidden = true;
    const subject = encodeURIComponent('New project enquiry from ' + d.name);
    const body = encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nBusiness: ${d.type}\n\n${d.message}`);
    location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;
  });
}

/* ───────── Refresh once everything has settled ───────── */
addEventListener('load', () => ScrollTrigger.refresh());
document.fonts.ready.then(() => ScrollTrigger.refresh());
