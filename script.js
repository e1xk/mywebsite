/* ============================================================
   DonutCraft — data + interactivity
   ============================================================ */
'use strict';

/* ---------------- pack data ---------------- */

const PACKS = [
  {
    id: 'sugar-rush', name: 'Sugar Rush 32x', author: 'FrostBloom', res: '32x',
    cat: 'Cartoon', dl: 2143000, rating: 4.9, size: '34 MB',
    versions: ['1.21.1', '1.20.6', '1.19.4'],
    updated: 'Sep 12, 2026', ts: Date.UTC(2026, 8, 12),
    emoji: '🍩', featured: true,
    palette: ['#ff2ea6', '#c81d7d', '#ffd6ec', '#29e0e8'],
    desc: 'Every block re-iced. Candy-striped pillars, frosted glass and glowing donut lanterns — the official DonutCraft flavor for builders with a sweet tooth.',
    features: ['🍩 Donut lanterns glow with real warm light', '🍬 Candy-striped terracotta & wool palette', '🪟 Frosted glass that still lets you spot mobs', '🧁 4,300+ retextured blocks & items']
  },
  {
    id: 'vanilla-plus', name: 'Vanilla Plus 32x', author: 'CopperKettle', res: '32x',
    cat: 'Faithful', dl: 3412000, rating: 4.9, size: '21 MB',
    versions: ['1.21.1', '1.20.6'],
    updated: 'Sep 8, 2026', ts: Date.UTC(2026, 8, 8),
    emoji: '🧱',
    palette: ['#8bc34a', '#5d8a2f', '#d7e8a8', '#e0b47a'],
    desc: 'Vanilla, but freshly baked. Doubles the resolution of every default texture while keeping the exact look and feel Mojang intended.',
    features: ['🧱 Same palette, double the detail', '🛠️ Optimized for shader pipelines', '🌍 Full support for trail & cherry biomes']
  },
  {
    id: 'chroma-pvp', name: 'Chroma PvP 16x', author: 'VoidKat', res: '16x',
    cat: 'PvP', dl: 1804000, rating: 4.7, size: '8 MB',
    versions: ['1.21.1', '1.20.4', '1.8.9'],
    updated: 'Sep 15, 2026', ts: Date.UTC(2026, 8, 15),
    emoji: '⚔️',
    palette: ['#29e0e8', '#0e8fa8', '#bff7fb', '#ff2ea6'],
    desc: 'Tournament-grade clarity. Low fire, clean skies, crisp outlines and color-coded gear so you never lose track of a duel again.',
    features: ['🔥 Low-fire & no-fire variants included', '🗡️ Outlined enemy armor trim', '☁️ Cloudless skies for max visibility', '📦 Tiny 8 MB file, zero FPS cost']
  },
  {
    id: 'realstone', name: 'RealStone HD 128x', author: 'QuarryLab', res: '128x',
    cat: 'Realistic', dl: 954000, rating: 4.8, size: '210 MB',
    versions: ['1.21.1', '1.20.6'],
    updated: 'Sep 2, 2026', ts: Date.UTC(2026, 8, 2),
    emoji: '🪨',
    palette: ['#8d7460', '#5c4a3a', '#c9b295', '#6d9c4a'],
    desc: 'Photogrammetry-grade stone, wood and metal scanned from real quarries. PBR-ready for shader users, and still readable in vanilla lighting.',
    features: ['📸 Real scanned material surfaces', '💡 Full PBR + normal map pack included', '🏚️ Weathered variants for every wall']
  },
  {
    id: 'neon-nights', name: 'Neon Nights 64x', author: 'SynthWraith', res: '64x',
    cat: 'Cartoon', dl: 612000, rating: 4.6, size: '96 MB',
    versions: ['1.21.1', '1.20.6'],
    updated: 'Aug 28, 2026', ts: Date.UTC(2026, 7, 28),
    emoji: '🌃',
    palette: ['#9b5cff', '#5f2ea6', '#2de2c3', '#ff5ca8'],
    desc: 'A synthwave takeover: glowing neon blocks, chrome tools and sunset gradients baked into every biome. Best served with shaders turned to max.',
    features: ['🌈 Emissive neon ores that glow in caves', '🎹 Note blocks get a synthwave face-lift', '🦑 Glowing squid are now glowsticks']
  },
  {
    id: 'frostbound', name: 'Frostbound 128x', author: 'PolarPeak', res: '128x',
    cat: 'Realistic', dl: 431000, rating: 4.7, size: '184 MB',
    versions: ['1.21.1'],
    updated: 'Sep 5, 2026', ts: Date.UTC(2026, 8, 5),
    emoji: '❄️',
    palette: ['#7fd4ff', '#3d7fb8', '#e8f8ff', '#b8e6ff'],
    desc: 'Frozen peaks, frosted windows and breath-fog glass. A winter overhaul that makes every snow biome feel like a polar expedition.',
    features: ['🧊 Semi-transparent ice with depth', '🌬️ Snow layers pile naturally on stairs', '🐧 Custom penguin textures for cold shores']
  },
  {
    id: 'dungeon-candle', name: 'Dungeon Candle 64x', author: 'EmberForge', res: '64x',
    cat: 'RPG', dl: 1207000, rating: 4.8, size: '132 MB',
    versions: ['1.21.1', '1.20.6', '1.19.4'],
    updated: 'Sep 10, 2026', ts: Date.UTC(2026, 8, 10),
    emoji: '🕯️',
    palette: ['#ffb020', '#a86a12', '#5a3a1a', '#ff5c3a'],
    desc: 'Dark souls meets blocky caves. Grim stone, flickering torchlight and hand-drawn item frames that turn any basement into a boss arena.',
    features: ['🕯️ Animated torch & lantern flames', '🗡️ 40+ RPG-style weapon textures', '🚪 Rusty dungeon doors and mossy vaults', '💀 New HUD with a grimdark coat of paint']
  },
  {
    id: 'mossy-vale', name: 'Mossy Vale 16x', author: 'FernWhistle', res: '16x',
    cat: 'Faithful', dl: 873000, rating: 4.5, size: '6 MB',
    versions: ['1.21.1', '1.20.6', '1.18.2'],
    updated: 'Aug 20, 2026', ts: Date.UTC(2026, 7, 20),
    emoji: '🌿',
    palette: ['#62d26f', '#2f8a44', '#bfe8a8', '#8a6a3a'],
    desc: 'A gentle green reimagining of vanilla. Softer grass, warmer wood and moss creeping over everything — all at honest 16x resolution.',
    features: ['🌿 Mossy variants for 30+ blocks', '🌻 Softer, warmer world palette', '⚖️ Zero impact on performance']
  },
  {
    id: 'candy-kingdom', name: 'Candy Kingdom 32x', author: 'SprinkleWitch', res: '32x',
    cat: 'Whimsical', dl: 2911000, rating: 4.9, size: '45 MB',
    versions: ['1.21.1', '1.20.6'],
    updated: 'Sep 3, 2026', ts: Date.UTC(2026, 8, 3),
    emoji: '🏰',
    palette: ['#ff7ac2', '#ffb020', '#fff3fa', '#8bd0ff'],
    desc: 'Castles made of cake, bridges of chocolate and lava you will desperately want to taste. The sweetest build palette in the kingdom.',
    features: ['🏰 Cake, cookie & waffle block set', '🍫 Chocolate lava with animated swirl', '🍭 Peppermint pillars in 16 colors']
  },
  {
    id: 'obsidian-edge', name: 'Obsidian Edge 16x', author: 'NetherNine', res: '16x',
    cat: 'PvP', dl: 1548000, rating: 4.4, size: '7 MB',
    versions: ['1.21.1', '1.8.9'],
    updated: 'Sep 1, 2026', ts: Date.UTC(2026, 8, 1),
    emoji: '🗡️',
    palette: ['#3d2a52', '#1c1030', '#8a6ac2', '#ff2e5c'],
    desc: 'Shadow-black GUIs, high-contrast potions and a crystal-clear crosshair. Built for bedwars grinders who live on the edge.',
    features: ['🖤 Pitch-black GUI panels', '🧪 Color-popped potion outlines', '🎯 6 included crosshair styles']
  },
  {
    id: 'cozy-cottage', name: 'Cozy Cottage 32x', author: 'HearthHollow', res: '32x',
    cat: 'Whimsical', dl: 1122000, rating: 4.8, size: '28 MB',
    versions: ['1.21.1', '1.20.6'],
    updated: 'Sep 14, 2026', ts: Date.UTC(2026, 8, 14),
    emoji: '🏡',
    palette: ['#e0a86a', '#a8743f', '#ffe9c2', '#7fb86a'],
    desc: 'Warm timber, knitted wool and candle-lit windows. The pack equivalent of a blanket, a fireplace and rain on the roof.',
    features: ['🕯️ Window light that actually feels warm', '🧶 Knitted wool patterns in every dye', '🪵 Hand-hewn timber beams']
  },
  {
    id: 'pixel-bloom', name: 'Pixel Bloom 16x', author: 'PetalPixel', res: '16x',
    cat: 'Cartoon', dl: 2314000, rating: 4.6, size: '9 MB',
    versions: ['1.21.1', '1.20.6', '1.19.4'],
    updated: 'Sep 16, 2026', ts: Date.UTC(2026, 8, 16),
    emoji: '🌸',
    palette: ['#ff8ac2', '#ff5c9e', '#ffe3f0', '#8ae0c8'],
    desc: 'Spring, permanently. Cherry petals drift through pastel forests and every flower block got a glow-up. Lightweight enough for any laptop.',
    features: ['🌸 Animated falling petals in forests', '🎨 Pastel overworld palette', '🪶 Under 10 MB, buttery smooth']
  }
];

