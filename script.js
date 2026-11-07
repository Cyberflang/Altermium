(() => {
const D = window.SITE, Q = s => document.querySelector(s);
const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const U = u => /^https?:\/\//i.test(u || '') ? u : '#';
const pad = n => String(n).padStart(2, '0');
const fd = d => new Date(d + (d.length === 10 ? 'T00:00' : '')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const ST = k => `<span class="st ${E(k)}">${E(D.status[k] || k)}</span>`;
const cd = ms => { const m = Math.max(0, Math.floor(ms / 6e4)), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60); return d ? `${d}d ${h}h` : h ? `${h}h ${m % 60}m` : `${m}m`; };
const MC = {};
const load = p => p.invite ? (MC[p.slug] ||= fetch('https://discord.com/api/v9/invites/' + p.invite + '?with_counts=true').then(r => r.json()).then(j => [j.approximate_member_count || 0, j.approximate_presence_count || 0]).catch(() => null)) : Promise.resolve(null);
const posts = () => [...D.news].sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || new Date(b.date) - new Date(a.date));
const evs = () => { const n = Date.now(), t = e => new Date(e.date).getTime(); return { up: D.events.filter(e => t(e) >= n).sort((a, b) => t(a) - t(b)), past: D.events.filter(e => t(e) < n).sort((a, b) => t(b) - t(a)) }; };
const H = (n, t, x = '') => `<div class="sh"><h2><i>${n}</i>${t}</h2>${x}</div>`;
const row = (p, i) => `<a class="row" href="#/work/${E(p.slug)}"><span class="n">${pad(i + 1)}</span><span class="rn">${E(p.name)}<small>${E(p.short)}</small></span><span class="rc">${E(p.cat)}</span>${ST(p.status)}<span class="ry">${E(p.year)}</span></a>`;
const post = n => `<article class="post"><div class="pd"><time>${fd(n.date)}</time><span class="tg">${E(n.tag)}</span>${n.pin ? '<span class="pin">Pinned</span>' : ''}</div><div><h3>${E(n.title)}</h3><p>${E(n.text)}</p></div></article>`;
const ics = e => 'data:text/calendar;charset=utf-8,' + encodeURIComponent(`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${new Date(e.date).toISOString().replace(/[-:]|\.\d{3}/g, '')}\r\nSUMMARY:${e.title}\r\nLOCATION:${e.where || ''}\r\nEND:VEVENT\r\nEND:VCALENDAR`);
const ev = (e, past) => { const t = new Date(e.date); return `<article class="ev${past ? ' past' : ''}"><div class="dt"><b>${pad(t.getDate())}</b>${t.toLocaleString('en-GB', { month: 'short' })}</div><div><h3>${E(e.title)}</h3>${e.text ? `<p>${E(e.text)}</p>` : ''}<p class="em">${t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}${e.where ? ' / ' + E(e.where) : ''}${past ? '' : ` / in <span data-ts="${t.getTime()}">${cd(t - Date.now())}</span>`}</p>${past ? '' : `<p class="ln">${e.link ? `<a href="${E(U(e.link))}" rel="noopener">Join</a>` : ''}<a href="${ics(e)}" download="${E(e.title)}.ics">Add to calendar</a></p>`}</div></article>`; };
const divs = () => `<div class="divs">${D.divisions.map(d => `<a class="dv" href="#/work/~${encodeURIComponent(d.cats[0])}"><i>${D.projects.filter(p => d.cats.includes(p.cat)).length} projects</i><h3>${E(d.name)}</h3><p>${E(d.text)}</p></a>`).join('')}</div>`;
const hue = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const col = p => p.color || `hsl(${hue(p.slug || p.title) % 360} 62% 52%)`;
const pic = p => p.image ? `<img src="${E(p.image)}" alt="" loading="lazy" decoding="async" style="object-fit:${p.fit === 'contain' ? 'contain' : 'cover'}">` : `<span class="mono">${E(p.name[0])}</span>`;
const card = (p, f) => `<a class="pc${f ? ' feat' : ''}" href="#/work/${E(p.slug)}"><div class="pa${p.image ? ' im' : ''}" style="--c:${E(col(p))}">${pic(p)}</div><div class="pt"><span class="pcat">${f ? 'Featured / ' : ''}${E(p.cat)}</span><h3>${E(p.name)}</h3><p>${E(p.short)}</p>${f ? '' : `<div class="pf">${ST(p.status)}<span>${E(p.year)}</span></div>`}</div></a>`;
const nc = n => `<article class="nc"><div class="pt"><span class="pcat">${E(n.tag)} / ${fd(n.date)}</span><h3>${E(n.title)}</h3><p>${E(n.text)}</p></div></article>`;
const FORMS = {
  news: ['news', [['title', 'Title'], ['tag', 'Tag'], ['date', 'Date', 'date'], ['text', 'Text', 'area'], ['pin', 'Pinned', 'chk']]],
  event: ['events', [['title', 'Title'], ['date', 'Starts', 'datetime-local'], ['where', 'Where'], ['link', 'Link'], ['text', 'Text', 'area']]],
  project: ['projects', [['name', 'Name'], ['cat', 'Category', 'cat'], ['status', 'Status', 'st'], ['year', 'Year'], ['short', 'One line'], ['desc', 'Description', 'area'], ['link', 'Link']]],
  person: ['team', [['name', 'Name'], ['prefix', 'Prefix'], ['role', 'Role'], ['bio', 'Bio', 'area'], ['link', 'Link']]],
  role: ['roles', [['title', 'Title'], ['team', 'Team'], ['type', 'Type'], ['text', 'Text', 'area'], ['link', 'Apply link']]],
  server: ['servers', [['name', 'Name'], ['ip', 'Address']]]
};

const V = {
  home() {
    const { up } = evs(), lj = p => `<article class="lineup"><div class="pa${p.image ? ' im' : ''}" style="--c:${E(col(p))}">${pic(p)}</div><div><span class="pcat">${E(p.cat)}</span><h3>${E(p.name)}</h3><p>${E(p.desc)}</p><div class="ln">${ST(p.status)}<a class="btn sm" href="#/work/${E(p.slug)}">Learn more</a></div></div></article>`;
    return `<section class="w hero2"><div><p class="lab">${E(D.name)}</p><h1>${E(D.tagline)}</h1><p class="lead">${E(D.about)}</p><p class="cta"><a class="btn" href="#/work">Explore our projects</a><a class="btn ghost" href="#/studio">About the studio</a></p></div><div class="keyart"><img src="images/logo-t.png" alt="Altermium logo"></div></section>
<section class="w facts"><div><b>2023</b>Online since</div><div><b id="mem">&hellip;</b>Community members</div><div><b id="onl">&hellip;</b>Online now</div></section>
<section class="w mission"><p class="lab">Who we are</p><p>${E(D.mission)}</p><a href="#/studio">Learn about Altermium</a></section>
<section class="w sec">${H('01', 'Our projects', '<a href="#/work">All projects</a>')}${D.projects.slice(0, 4).map(lj).join('')}</section>
<section class="w sec">${H('02', 'What we believe')}<div class="vs">${D.values.map(v => `<div><h3>${E(v.title)}</h3><p>${E(v.text)}</p></div>`).join('')}</div></section>
<section class="w sec">${H('03', 'Latest news', '<a href="#/journal">All news</a>')}<div class="pgrid">${posts().slice(0, 3).map(nc).join('')}</div></section>
<section class="w sec cols"><div>${H('04', 'Events', '<a href="#/events">All events</a>')}${up.length ? up.slice(0, 2).map(e => ev(e)).join('') : '<p class="empty">No events scheduled yet.</p>'}</div><div class="band"><p class="lab">Careers</p><h2>Build the next thing with Altermium.</h2><p>We are looking for developers, builders, designers and moderators.</p><a class="btn" href="#/careers">See careers</a></div></section>`;
  },
  work() { return `<section class="w sec">${H('01', 'Work')}<div class="tools"><div class="chips" id="chips"></div><input id="q" type="search" placeholder="Search projects" aria-label="Search projects"></div><div class="pgrid" id="rows"></div></section>`; },
  proj(s) {
    const p = D.projects.find(x => x.slug === s); if (!p) return V.nf();
    const f = (p.features || []).length ? `<h3 class="sub">Features</h3><ul class="ft">${p.features.map(x => `<li>${E(x)}</li>`).join('')}</ul>` : '';
    const lg = (p.log || []).length ? `<h3 class="sub">Changelog</h3>${p.log.map(l => `<div class="lg"><b>${E(l.v)}</b><time>${E(l.date || '')}</time><p>${E(l.text)}</p></div>`).join('')}` : '';
    return `<article class="w sec proj"><a class="back" href="#/work">All work</a><p class="lab" style="margin-top:28px">${E(p.cat)}</p><h1>${E(p.name)}</h1><div class="meta">${ST(p.status)}<span>${E(p.year)}</span>${(p.tags || []).map(t => `<span class="tag">${E(t)}</span>`).join('')}</div><div class="cols"><div><p class="lead">${E(p.desc)}</p>${f}${lg}</div><aside><div class="shot pa${p.image ? ' im' : ''}" style="--c:${E(col(p))}">${pic(p)}</div>${p.link ? `<a class="btn" href="${E(U(p.link))}" rel="noopener">${p.cat === 'Communities' ? 'Join on Discord' : 'Open project'}</a>` : ''}<p class="em" id="pm"></p></aside></div></article>`;
  },
  journal() { return `<section class="w sec">${H('02', 'Journal')}<div class="chips" id="chips"></div><div id="list"></div></section>`; },
  events() { const { up, past } = evs(); return `<section class="w sec">${H('03', 'Events')}${up.length ? up.map(e => ev(e)).join('') : '<p class="empty">No events scheduled. New events are announced here and on X first.</p>'}${past.length ? `<h3 class="sub">Past</h3>${past.map(e => ev(e, 1)).join('')}` : ''}</section>`; },
  people() {
    const o = Object.keys(D.ranks), t = [...D.team].sort((a, b) => o.indexOf(a.prefix) - o.indexOf(b.prefix));
    return `<section class="w sec">${H('04', 'People')}<div class="team">${t.map(m => `<article class="tm"><p class="pf" style="--p:${E(D.ranks[m.prefix] || 'var(--mut)')}">[${E(m.prefix)}]</p><h3>${E(m.name)}</h3><p class="r">${E(m.role)}</p>${m.bio ? `<p>${E(m.bio)}</p>` : ''}${m.link ? `<a href="${E(U(m.link))}" rel="noopener">Profile</a>` : ''}</article>`).join('')}<a class="tm join" href="${E(U(D.social.discord))}" rel="noopener"><p class="pf">[YOU?]</p><h3>Join the team</h3><p>We look for developers, builders, designers and moderators. Say hello in our Discord.</p></a></div></section>`;
  },
  studio() {
    return `<section class="w sec">${H('05', 'Studio')}<p class="mis">${E(D.mission)}</p>${divs()}<h3 class="sub">Our values</h3><div class="vals">${D.values.map(v => `<div><h4>${E(v.title)}</h4><p>${E(v.text)}</p></div>`).join('')}</div><h3 class="sub">Timeline</h3>${D.timeline.map(t => `<div class="tl"><b>${E(t.y)}</b><div><h4>${E(t.t)}</h4><p>${E(t.x)}</p></div></div>`).join('')}<h3 class="sub">Press kit</h3><p class="kit"><a href="images/logo-t.png" download>Logo, white</a><a href="images/logo-t-dark.png" download>Logo, dark</a><a href="images/logo.png" download>Logo on black</a></p></section>`;
  },
  careers() {
    const a = [['Developers', 'Java plugins, mods, bots and web.'], ['Builders', 'Maps, lobbies, arenas and worlds.'], ['Designers', 'Interfaces, art, logos and trailers.'], ['Moderators', 'Keep our communities friendly and active.']];
    return `<section class="w sec">${H('06', 'Careers')}<p class="mis">Help us build Altermium.</p><p class="lead">We grow by finding people who love making things. Pick the area that fits you and say hello in our Discord.</p><div class="vals">${a.map(x => `<div><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div><h3 class="sub">How it works</h3><div class="vals">${D.steps.map((x, i) => `<div><h4>${i + 1}. ${E(x.title)}</h4><p>${E(x.text)}</p></div>`).join('')}</div><h3 class="sub">Open roles</h3>${D.roles.length ? D.roles.map(r => `<article class="post"><div class="pd"><span class="tg">${E(r.team)}</span><span>${E(r.type)}</span></div><div><h3>${E(r.title)}</h3><p>${E(r.text)}</p>${r.link ? `<p class="ln"><a href="${E(U(r.link))}" rel="noopener">Apply</a></p>` : ''}</div></article>`).join('') : '<p class="empty">No specific roles are open right now, but we always want to hear from builders.</p>'}<p class="cta"><a class="btn" href="${E(U(D.social.discord))}" rel="noopener">Join our Discord</a><a class="btn ghost" href="${E(U(D.social.x))}" rel="noopener">Message us on X</a></p></section>`;
  },
  status() { return `<section class="w sec">${H('07', 'Status')}${D.servers.length ? '<div id="srv"></div>' : '<p class="empty">No servers listed yet. Add your server address to the servers list in config.js and live player counts will show here.</p>'}</section>`; },
  post() { return `<section class="w sec">${H('08', 'Post builder')}<p class="lead">Fill in the form, copy the snippet and paste it into the matching list in <code>config.js</code>, then push to GitHub.</p><div class="builder"><form id="bf"></form><div><pre id="out"></pre><button class="btn" id="cp" type="button">Copy snippet</button><p class="em" id="where"></p></div></div></section>`; },
  nf() { return `<section class="w sec"><p class="lab">404</p><h1>Page not found</h1><p><a href="#/">Back to start</a></p></section>`; }
};

const B = {
  home() { Promise.all(D.projects.map(load)).then(a => { const n = a.reduce((s, x) => s + (x ? x[0] : 0), 0), o = a.reduce((s, x) => s + (x ? x[1] : 0), 0); anim(Q('#mem'), n); anim(Q('#onl'), o); }); },
  work(a) {
    let c = a && a[0] === '~' ? decodeURIComponent(a.slice(1)) : 'All', s = '';
    const draw = () => {
      const l = D.projects.filter(p => (c === 'All' || p.cat === c) && (p.name + ' ' + p.short + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(s));
      Q('#chips').innerHTML = ['All', ...D.categories].map(x => `<button aria-pressed="${x === c}" data-c="${E(x)}">${E(x)}<sup>${x === 'All' ? D.projects.length : D.projects.filter(p => p.cat === x).length}</sup></button>`).join('');
      Q('#rows').innerHTML = l.length ? l.map(p => card(p)).join('') : '<p class="empty">Nothing here yet.</p>';
    };
    Q('#chips').onclick = e => { const b = e.target.closest('[data-c]'); if (b) { c = b.dataset.c; draw(); } };
    Q('#q').oninput = e => { s = e.target.value.trim().toLowerCase(); draw(); };
    draw();
  },
  status() {
    const el = Q('#srv'); if (!el) return;
    const line = (s, i, rc, c) => `<span class="n">${pad(i + 1)}</span><span class="rn">${E(s.name)}<small>${E(s.ip)}</small></span><span class="rc">${rc}</span><span class="st ${c}">${c === 'live' ? 'Online' : c === 'done' ? 'Offline' : 'Checking'}</span><span></span>`;
    el.innerHTML = D.servers.map((s, i) => `<div class="row srv" id="s${i}">${line(s, i, '', 'plan')}</div>`).join('');
    D.servers.forEach((s, i) => fetch('https://api.mcsrvstat.us/3/' + encodeURIComponent(s.ip)).then(r => r.json()).then(j => { const e = Q('#s' + i); if (e) e.innerHTML = line(s, i, j.online ? (j.players ? j.players.online + ' / ' + j.players.max + ' players' : 'Online') : '', j.online ? 'live' : 'done'); }).catch(() => { const e = Q('#s' + i); if (e) e.innerHTML = line(s, i, 'Unavailable', 'done'); }));
  },
  proj(s) { const p = D.projects.find(x => x.slug === s); if (p) load(p).then(n => { if (n && Q('#pm')) Q('#pm').textContent = n[0].toLocaleString() + ' members / ' + n[1].toLocaleString() + ' online'; }); },
  journal() {
    let t = 'All';
    const draw = () => {
      Q('#chips').innerHTML = ['All', ...new Set(D.news.map(n => n.tag))].map(x => `<button aria-pressed="${x === t}" data-c="${E(x)}">${E(x)}</button>`).join('');
      Q('#list').innerHTML = posts().filter(n => t === 'All' || n.tag === t).map(post).join('') || '<p class="empty">No posts yet.</p>';
    };
    Q('#chips').onclick = e => { const b = e.target.closest('[data-c]'); if (b) { t = b.dataset.c; draw(); } };
    draw();
  },
  post() {
    const bf = Q('#bf'); let type = 'news';
    const inp = ([k, l, t]) => t === 'area' ? `<label>${l}<textarea name="${k}" rows="3"></textarea></label>` : t === 'chk' ? `<label class="ck"><input type="checkbox" name="${k}"> ${l}</label>` : t === 'cat' || t === 'st' ? `<label>${l}<select name="${k}">${(t === 'cat' ? D.categories : Object.keys(D.status)).map(o => `<option>${E(o)}</option>`).join('')}</select></label>` : `<label>${l}<input name="${k}" type="${t || 'text'}"></label>`;
    const gen = () => {
      const o = {}; new FormData(bf).forEach((v, k) => { if (k !== 'type' && v) o[k] = v; });
      FORMS[type][1].forEach(([k, , t]) => { if (t === 'chk') o[k] = bf.elements[k].checked; });
      if (type === 'project') { o.slug = (o.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); if (o.year) o.year = +o.year; o.tags = []; o.features = []; o.log = []; }
      Q('#out').textContent = JSON.stringify(o, null, 2) + ',';
      Q('#where').textContent = 'Paste into the ' + FORMS[type][0] + ' list in config.js.';
    };
    const draw = () => { bf.innerHTML = `<label>Type<select name="type">${Object.keys(FORMS).map(k => `<option${k === type ? ' selected' : ''}>${k}</option>`).join('')}</select></label>` + FORMS[type][1].map(inp).join(''); gen(); };
    bf.onchange = e => { if (e.target.name === 'type') { type = e.target.value; draw(); } };
    bf.oninput = gen;
    Q('#cp').onclick = () => navigator.clipboard.writeText(Q('#out').textContent).then(() => { Q('#cp').textContent = 'Copied'; });
    draw();
  }
};

const NAV = [['work', 'Work'], ['journal', 'Journal'], ['events', 'Events'], ['people', 'People'], ['studio', 'Studio'], ['careers', 'Careers'], ['status', 'Status']];
Q('#nav').innerHTML = NAV.map(([k, t], i) => `<a href="#/${k}" data-k="${k}">${t}</a>`).join('');
const pal = Q('#pal'), pi = Q('#pi'), pl = Q('#pl'); let sel = 0, res = [];
const items = () => [
  ...D.projects.map(p => ({ t: p.name, s: p.cat, h: '#/work/' + p.slug })),
  ...NAV.map(([k, t]) => ({ t, s: 'Page', h: '#/' + k })),
  ...D.news.map(n => ({ t: n.title, s: 'Journal', h: '#/journal' })),
  ...D.team.map(m => ({ t: m.name, s: m.role, h: '#/people' })),
  { t: 'Customize the site', s: 'Action', a: () => Q('#cz').click() },
  { t: 'Follow on X', s: 'Link', h: U(D.social.x) }, { t: 'Join our Discord', s: 'Link', h: U(D.social.discord) }
];
const find = () => { const q = pi.value.trim().toLowerCase(); res = items().filter(i => (i.t + ' ' + i.s).toLowerCase().includes(q)).slice(0, 8); sel = Math.max(0, Math.min(sel, res.length - 1)); pl.innerHTML = res.map((i, k) => `<button data-i="${k}" aria-selected="${k === sel}"><b>${E(i.t)}</b><span>${E(i.s)}</span></button>`).join('') || '<p class="empty">No matches.</p>'; };
const closePal = () => { pal.hidden = true; };
const openPal = () => { pal.hidden = false; pi.value = ''; sel = 0; find(); pi.focus(); };
const go = i => { closePal(); if (i.a) i.a(); else if (i.h[0] === '#') location.hash = i.h; else open(i.h, '_blank', 'noopener'); };
pi.oninput = () => { sel = 0; find(); };
pl.onclick = e => { const b = e.target.closest('[data-i]'); if (b) go(res[+b.dataset.i]); };
pal.onclick = e => { if (e.target === pal) closePal(); };
pi.onkeydown = e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + res.length) % res.length; find(); } else if (e.key === 'Enter' && res[sel]) go(res[sel]); };
Q('#sk').onclick = openPal;
addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPal(); } else if (e.key === 'Escape' && !pal.hidden) closePal(); });
const anim = (el, n) => {
  if (!el) return; if (!n) { el.textContent = '-'; return; }
  if (root.dataset.motion === 'off') { el.textContent = n.toLocaleString(); return; }
  const t0 = performance.now(), step = t => { const k = Math.min(1, ((t || t0 + 1200) - t0) / 1200); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))).toLocaleString(); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};
const rv = () => {
  if (root.dataset.motion === 'off' || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('#main .sh,#main .lineup,#main .pc,#main .nc,#main .post,#main .ev,#main .dv,#main .tm,#main .vs>div,#main .vals>div,#main .tl,#main .facts div,#main .band,#main .mission>*,#main .mis').forEach((el, i) => { el.style.setProperty('--i', i % 6); el.classList.add('rv'); io.observe(el); });
};
let tm;
function route() {
  clearInterval(tm);
  const h = location.hash.slice(2).split('/'), v = h[0] || 'home', d = v === 'work' && h[1] && h[1][0] !== '~' && h[1], ok = Object.hasOwn(V, v) && v !== 'proj';
  const m = Q('#main'); m.classList.remove('pg'); m.innerHTML = d ? V.proj(h[1]) : ok ? V[v]() : V.nf(); void m.offsetWidth; m.classList.add('pg');
  const b = d ? B.proj : ok ? B[v] : null; if (b) b(h[1]);
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.k === v));
  document.title = (v === 'home' || !ok ? '' : v[0].toUpperCase() + v.slice(1) + ' / ') + D.name;
  scrollTo(0, 0); rv();
}
const KEY = 'altermium:theme', root = document.documentElement, mq = matchMedia('(prefers-color-scheme: dark)'), st = Q('#studio');
const OPT = [
  ['mode', 'Mode', [['dark', 'Dark'], ['light', 'Light'], ['auto', 'Auto']]],
  ['fx', 'Background', [['aurora', 'Aurora'], ['none', 'Plain'], ['glow', 'Glow'], ['grid', 'Grid'], ['noise', 'Grain'], ['spot', 'Spotlight']]],
  ['font', 'Headings', [['sans', 'Modern'], ['serif', 'Serif'], ['mono', 'Mono'], ['round', 'Round']]],
  ['density', 'Spacing', [['0.75', 'Tight'], ['1', 'Normal'], ['1.3', 'Airy']]],
  ['motion', 'Motion', [['on', 'On'], ['off', 'Off']]]
];
let T = { ...D.theme };
try { Object.assign(T, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const hex = c => /^#[0-9a-f]{6}$/i.test(c);
const lum = h => { const c = h.slice(1).match(/../g).map(x => { x = parseInt(x, 16) / 255; return x <= .04 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
const RM = matchMedia('(prefers-reduced-motion: reduce)');
const fxSync = () => {}; let mx, my;
function apply() {
  if (!hex(T.accent)) T.accent = D.theme.accent;
  root.dataset.theme = T.mode === 'auto' ? (mq.matches ? 'dark' : 'light') : T.mode;
  root.dataset.font = T.font; root.dataset.fx = T.fx; root.dataset.motion = RM.matches ? 'off' : T.motion;
  const s = root.style; s.setProperty('--acc', T.accent); s.setProperty('--on', lum(T.accent) > .4 ? '#000' : '#fff');
  s.setProperty('--tint', T.tint); s.setProperty('--r', T.radius + 'px'); s.setProperty('--d', T.density); fxSync();
}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(T)); } catch (e) {} apply(); };
const snip = () => 'theme: ' + JSON.stringify(T, null, 2) + ',';
const sync = () => { const c = Q('#code'); if (c) c.value = snip(); };
function paint() {
  const sw = (D.presets || []).map(p => `<button type="button" class="swb" data-a="${E(p.c)}" aria-label="${E(p.n)}" title="${E(p.n)}" aria-pressed="${p.c.toLowerCase() === T.accent.toLowerCase()}" style="--c:${E(p.c)}"></button>`).join('');
  st.innerHTML = `<div class="sth"><b>Customize</b><button type="button" id="sx" aria-label="Close">&times;</button></div>
<h3>Accent colour</h3><div class="sw">${sw}</div><div class="cr"><input type="color" id="cc" value="${E(T.accent)}" aria-label="Custom colour"><input id="ch" value="${E(T.accent)}" maxlength="7" aria-label="Hex colour"></div>
${OPT.map(([k, l, o]) => `<h3>${l}</h3><div class="seg">${o.map(([v, t]) => `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${String(T[k]) === v}">${t}</button>`).join('')}</div>`).join('')}
<h3>Corners <output>${T.radius}px</output></h3><input type="range" min="0" max="28" value="${T.radius}" data-r="radius" aria-label="Corner radius">
<h3>Background tint <output>${T.tint}%</output></h3><input type="range" min="0" max="20" value="${T.tint}" data-r="tint" aria-label="Background tint">
<h3>Theme code</h3><textarea id="code" rows="7" spellcheck="false">${E(snip())}</textarea>
<div class="sb"><button class="btn" type="button" id="cpy">Copy</button><button class="btn ghost" type="button" id="app">Apply pasted code</button><button class="btn ghost" type="button" id="rst">Reset</button></div>`;
}
const closeSt = () => { st.hidden = true; Q('#cz').focus(); };
st.onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.id === 'sx') return closeSt();
  if (b.dataset.a) T.accent = b.dataset.a;
  else if (b.dataset.k) T[b.dataset.k] = b.dataset.v;
  else if (b.id === 'cpy') { navigator.clipboard.writeText(Q('#code').value); b.textContent = 'Copied'; return; }
  else if (b.id === 'app') { try { Object.assign(T, JSON.parse(Q('#code').value.match(/\{[\s\S]*\}/)[0])); } catch (x) { b.textContent = 'Invalid code'; return; } }
  else if (b.id === 'rst') T = { ...D.theme };
  else return;
  save(); paint();
};
st.oninput = e => {
  const t = e.target;
  if (t.dataset.r) { T[t.dataset.r] = +t.value; t.previousElementSibling.lastElementChild.textContent = t.value + (t.dataset.r === 'radius' ? 'px' : '%'); save(); sync(); }
  else if (t.id === 'cc') { T.accent = t.value; save(); Q('#ch').value = t.value; sync(); }
};
st.onchange = e => { if (e.target.id === 'ch' && hex(e.target.value.trim())) { T.accent = e.target.value.trim(); save(); paint(); } };
Q('#cz').onclick = () => { st.hidden = !st.hidden; if (!st.hidden) paint(); };
Q('#th').onclick = () => { T.mode = root.dataset.theme === 'dark' ? 'light' : 'dark'; save(); if (!st.hidden) paint(); };
addEventListener('keydown', e => { if (e.key === 'Escape' && !st.hidden) closeSt(); });
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; root.style.setProperty('--px', (e.clientX / innerWidth - .5).toFixed(3)); root.style.setProperty('--py', (e.clientY / innerHeight - .5).toFixed(3)); if (T.fx === 'spot') { root.style.setProperty('--mx', e.clientX + 'px'); root.style.setProperty('--my', e.clientY + 'px'); } });
mq.addEventListener('change', () => { if (T.mode === 'auto') apply(); });
apply();
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});
Q('#foot').innerHTML = `<div class="fc"><div><div class="fb"><img class="logo" src="images/logo-t.png" alt="">${E(D.name)}</div><p>${E(D.about)}</p></div><div><h4>Explore</h4>${NAV.map(([k, t]) => `<a href="#/${k}">${t}</a>`).join('')}</div><div><h4>Community</h4>${D.projects.filter(p => p.cat === 'Communities').map(p => `<a href="#/work/${E(p.slug)}">${E(p.name)}</a>`).join('')}<a href="${E(U(D.social.discord))}" rel="noopener">Discord</a></div><div><h4>Follow</h4><a href="${E(U(D.social.x))}" rel="noopener">X</a><a href="#/careers">Careers</a><a href="#/post">Post builder</a></div></div><small>&copy; 2026 ${E(D.name)}. All rights reserved.</small>`;
Q('#jd').href = U(D.social.discord);
const pgb = document.createElement('div'); pgb.id = 'prog'; document.body.append(pgb);
addEventListener('scroll', () => { pgb.style.transform = 'scaleX(' + root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight) + ')'; Q('.bar').classList.toggle('sc', root.scrollTop > 8); }, { passive: true });
addEventListener('hashchange', route); route();
setInterval(() => document.querySelectorAll('[data-ts]').forEach(s => s.textContent = cd(s.dataset.ts - Date.now())), 3e4);
})();
