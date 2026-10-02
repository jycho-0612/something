const PASSWORD = 'jejemon'; // not case-sensitive
const $ = (id) => document.getElementById(id);

/* ---------- screens ---------- */
function show(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
}

function tryUnlock() {
  if ($('pass').value.trim().toLowerCase() === PASSWORD) {
    show('hello');
  } else {
    $('error').textContent = 'Oops, that\'s not it. Try again 💔';
    $('pass').select();
  }
}
$('unlockBtn').addEventListener('click', tryUnlock);
$('pass').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock(); });

$('acceptBtn').addEventListener('click', () => show('flowers'));
$('declineBtn').addEventListener('click', () => show('decline'));
$('backHello').addEventListener('click', () => show('hello'));
$('backFlowers').addEventListener('click', () => show('flowers'));
$('envelope').addEventListener('click', () => show('letter'));
$('envelope').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') show('letter'); });

/* ---------- drawings ---------- */
// little flowers on the cat's cloud
function smallFlower(x, y, petal, center) {
  const petals = Array.from({ length: 5 }, (_, i) =>
    `<circle cx="0" cy="-8" r="6.5" fill="${petal}" stroke="#fff" stroke-width="1.5" transform="rotate(${i * 72})"/>`).join('');
  return `<g transform="translate(${x} ${y})">${petals}<circle r="4" fill="${center}"/></g>`;
}
$('catFlowers').innerHTML =
  smallFlower(45, 52, '#d9a8ee', '#fff2a8') + smallFlower(106, 26, '#ff6a4d', '#ffd966') + smallFlower(160, 56, '#7aa7ff', '#fff2a8');

// roses: layered petals with light edges, drawn in SVG
const ROSE = { dark: '#8f1428', mid: '#cf3a4e', mid2: '#e0596b', light: '#f19aa5', edge: '#f8c9ce' };
function rose(x, y, r, spin) {
  const outer = Array.from({ length: 6 }, (_, k) =>
    `<circle cx="0" cy="${-r * 0.5}" r="${r * 0.55}" fill="${ROSE.mid}" stroke="${ROSE.dark}" stroke-width="1.6" transform="rotate(${k * 60})"/>`).join('');
  const mid = Array.from({ length: 5 }, (_, k) =>
    `<circle cx="0" cy="${-r * 0.3}" r="${r * 0.38}" fill="${ROSE.mid2}" stroke="${ROSE.dark}" stroke-width="1.4" transform="rotate(${k * 72 + 20})"/>`).join('');
  const edges = Array.from({ length: 6 }, (_, k) =>
    `<path d="M${-r * 0.3} ${-r * 0.92} Q0 ${-r * 1.08} ${r * 0.3} ${-r * 0.92}" fill="none" stroke="${ROSE.edge}" stroke-width="2.4" stroke-linecap="round" transform="rotate(${k * 60})"/>`).join('');
  return `<g transform="translate(${x} ${y}) rotate(${spin})">
    <circle r="${r}" fill="${ROSE.dark}"/>${outer}${edges}${mid}
    <circle r="${r * 0.3}" fill="${ROSE.light}" stroke="${ROSE.dark}" stroke-width="1.6"/>
    <path d="M0 ${-r * 0.14} C${r * 0.2} ${-r * 0.2} ${r * 0.22} ${r * 0.12} 0 ${r * 0.15} C${-r * 0.15} ${r * 0.12} ${-r * 0.12} ${-r * 0.06} 0 ${-r * 0.04}" fill="none" stroke="${ROSE.dark}" stroke-width="2" stroke-linecap="round"/>
  </g>`;
}
$('rose1').innerHTML = rose(130, 76, 46, 10);
$('rose2').innerHTML = rose(80, 160, 38, -25) + rose(182, 160, 38, 40);

// letter paragraphs fade in one after another
document.querySelectorAll('.letter-body p').forEach((p, i) => p.style.setProperty('--i', i));