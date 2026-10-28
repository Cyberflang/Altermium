const D = window.SITE, KEY = 'altermium:v4', Q = s => document.querySelector(s), QA = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const base = () => ({ theme: { ...D.theme }, projects: structuredClone(D.projects) });
let S; try { S = JSON.parse(localStorage.getItem(KEY)) || base(); } catch (e) { S = base(); }
S.theme = { ...D.theme, ...S.theme };
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { alert('Could not save. The logo image may be too large.'); } };

/* color helpers */
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const onC = h => { const [r, g, b] = rgb(h); return (r * 299 + g * 587 + b * 114) / 255000 > .62 ? '#101318' : '#ffffff'; };
const hsl = h => {
  const [r, g, b] = rgb(h).map(v => v / 255), M = Math.max(r, g, b), m = Math.min(r, g, b), d = M - m;
  let H = 0; if (d) { H = M === r ? ((g - b) / d) % 6 : M === g ? (b - r) / d + 2 : (r - g) / d + 4; H = (H * 60 + 360) % 360; }
  const L = (M + m) / 2; return [H, d ? d / (1 - Math.abs(2 * L - 1)) * 100 : 0, L * 100];
};

/* theme */
const SWATCHES = ['#2563EB', '#7C3AED', '#DB2777', '#EA580C', '#CA8A04', '#16A34A', '#0D9488', '#0891B2'];
function applyTheme() {
  const t = S.theme, r = document.documentElement;
  const dark = t.mode === 'dark' || (t.mode === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  r.dataset.theme = dark ? 'dark' : 'light';
  const [h, s, l] = hsl(t.accent);
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--on-accent', onC(t.accent));
  r.style.setProperty('--accent2', `hsl(${(h + 45) % 360} ${s}% ${l}%)`);
  r.style.setProperty('--r', { sharp: '4px', soft: '12px', round: '26px' }[t.radius] || '12px');
  QA('#mode button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === t.mode));
  QA('#radius button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === t.radius));
  QA('#sw button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v.toLowerCase() === t.accent.toLowerCase()));
  Q('#accent').value = t.accent;
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
Q('#sw').innerHTML = SWATCHES.map(c => `<button data-v="${c}" style="background:${c}" aria-label="Accent ${c}"></button>`).join('');
Q('#mode').onclick = e => { const v = e.target.dataset.v; if (v) { S.theme.mode = v; save(); applyTheme(); } };
Q('#radius').onclick = e => { const v = e.target.dataset.v; if (v) { S.theme.radius = v; save(); applyTheme(); } };
Q('#sw').onclick = e => { const v = e.target.dataset.v; if (v) { S.theme.accent = v; save(); applyTheme(); } };
Q('#accent').oninput = e => { S.theme.accent = e.target.value; save(); applyTheme(); };

/* content */
QA('[data-t]').forEach(e => e.textContent = D[e.dataset.t]);
Q('#fname').textContent = D.founder.name; Q('#frole').textContent = D.founder.role;
Q('#values').innerHTML = D.values.map(v => `<div><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div>`).join('');
const pic = p => p.image ? `<img data-fit="${esc(p.fit || 'contain')}" src="${esc(p.image)}" alt="${esc(p.name)} logo">` : `<b class="ini">${esc((p.name || '?')[0])}</b>`;
function renderProjects() {
  Q('#projects').innerHTML = S.projects.map(p => `
    <article class="panel" style="--c:${esc(p.color)};--on-c:${onC(p.color)}">
      <div class="shot">${pic(p)}</div>
      <div class="body">
        <h3>${esc(p.name)}<span>${esc(p.tag)}</span></h3>
        <p>${esc(p.desc)}</p>
        <ul class="meta" data-link="${esc(p.link)}"><li>${esc(p.est)}</li><li class="m" hidden></li><li class="o" hidden></li></ul>
        <a class="btn c" href="${esc(p.link)}" rel="noopener">Join ${esc(p.name)}</a>
      </div>
    </article>`).join('');
  Q('#stack').innerHTML = S.projects.slice(0, 3).map(p => `<div class="card" style="--c:${esc(p.color)}">${pic(p)}</div>`).join('');
  Q('#flinks').innerHTML = S.projects.map(p => `<a href="${esc(p.link)}" rel="noopener">${esc(p.name)}</a>`).join('') + `<span>© 2026 ${esc(D.name)}</span>`;
  counts();
}

/* live Discord counts (hidden if Discord does not answer) */
async function counts() {
  let total = 0, any = false;
  await Promise.all(QA('.meta').map(async ul => {
    const m = /(?:discord\.gg\/|discord(?:app)?\.com\/invite\/)([\w-]+)/i.exec(ul.dataset.link);
    if (!m) return;
    try {
      const res = await fetch(`https://discord.com/api/v9/invites/${m[1]}?with_counts=true`);
      if (!res.ok) return;
      const d = await res.json(), a = ul.querySelector('.m'), o = ul.querySelector('.o');
      if (typeof d.approximate_member_count === 'number') { a.textContent = d.approximate_member_count.toLocaleString('en-US') + ' members'; a.hidden = false; total += d.approximate_member_count; any = true; }
      if (typeof d.approximate_presence_count === 'number') { o.textContent = d.approximate_presence_count.toLocaleString('en-US') + ' online now'; o.hidden = false; }
    } catch (e) { /* leave hidden */ }
  }));
  if (any) { const t = Q('#total'); t.textContent = total.toLocaleString('en-US') + ' members across our communities'; t.hidden = false; }
}

/* drawer */
const panel = Q('#panel'), openBtn = Q('#open');
const setPanel = o => { panel.hidden = !o; openBtn.setAttribute('aria-expanded', o); (o ? Q('#close') : openBtn).focus(); };
openBtn.onclick = () => setPanel(panel.hidden);
Q('#close').onclick = () => setPanel(false);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) setPanel(false); });
Q('#reset').onclick = () => { if (confirm('Reset theme and projects to config.js?')) { localStorage.removeItem(KEY); location.reload(); } };

/* project editor: open the page with ?edit */
if (/[?&]edit\b/.test(location.search)) { Q('#ed').hidden = false; Q('#export').hidden = false; }
const f = Q('#pf'), E = f.elements; let img = '';
const renderList = () => Q('#plist').innerHTML = S.projects.map((p, i) => `<li><span>${esc(p.name)}</span><button data-e="${i}">Edit</button><button data-d="${i}">Delete</button></li>`).join('');
function openForm(i) {
  const p = S.projects[i] || { color: S.theme.accent };
  f.hidden = false; E.idx.value = i ?? '';
  E.pn.value = p.name || ''; E.pt.value = p.tag || ''; E.pd.value = p.desc || ''; E.pe.value = p.est || ''; E.pl.value = p.link || ''; E.pc.value = p.color; E.pp.value = '';
  img = p.image || ''; E.pn.focus();
}
Q('#add').onclick = () => openForm();
Q('#cancel').onclick = () => f.hidden = true;
Q('#plist').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.e) openForm(+b.dataset.e);
  if (b.dataset.d && confirm('Delete this project?')) { S.projects.splice(+b.dataset.d, 1); save(); renderProjects(); renderList(); }
};
E.pp.onchange = () => {
  const file = E.pp.files[0]; if (!file) return;
  if (file.size > 1.5e6) { alert('Use an image under 1.5 MB.'); E.pp.value = ''; return; }
  const r = new FileReader(); r.onload = () => img = r.result; r.readAsDataURL(file);
};
f.onsubmit = e => {
  e.preventDefault();
  const old = S.projects[E.idx.value] || {};
  const p = { ...old, name: E.pn.value.trim(), tag: E.pt.value.trim(), desc: E.pd.value.trim(), est: E.pe.value.trim(), link: E.pl.value.trim(), color: E.pc.value, image: img, fit: old.fit || 'contain' };
  if (E.idx.value === '') S.projects.push(p); else S.projects[+E.idx.value] = p;
  save(); f.hidden = true; renderProjects(); renderList();
};
Q('#export').onclick = () => {
  const cfg = { ...D, theme: S.theme, projects: S.projects };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['window.SITE = ' + JSON.stringify(cfg, null, 2) + ';\n'], { type: 'text/javascript' }));
  a.download = 'config.js'; a.click();
};

applyTheme(); renderProjects(); renderList();