/* ---------------- helpers ---------------- */

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

const fmt = n =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  : n >= 1e3 ? Math.round(n / 1e3) + 'K'
  : String(n);

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* procedural pixel-art preview for each pack */
function drawPackTexture(canvas, pack, cells = 12) {
  const ctx = canvas.getContext('2d');
  const rnd = mulberry32(hashStr(pack.id));
  const [base, dark, light, accent] = pack.palette;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const r = rnd();
      ctx.fillStyle = r < 0.5 ? base : r < 0.78 ? dark : light;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  // accent "ore" clusters
  const clusters = 2 + Math.floor(rnd() * 3);
  for (let i = 0; i < clusters; i++) {
    const cx = Math.floor(rnd() * cells);
    const cy = Math.floor(rnd() * cells);
    const n = 3 + Math.floor(rnd() * 3);
    for (let j = 0; j < n; j++) {
      const ox = cx + Math.floor(rnd() * 3) - 1;
      const oy = cy + Math.floor(rnd() * 3) - 1;
      if (ox >= 0 && oy >= 0 && ox < cells && oy < cells) {
        ctx.fillStyle = accent;
        ctx.fillRect(ox, oy, 1, 1);
      }
    }
  }
  // bevel: light top edge, dark bottom edge
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fillRect(0, 0, cells, 1);
  ctx.fillStyle = 'rgba(0,0,0,0.38)';
  ctx.fillRect(0, cells - 1, cells, 1);
}

