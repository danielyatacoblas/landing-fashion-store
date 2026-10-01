import { CATALOG, thumbSVG } from './catalog.js';
import { sb } from './supabase.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const fmt = (n) => n.toLocaleString('es-PE');

// ============ A/B HERO ============
// Variante A: título "Chaleco Qayt'u" (actual). B: título "Teñido con cochinilla".
const variant = Math.random() < 0.5 ? 'A' : 'B';
if (variant === 'B') {
  const t = $('#hero-title');
  if (t) t.innerHTML = `<em>Teñido con cochinilla</em> <span class="qu">en Chinchero</span>
    <span class="hero__sub">Alpaca pura · 46 horas de trabajo manual</span>`;
}
sb.abHero(variant, 'impression');

// ============ TALLA ============
const activeSize = $('[data-active-size]');
$$('input[name=size]').forEach((r) => r.addEventListener('change', (e) => {
  if (activeSize) activeSize.textContent = e.target.value;
}));

// ============ CATÁLOGO ============
const grid = $('[data-catalog]');
const count = $('[data-count]');

function renderCatalog(filter = 'all') {
  const items = CATALOG.filter((p) => {
    if (filter === 'all') return true;
    if (['A', 'B', 'C'].includes(filter)) return p.view === filter;
    return p.tags.includes(filter);
  });
  grid.innerHTML = items.map((p) => `
    <li class="card reveal" style="--d:${items.indexOf(p) * 40}ms">
      <div class="card__thumb">${thumbSVG(p.thumb.kind)}
        <span class="card__num">PIEZA ${p.num}</span>
        <span class="card__view" aria-label="Vista ${p.view}">${p.view}</span>
      </div>
      <div class="card__head">
        <h3 class="card__name">${p.name}</h3>
        <span class="card__price num">S/ ${fmt(p.price)}</span>
      </div>
      <p class="card__meta">${p.meta.map((m) => `<span>${m}</span>`).join('')}</p>
      <button class="card__add" data-add-bag data-sku="${p.sku}" data-name="${p.name}" data-price="${p.price}">
        Añadir al bolso
      </button>
    </li>
  `).join('');
  if (count) count.textContent = items.length;
}
renderCatalog();

$$('.chip').forEach((c) => c.addEventListener('click', (e) => {
  $$('.chip').forEach((x) => x.classList.remove('chip--on'));
  e.currentTarget.classList.add('chip--on');
  renderCatalog(e.currentTarget.dataset.filter);
}));

// ============ BAG ============
const BAG_KEY = 'qaytu:bag';
let bag = loadBag();

function loadBag() {
  try { return JSON.parse(localStorage.getItem(BAG_KEY) || '[]'); } catch { return []; }
}
function saveBag() {
  try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch {}
}

function renderBag() {
  const list = $('[data-bag-list]');
  const total = bag.reduce((s, i) => s + i.price * i.qty, 0);
  list.innerHTML = bag.map((i, idx) => `
    <li class="bag__item">
      <strong>${i.name}</strong>
      <span class="price num">S/ ${fmt(i.price * i.qty)}</span>
      <span class="meta">SKU ${i.sku} · talla ${i.size} · ×${i.qty}</span>
      <button data-remove="${idx}">Quitar</button>
    </li>
  `).join('');
  $('[data-bag-total]').textContent = fmt(total);
  $('[data-bag-count]').textContent = bag.reduce((s, i) => s + i.qty, 0);
  list.querySelectorAll('[data-remove]').forEach((b) =>
    b.addEventListener('click', () => {
      bag.splice(Number(b.dataset.remove), 1);
      saveBag(); renderBag();
    })
  );
}
renderBag();

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-add-bag]');
  if (!t) return;
  const size = ($('input[name=size]:checked') || {}).value || 'M';
  const sku = t.dataset.sku, name = t.dataset.name, price = Number(t.dataset.price);
  const existing = bag.find((i) => i.sku === sku && i.size === size);
  if (existing) existing.qty += 1;
  else bag.push({ sku, name, price, size, qty: 1 });
  saveBag(); renderBag();
  t.setAttribute('data-added', '1');
  setTimeout(() => t.removeAttribute('data-added'), 1200);
  sb.events('add_to_bag', { sku, size, variant });
  // abre el drawer solo si el click viene del hero
  if (t.dataset.sku === 'QY-04') openBag();
});

const bagEl = $('#bag');
function openBag() { bagEl.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeBag() { bagEl.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
$('[data-open-bag]').addEventListener('click', openBag);
$$('[data-close-bag]').forEach((b) => b.addEventListener('click', closeBag));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBag(); });

// ============ DROP FORM ============
const form = $('[data-drop-form]');
const msg = $('[data-drop-msg]');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.dataset.state = 'err';
    msg.textContent = 'Ese correo no se ve bien. Reviza y prueba otra vez.';
    return;
  }
  msg.dataset.state = '';
  msg.textContent = 'Enviando…';
  const r = await sb.leads(email, 'drop');
  if (r.ok || r.reason === 'no-config') {
    msg.dataset.state = 'ok';
    msg.textContent = r.ok
      ? '✓ Listo. Te escribimos 48 h antes del drop.'
      : '✓ Guardado localmente (demo sin backend conectado).';
    form.reset();
    sb.events('drop_signup', { ok: r.ok });
  } else {
    msg.dataset.state = 'err';
    msg.textContent = 'No pudimos guardar tu correo. Intenta en un minuto.';
  }
});

// ============ VISITAS ============
(async () => {
  try {
    const KEY = 'qaytu:visits';
    let n = Number(localStorage.getItem(KEY) || '0');
    n += 1;
    localStorage.setItem(KEY, String(n));
    $('[data-visitas]').textContent = n;
  } catch {}
})();

// ============ REVEAL ON SCROLL ============
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '-10% 0px' });
  $$('.sheet__paper, .dropside__inner, .pattern__sheet').forEach((el) => io.observe(el));
}
