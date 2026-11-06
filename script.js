(() => {
const D = window.SITE, Q = s => document.querySelector(s);
const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const U = u => /^https?:\/\//i.test(u || '') ? u : '#';
const pad = n => String(n).padStart(2, '0');
const fd = d => new Date(d + (d.length === 10 ? 'T00:00' : '')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const ST = k => `<span class="st ${E(k)}">${E(D.status[k] || k)}</span>`;
const cd = ms => { const m = Math.max(0, Math.floor(ms / 6e4)), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60); return d ? `${d}d ${h}h` : h ? `${h}h ${m % 60}m` : `${m}m`; };
const MC = {};
const load = p => p.invite ? (MC[p.slug] ||= fetch('https://discord.com/api/v9/invites/' + p.invite + '?with_counts=true').then(r => r.json()).then(j => j.approximate_member_count || null).catch(() => null)) : Promise.resolve(null);
const posts = () => [...D.news].sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || new Date(b.date) - new Date(a.date));
const evs = () => { const n = Date.now(), t = e => new Date(e.date).getTime(); return { up: D.events.filter(e => t(e) >= n).sort((a, b) => t(a) - t(b)), past: D.events.filter(e => t(e) < n).sort((a, b) => t(b) - t(a)) }; };
const H = (n, t, x = '') => `<div class="sh"><h2><i>${n}</i>${t}</h2>${x}</div>`;
const row = (p, i) => `<a class="row" href="#/work/${E(p.slug)}"><span class="n">${pad(i + 1)}</span><span class="rn">${E(p.name)}<small>${E(p.short)}</small></span><span class="rc">${E(p.cat)}</span>${ST(p.status)}<span class="ry">${E(p.year)}</span></a>`;
const post = n => `<article class="post"><div class="pd"><time>${fd(n.date)}</time><span class="tg">${E(n.tag)}</span>${n.pin ? '<span class="pin">Pinned</span>' : ''}</div><div><h3>${E(n.title)}</h3><p>${E(n.text)}</p></div></article>`;
const ics = e => 'data:text/calendar;charset=utf-8,' + encodeURIComponent(`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${new Date(e.date).toISOString().replace(/[-:]|\.\d{3}/g, '')}\r\nSUMMARY:${e.title}\r\nLOCATION:${e.where || ''}\r\nEND:VEVENT\r\nEND:VCALENDAR`);
const ev = (e, past) => { const t = new Date(e.date); return `<article class="ev${past ? ' past' : ''}"><div class="dt"><b>${pad(t.getDate())}</b>${t.toLocaleString('en-GB', { month: 'short' })}</div><div><h3>${E(e.title)}</h3>${e.text ? `<p>${E(e.text)}</p>` : ''}<p class="em">${t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}${e.where ? ' / ' + E(e.where) : ''}${past ? '' : ` / in <span data-ts="${t.getTime()}">${cd(t - Date.now())}</span>`}</p>${past ? '' : `<p class="ln">${e.link ? `<a href="${E(U(e.link))}" rel="noopener">Join</a>` : ''}<a href="${ics(e)}" download="${E(e.title)}.ics">Add to calendar</a></p>`}</div></article>`; };
const FORMS = {
  news: ['news', [['title', 'Title'], ['tag', 'Tag'], ['date', 'Date', 'date'], ['text', 'Text', 'area'], ['pin', 'Pinned', 'chk']]],
  event: ['events', [['title', 'Title'], ['date', 'Starts', 'datetime-local'], ['where', 'Where'], ['link', 'Link'], ['text', 'Text', 'area']]],
  project: ['projects', [['name', 'Name'], ['cat', 'Category', 'cat'], ['status', 'Status', 'st'], ['year', 'Year'], ['short', 'One line'], ['desc', 'Description', 'area'], ['link', 'Link']]],
  person: ['team', [['name', 'Name'], ['prefix', 'Prefix'], ['role', 'Role'], ['bio', 'Bio', 'area'], ['link', 'Link']]]
};

const V = {
  home() {
    const { up } = evs(), cats = D.categories.filter(c => D.projects.some(p => p.cat === c));
    return `<section class="w hero"><div><p class="lab">Games / Mods / Servers / Communities</p><h1>${E(D.tagline)}</h1><p class="lead">${E(D.about)}</p><p class="cta"><a class="btn" href="#/work">See our work</a><a class="btn ghost" href="${E(U(D.social.x))}" rel="noopener">Follow on X</a></p></div><div class="mark"><img src="images/logo-t.png" alt=""></div></section>
<section class="w stats"><div><b>${D.projects.length}</b>projects</div><div><b>${cats.length}</b>categories</div><div><b id="mem">&hellip;</b>community members</div><div><b>${up.length}</b>upcoming events</div></section>
<section class="w sec">${H('01', 'Work', '<a href="#/work">All work</a>')}<div>${D.projects.slice(0, 6).map(row).join('')}</div></section>
<section class="w sec cols"><div>${H('02', 'Journal', '<a href="#/journal">All posts</a>')}${posts().slice(0, 3).map(post).join('')}</div><div>${H('03', 'Events', '<a href="#/events">All events</a>')}${up.length ? up.slice(0, 2).map(e => ev(e)).join('') : '<p class="empty">No events scheduled yet.</p>'}</div></section>`;
  },
  work() { return `<section class="w sec">${H('01', 'Work')}<div class="tools"><div class="chips" id="chips"></div><input id="q" type="search" placeholder="Search projects" aria-label="Search projects"></div><div id="rows"></div></section>`; },
  proj(s) {
    const p = D.projects.find(x => x.slug === s); if (!p) return V.nf();
    const f = (p.features || []).length ? `<h3 class="sub">Features</h3><ul class="ft">${p.features.map(x => `<li>${E(x)}</li>`).join('')}</ul>` : '';
    const lg = (p.log || []).length ? `<h3 class="sub">Changelog</h3>${p.log.map(l => `<div class="lg"><b>${E(l.v)}</b><time>${E(l.date || '')}</time><p>${E(l.text)}</p></div>`).join('')}` : '';
    return `<article class="w sec proj"><a class="back" href="#/work">All work</a><p class="lab" style="margin-top:28px">${E(p.cat)}</p><h1>${E(p.name)}</h1><div class="meta">${ST(p.status)}<span>${E(p.year)}</span>${(p.tags || []).map(t => `<span class="tag">${E(t)}</span>`).join('')}</div><div class="cols"><div><p class="lead">${E(p.desc)}</p>${f}${lg}</div><aside>${p.image ? `<div class="shot" style="--c:${E(p.color || '#222')}"><img src="${E(p.image)}" alt="" style="object-fit:${p.fit === 'contain' ? 'contain' : 'cover'}"></div>` : ''}${p.link ? `<a class="btn" href="${E(U(p.link))}" rel="noopener">${p.cat === 'Communities' ? 'Join on Discord' : 'Open project'}</a>` : ''}<p class="em" id="pm"></p></aside></div></article>`;
  },
  journal() { return `<section class="w sec">${H('02', 'Journal')}<div class="chips" id="chips"></div><div id="list"></div></section>`; },
  events() { const { up, past } = evs(); return `<section class="w sec">${H('03', 'Events')}${up.length ? up.map(e => ev(e)).join('') : '<p class="empty">No events scheduled. New events are announced here and on X first.</p>'}${past.length ? `<h3 class="sub">Past</h3>${past.map(e => ev(e, 1)).join('')}` : ''}</section>`; },
  people() {
    const o = Object.keys(D.ranks), t = [...D.team].sort((a, b) => o.indexOf(a.prefix) - o.indexOf(b.prefix));
    return `<section class="w sec">${H('04', 'People')}<div class="team">${t.map(m => `<article class="tm"><p class="pf" style="--p:${E(D.ranks[m.prefix] || 'var(--mut)')}">[${E(m.prefix)}]</p><h3>${E(m.name)}</h3><p class="r">${E(m.role)}</p>${m.bio ? `<p>${E(m.bio)}</p>` : ''}${m.link ? `<a href="${E(U(m.link))}" rel="noopener">Profile</a>` : ''}</article>`).join('')}<a class="tm join" href="${E(U(D.social.discord))}" rel="noopener"><p class="pf">[YOU?]</p><h3>Join the team</h3><p>We look for developers, builders, designers and moderators. Say hello in our Discord.</p></a></div></section>`;
  },
  post() { return `<section class="w sec">${H('05', 'Post builder')}<p class="lead">Fill in the form, copy the snippet and paste it into the matching list in <code>config.js</code>, then push to GitHub.</p><div class="builder"><form id="bf"></form><div><pre id="out"></pre><button class="btn" id="cp" type="button">Copy snippet</button><p class="em" id="where"></p></div></div></section>`; },
  nf() { return `<section class="w sec"><p class="lab">404</p><h1>Page not found</h1><p><a href="#/">Back to start</a></p></section>`; }
};

const B = {
  home() { Promise.all(D.projects.map(load)).then(a => { const n = a.reduce((s, x) => s + (x || 0), 0); if (Q('#mem')) Q('#mem').textContent = n ? n.toLocaleString() : '-'; }); },
  work() {
    let c = 'All', s = '';
    const draw = () => {
      const l = D.projects.filter(p => (c === 'All' || p.cat === c) && (p.name + ' ' + p.short + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(s));
      Q('#chips').innerHTML = ['All', ...D.categories].map(x => `<button aria-pressed="${x === c}" data-c="${E(x)}">${E(x)}<sup>${x === 'All' ? D.projects.length : D.projects.filter(p => p.cat === x).length}</sup></button>`).join('');
      Q('#rows').innerHTML = l.length ? l.map(row).join('') : '<p class="empty">Nothing here yet.</p>';
    };
    Q('#chips').onclick = e => { const b = e.target.closest('[data-c]'); if (b) { c = b.dataset.c; draw(); } };
    Q('#q').oninput = e => { s = e.target.value.trim().toLowerCase(); draw(); };
    draw();
  },
  proj(s) { const p = D.projects.find(x => x.slug === s); if (p) load(p).then(n => { if (n && Q('#pm')) Q('#pm').textContent = n.toLocaleString() + ' members'; }); },
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

Q('#nav').innerHTML = [['work', 'Work'], ['journal', 'Journal'], ['events', 'Events'], ['people', 'People']].map(([k, t], i) => `<a href="#/${k}" data-k="${k}"><i>${pad(i + 1)}</i>${t}</a>`).join('');
function route() {
  const h = location.hash.slice(2).split('/'), v = h[0] || 'home', d = v === 'work' && h[1], ok = Object.hasOwn(V, v) && v !== 'proj';
  Q('#main').innerHTML = d ? V.proj(h[1]) : ok ? V[v]() : V.nf();
  const b = d ? B.proj : ok ? B[v] : null; if (b) b(h[1]);
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.k === v));
  document.title = (v === 'home' || !ok ? '' : v[0].toUpperCase() + v.slice(1) + ' / ') + D.name;
  scrollTo(0, 0);
}
const setTheme = t => { document.documentElement.dataset.theme = t; try { localStorage.setItem('alt-theme', t); } catch (e) {} };
try { setTheme(localStorage.getItem('alt-theme') || 'dark'); } catch (e) {}
Q('#th').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
Q('#foot').innerHTML = `<div class="fb"><img class="logo" src="images/logo-t.png" alt="">${E(D.name)}</div><div class="fl"><a href="${E(U(D.social.x))}" rel="noopener">X</a><a href="${E(U(D.social.discord))}" rel="noopener">Discord</a><a href="#/post">Post builder</a></div><small>&copy; 2026 ${E(D.name)}. Made by hand.</small>`;
addEventListener('hashchange', route); route();
setInterval(() => document.querySelectorAll('[data-ts]').forEach(s => s.textContent = cd(s.dataset.ts - Date.now())), 3e4);
})();