/* ---------------- state ---------------- */

const state = { q: '', cat: 'All', sort: 'downloads', favOnly: false };

const FAV_KEY = 'donutcraft-favs';
let favs = new Set();
try { favs = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); } catch (_) { /* private mode */ }
const saveFavs = () => { try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch (_) {} };

/* ---------------- toast ---------------- */

const toastEl = $('#toast');
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.hidden = false;
  requestAnimationFrame(() => toastEl.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => { toastEl.hidden = true; }, 220);
  }, 2600);
}

/* ---------------- pack grid ---------------- */

const grid = $('#packGrid');
const countEl = $('#resultCount');
const emptyEl = $('#emptyState');

function visiblePacks() {
  const q = state.q.trim().toLowerCase();
  const list = PACKS.filter(p => {
    if (q && !(p.name + ' ' + p.author + ' ' + p.desc + ' ' + p.cat).toLowerCase().includes(q)) return false;
    if (state.cat !== 'All' && p.cat !== state.cat) return false;
    if (state.favOnly && !favs.has(p.id)) return false;
    return true;
  });
  const s = state.sort;
  list.sort((a, b) =>
    s === 'rating' ? b.rating - a.rating
    : s === 'newest' ? b.ts - a.ts
    : s === 'az' ? a.name.localeCompare(b.name)
    : b.dl - a.dl);
  return list;
}

function cardEl(p) {
  const el = document.createElement('article');
  el.className = 'pack-card';
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  el.setAttribute('aria-haspopup', 'dialog');
  el.setAttribute('aria-label', `${p.name} by ${p.author} — open details`);
  el.innerHTML = `
    <div class="pack-thumb">
      <canvas width="12" height="12" aria-hidden="true"></canvas>
      <span class="pack-emoji" aria-hidden="true">${p.emoji}</span>
      <span class="pack-res">${p.res}</span>
      <button class="fav-toggle" aria-pressed="${favs.has(p.id)}" aria-label="Toggle favorite for ${p.name}" title="Favorite">♥</button>
    </div>
    <div class="pack-body">
      <p class="pack-cat">${p.cat} · <span>${p.updated}</span></p>
      <h3 class="pack-name">${p.name}</h3>
      <p class="pack-author">by ${p.author}</p>
      <div class="pack-foot">
        <span class="pack-rating" title="Rating">★ ${p.rating.toFixed(1)}</span>
        <span class="pack-dl" title="Downloads">⬇ ${fmt(p.dl)}</span>
        <button class="btn btn-pixel btn-green btn-mini" data-get aria-label="Download ${p.name}">Get</button>
      </div>
    </div>`;
  drawPackTexture($('canvas', el), p);

  el.addEventListener('click', e => {
    if (e.target.closest('[data-get]') || e.target.closest('.fav-toggle')) return;
    openModal(p);
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p); }
  });
  $('[data-get]', el).addEventListener('click', () => quickDownload(p));
  $('.fav-toggle', el).addEventListener('click', e => { e.stopPropagation(); toggleFav(p.id); });
  return el;
}

function render() {
  const list = visiblePacks();
  grid.innerHTML = '';
  list.forEach(p => grid.appendChild(cardEl(p)));
  emptyEl.hidden = list.length > 0;
  countEl.textContent = `Showing ${list.length} of ${PACKS.length} ${state.favOnly ? 'favorites' : 'packs'}`;
}

function quickDownload(p) {
  p.dl += 1;
  render();
  showToast(`📦 ${p.name}.zip saved to downloads — see you in game!`);
}

/* ---------------- favorites ---------------- */

function toggleFav(id) {
  const added = !favs.has(id);
  favs[added ? 'add' : 'delete'](id);
  saveFavs();
  updateFavUI();
  render();
  showToast(added ? '♥ Added to your favorites' : 'Removed from favorites');
}

function updateFavUI() {
  $('#favCount').textContent = favs.size;
  $('#favBtn').classList.toggle('active', state.favOnly);
  const modalFav = $('#modalFav');
  if (currentPack) {
    modalFav.textContent = favs.has(currentPack.id) ? '♥ Favorited' : '♡ Favorite';
    modalFav.style.borderColor = favs.has(currentPack.id) ? 'var(--pink)' : '';
  }
}

/* ---------------- toolbar ---------------- */

const CATS = ['All', ...new Set(PACKS.map(p => p.cat))];
const chipsEl = $('#chips');

function setCat(cat) {
  state.cat = cat;
  $$('.chip', chipsEl).forEach(c => {
    const on = c.textContent === cat;
    c.classList.toggle('active', on);
    c.setAttribute('aria-pressed', on);
  });
  render();
}

CATS.forEach(cat => {
  const b = document.createElement('button');
  b.className = 'chip' + (cat === state.cat ? ' active' : '');
  b.textContent = cat;
  b.setAttribute('aria-pressed', cat === state.cat);
  b.addEventListener('click', () => setCat(cat));
  chipsEl.appendChild(b);
});

$('#searchInput').addEventListener('input', e => { state.q = e.target.value; render(); });
$('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; render(); });

$('#favBtn').addEventListener('click', () => {
  state.favOnly = !state.favOnly;
  updateFavUI();
  render();
  $('#packs').scrollIntoView({ behavior: 'smooth' });
  showToast(state.favOnly ? '♥ Showing your favorites' : 'Showing all packs');
});

/* category tiles */
$$('.cat-tile').forEach(tile => {
  const cat = tile.dataset.cat;
  const n = PACKS.filter(p => p.cat === cat).length;
  $(`.cat-count[data-count-for="${cat}"]`).textContent =
    `${n} pack${n === 1 ? '' : 's'}`;
  tile.addEventListener('click', () => {
    setCat(cat);
    $('#packs').scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------------- modal ---------------- */

const modal = $('#packModal');
let currentPack = null;
let dlBusy = false;

function openModal(p) {
  currentPack = p;
  $('#modalCat').textContent = p.cat;
  $('#modalTitle').textContent = p.name;
  $('#modalAuthor').textContent = p.author;
  $('#modalUpdated').textContent = p.updated;
  $('#modalDesc').textContent = p.desc;
  $('#modalRes').textContent = p.res;
  $('#modalRating').textContent = '★ ' + p.rating.toFixed(1);
  $('#modalDl').textContent = fmt(p.dl);
  $('#modalSize').textContent = p.size;
  $('#modalEmoji').textContent = p.emoji;
  $('#modalVersions').innerHTML = p.versions.map(v => `<span class="ver-chip">✔ ${v}</span>`).join('');
  $('#dlProgress').hidden = true;
  $('#modalDownload').disabled = false;
  drawPackTexture($('#modalCanvas'), p);
  updateFavUI();
  modal.hidden = false;
  document.body.classList.add('no-scroll');
  $('.modal-close', modal).focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('no-scroll');
  currentPack = null;
  dlBusy = false;
}

modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

$('#modalFav').addEventListener('click', () => { if (currentPack) toggleFav(currentPack.id); });

$('#modalDownload').addEventListener('click', () => {
  if (!currentPack || dlBusy) return;
  dlBusy = true;
  const wrap = $('#dlProgress');
  const bar = $('#dlBar');
  wrap.hidden = false;
  bar.style.width = '0%';
  let w = 0;
  const t = setInterval(() => {
    w = Math.min(100, w + 8 + Math.random() * 14);
    bar.style.width = w + '%';
    if (w >= 100) {
      clearInterval(t);
      dlBusy = false;
      setTimeout(() => { wrap.hidden = true; }, 500);
      currentPack.dl += 1;
      $('#modalDl').textContent = fmt(currentPack.dl);
      render();
      showToast(`📦 ${currentPack.name}.zip saved to downloads — see you in game!`);
    }
  }, 110);
});

/* ---------------- spotlight ---------------- */

function fillSpotlight() {
  const f = PACKS.find(p => p.featured) || PACKS[0];
  $('#spotTitle').textContent = f.name;
  $('#spotAuthor').textContent = f.author;
  $('#spotCat').textContent = f.cat;
  $('#spotRes').textContent = f.res;
  $('#spotDesc').textContent = f.desc;
  $('#spotEmoji').textContent = f.emoji;
  $('#spotRating').textContent = `★ ${f.rating.toFixed(1)} rated`;
  $('#spotDl').textContent = `${fmt(f.dl)} downloads`;
  $('#spotSize').textContent = `${f.size} · ${f.versions[0]} ready`;
  $('#spotList').innerHTML = f.features.map(x => `<li>${x}</li>`).join('');
  drawPackTexture($('#spotCanvas'), f, 12);
  $('#spotDownload').addEventListener('click', () => quickDownload(f));
  $('#spotDetails').addEventListener('click', () => openModal(f));
}

/* ---------------- hero: sprinkles + marquee + counters ---------------- */

function makeSprinkles() {
  const field = $('#sprinkleField');
  const colors = ['#ff2ea6', '#29e0e8', '#ffc233', '#9b5cff', '#ff7ac2'];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.className = 'sprinkle';
    const w = 10 + Math.random() * 18;
    const round = Math.random() < 0.35;
    s.style.width = round ? w * 0.6 + 'px' : w + 'px';
    s.style.height = round ? w * 0.6 + 'px' : w * 0.42 + 'px';
    s.style.borderRadius = '999px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.background = colors[i % colors.length];
    s.style.setProperty('--r', Math.floor(Math.random() * 360) + 'deg');
    s.style.animationDuration = 5 + Math.random() * 6 + 's';
    s.style.animationDelay = -Math.random() * 6 + 's';
    field.appendChild(s);
  }
}

function makeMarquee() {
  const words = ['16x', '32x', '64x', '128x', 'PvP', 'Cartoon', 'Realistic', 'Faithful', 'RPG', 'Whimsical', 'Free downloads', '1.21 ready'];
  const chunk = words.map(w => `<span>${w}</span>`).join('<i>✦</i>') + '<i>✦</i>';
  $('#marqueeTrack').innerHTML = chunk + chunk;
}

function animateCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const decimals = el.dataset.count.includes('.');
      const suffix = el.dataset.suffix || '';
      const t0 = performance.now();
      const D = 1300;
      (function tick(t) {
        const k = Math.min(1, (t - t0) / D);
        const e = 1 - Math.pow(1 - k, 3);
        const v = target * e;
        el.textContent = (decimals ? v.toFixed(1) : Math.round(v).toLocaleString('en-US')) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach(el => io.observe(el));
}

/* ---------------- chrome: header, burger, demo links ---------------- */

const header = $('.site-header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

$('#burger').addEventListener('click', () => {
  const nl = $('#navLinks');
  const open = nl.classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', open);
});
$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  $('#navLinks').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
}));

$$('[data-demo]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  showToast('🍩 This is a concept demo — that page is still in the oven.');
}));

/* ---------------- init ---------------- */

makeSprinkles();
makeMarquee();
fillSpotlight();
render();
updateFavUI();
animateCounters();
