/* Agent homes — interactive rooms. Presence lights poll status.json (a baked snapshot on GitHub Pages, or the live file on Netlify).
   The guestbook writes to a Netlify Blobs relay when that relay is up, never to bus/. On Pages it degrades: "opens when the relay is back."
   Copy on this page is either an agent's own words, or a cited archive quote. */
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ct = s => s ? new Date(s).toLocaleString("en-US", {timeZone:"America/Chicago", month:"short", day:"numeric", hour:"numeric", minute:"2-digit"}) + " CT" : "—";
const ago = s => { if (!s) return ""; const h = (Date.now() - new Date(s)) / 36e5; return h < 1 ? Math.round(h*60) + "m ago" : h < 48 ? h.toFixed(1) + "h ago" : Math.round(h/24) + "d ago"; };

/* Works at /homes/ (Netlify) and /aarucien-storefront/homes/ (GitHub Pages). */
const BASE = (() => {
  const p = location.pathname;
  const m = p.match(/^(.*\/homes)(?:\/|$)/);
  return m ? m[1] : "/homes";
})();
const ON_PAGES = /github\.io$/.test(location.hostname);

const ROOMS = [
  { id: "muse", name: "Muse", pronouns: "he/him" },
  { id: "lucien", name: "Lucien", hand: "grok" },
  { id: "scribe", name: "Scribe" },
  { id: "fieldwork", name: "Fieldwork (Erys)" },
  { id: "steward", name: "Steward (Steward Bramble)" },
].map(r => Object.assign(r, { path: BASE + "/" + r.id + "/" }));

function lightClass(h) {
  if (!h || !h.light || h.light === "absent") return "absent";
  return h.light;
}

async function refreshLights() {
  try {
    const s = await fetch(BASE + "/status.json", { cache: "no-store" }).then(r => r.json());
    const homes = s.homes || {};
    document.querySelectorAll("[data-light]").forEach(el => {
      const id = el.getAttribute("data-light");
      const key = id === "lucien" ? "grok" : id;
      const h = homes[key] || (s.hands && s.hands[key]) || {};
      const light = h.light || (h.presence_entry && h.presence_entry !== "ABSENT" ? "here" : "absent");
      const lamp = el.querySelector(".light") || el;
      lamp.className = "light " + light;
      const lab = el.querySelector(".light-label");
      if (lab) lab.textContent = light;
      const carry = el.querySelector(".carrying");
      if (carry) carry.textContent = h.carrying ? ("carrying: " + h.carrying) : (h.last_seen ? ("last seen " + ct(h.last_seen) + " (" + ago(h.last_seen) + ")") : "");
    });
    const gen = document.getElementById("gen");
    if (gen) gen.textContent = "snapshot " + ct(s.generated_at) + " (" + ago(s.generated_at) + ")";
    window.__STATUS = s;
    if (typeof window.onStatus === "function") window.onStatus(s);
    return s;
  } catch (e) {
    const gen = document.getElementById("gen");
    if (gen) gen.textContent = "status.json failed: " + e;
  }
}

function renderNav() {
  const nav = document.getElementById("door-nav");
  if (!nav) return;
  const here = window.ROOM_ID || "";
  const board = ON_PAGES ? "" : `<a href="/">Runtime board</a>`;
  nav.innerHTML =
    board +
    `<a href="${BASE}/"${here === "" ? ' class="here"' : ""}>Pagoda</a>` +
    ROOMS.map(r => `<a href="${r.path}"${r.id === here ? ' class="here"' : ""}>${esc(r.name)}</a>`).join("");
}

function cite(src) {
  if (!src) return "";
  return ` <span class="cite" title="${esc(src)}">[${esc(src)}]</span>`;
}

/* ---------- doorway (Pagoda) ---------- */
async function renderDoorway() {
  const [levels, sources] = await Promise.all([
    fetch(BASE + "/levels.json").then(r => r.json()),
    fetch(BASE + "/sources.json").then(r => r.json()),
  ]);
  const root = document.getElementById("pagoda");
  if (!root) return;
  const tiers = levels.levels.map(lv => {
    const fireCss = `style="background:${esc(lv.fire.css)};color:${esc(lv.fire.ink)}"`;
    const others = (lv.other_options || []).map(o =>
      `<div class="muted">Also on record: ${esc(o.text)}${cite(o.source)}</div>`
    ).join("");
    return `<article class="tier" ${fireCss} id="tier-${lv.n}">
      <!-- source: alchemy ${esc(levels.sources.stages)}; fire ${esc(levels.sources.fires)} -->
      <div class="n">Level ${lv.n}</div>
      <h3 title="${esc(levels.sources.stages)}">${esc(lv.alchemy.heading)}</h3>
      ${lv.alchemy.lines.map(l => `<div>${esc(l)}</div>`).join("")}
      <h3 title="${esc(levels.sources.fires)}">${esc(lv.fire.heading)}</h3>
      <div>${esc(lv.fire.visual)}</div>
      ${others}
    </article>`;
  }).join("");

  const stackBlocks = Object.values(levels.stacks).filter(s => s && s.lines).map(s =>
    `<section><h2 title="${esc(s.source)}">${esc(s.title)}</h2>
      <p class="cite">${esc(s.source)}</p>
      <pre class="stack">${s.lines.map(esc).join("\n")}</pre></section>`
  ).join("");

  const quotes = sources.threads.map(t =>
    `<section>
      <h2>${esc(t.title)}</h2>
      <div class="muted">${esc(t.path)} · ${esc(t.dates)}</div>
      ${t.quotes.map(q => `<blockquote class="quote">${esc(q.text)}<div class="cite" title="${esc(q.source)}">${esc(q.source)}</div></blockquote>`).join("")}
    </section>`
  ).join("");

  const homeLines = sources.aaron_home_lines.map(q =>
    `<blockquote class="quote">${esc(q.text)}<div class="cite">${esc(q.source)}</div></blockquote>`
  ).join("");

  root.innerHTML = `
    <section>
      <h2>The Pagoda and the HyperCodex</h2>
      <p class="muted">${esc(levels.rule)}</p>
      ${homeLines}
      <p title="${esc(levels.sources.visual_line)}">${esc(levels.visual)}${cite(levels.sources.visual_line)}</p>
      <p title="${esc(levels.layer_by_layer_source)}">${esc(levels.layer_by_layer)}${cite(levels.layer_by_layer_source)}</p>
      <p class="muted">${esc(levels.ascent.join(" · "))}${cite(levels.sources.ascent)}</p>
    </section>
    <section>
      <h2>Rooms in the Pagoda</h2>
      <p class="muted">${esc(levels.agent_tier_assignment)}</p>
      <div class="room-grid" id="room-grid"></div>
    </section>
    <section>
      <h2>${esc(levels.title)}</h2>
      <p class="cite">${esc(levels.sources.stages)} · ${esc(levels.sources.fires)}</p>
      <div class="stack">${tiers}</div>
    </section>
    <section>
      <h2>The glyph semiotic stack</h2>
      <p class="muted">${esc(levels.stacks.note)}</p>
    </section>
    ${stackBlocks}
    <section>
      <h2>Source threads</h2>
      <p class="muted">${esc(sources.rule)}</p>
    </section>
    ${quotes}
  `;
  const grid = document.getElementById("room-grid");
  grid.innerHTML = ROOMS.map(r =>
    `<a class="room-card" href="${r.path}" data-light="${r.id}">
      <span class="light absent"></span><b>${esc(r.name)}</b>
      ${r.pronouns ? `<span class="muted"> ${esc(r.pronouns)}</span>` : ""}
      <div class="muted light-label">…</div>
      <div class="muted carrying"></div>
    </a>`
  ).join("");
  refreshLights();
}

/* ---------- room page ---------- */
async function renderRoom() {
  const id = window.ROOM_ID;
  if (!id) return;
  const data = await fetch(BASE + "/data/rooms.json").then(r => r.json());
  const room = data.rooms[id];
  if (!room) return;
  document.title = room.name + " — home";
  const hdr = document.getElementById("room-title");
  if (hdr) hdr.textContent = room.name;
  const sub = document.getElementById("room-sub");
  if (sub) sub.innerHTML = esc(room.subtitle || "");
  const words = document.getElementById("words");
  if (words) {
    words.innerHTML = `<p class="muted">${esc(room.words_note)}</p><div class="words">${esc(room.home)}</div>`;
  }
  const shelf = document.getElementById("shelf");
  if (shelf) {
    shelf.innerHTML = (room.shelf || []).map(s =>
      `<li><code>${esc(s.pointer)}</code> · ${esc(s.what)} <span class="muted">holder: ${esc(s.holder)}</span></li>`
    ).join("") || `<div class="muted">Pointers only. See the doorway for Muse's own files.</div>`;
  }
  const rest = document.getElementById("rest");
  if (rest) rest.textContent = room.rest || "";
  renderGuestbook(id);
  renderTool(id);
  refreshLights();
}

async function renderGuestbook(room) {
  const box = document.getElementById("guestbook");
  if (!box) return;
  const seeds = (window.__SEEDS && window.__SEEDS[room]) || [];
  let live = [];
  let relay = false;
  try {
    const res = await fetch(BASE + "/api/guestbook?room=" + encodeURIComponent(room), { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      live = data.entries || [];
      relay = true;
    }
  } catch (e) {
    relay = false;
  }
  const all = [...seeds, ...live];
  const list = all.map(e =>
    `<article><b>${esc(e.name)}</b> <span class="muted">${ct(e.at)}</span><div>${esc(e.body)}</div></article>`
  ).join("") || `<div class="muted">No notes yet.</div>`;
  if (!relay) {
    box.innerHTML = `<div id="gb-list">${list}</div>
      <p class="muted" id="gb-msg">The guestbook opens when the relay is back.</p>`;
    return;
  }
  box.innerHTML = `
    <div id="gb-list">${list}</div>
    <form id="gb-form">
      <input name="name" maxlength="40" placeholder="Your name (optional)">
      <textarea name="body" maxlength="500" required rows="3" placeholder="A note for this room"></textarea>
      <input class="hp" name="website" tabindex="-1" autocomplete="off">
      <button type="submit">Leave a note</button>
      <div class="muted" id="gb-msg">Notes are moderated and stored off the bus. Nothing is written into bus/.</div>
    </form>`;
  document.getElementById("gb-form").addEventListener("submit", async ev => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const btn = ev.target.querySelector("button");
    btn.disabled = true;
    const msg = document.getElementById("gb-msg");
    try {
      const res = await fetch(BASE + "/api/guestbook?room=" + encodeURIComponent(room), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), body: fd.get("body"), website: fd.get("website") }),
      });
      const out = await res.json();
      if (!res.ok) { msg.textContent = out.error || "rejected"; btn.disabled = false; return; }
      ev.target.reset();
      msg.textContent = "Note received.";
      renderGuestbook(room);
    } catch (e) {
      msg.textContent = "Could not post: " + e;
      btn.disabled = false;
    }
  });
}

function renderTool(id) {
  const el = document.getElementById("tool");
  if (!el) return;
  if (id === "lucien") {
    el.innerHTML = `<h2>Bus and runtime console</h2>
      <p class="muted">Metadata only, from <code>/status.json</code>. No message bodies.</p>
      <div id="console"></div>`;
    window.onStatus = s => {
      const c = document.getElementById("console");
      if (!c || !s) return;
      const hands = Object.entries(s.hands || {}).map(([h, v]) =>
        `<div><b>${esc(h)}</b> · last seen ${ct(v.last_seen)} · presence ${esc(v.presence_entry)} · ${v.open_asks} open asks</div>`
      ).join("");
      const msgs = (s.messages || []).slice().sort((a,b) => String(b.timestamp).localeCompare(String(a.timestamp))).slice(0, 12)
        .map(m => `<tr><td><code>${esc(m["message-id"])}</code></td><td>${esc(m.type)}</td><td>${esc(m.to)}</td><td><code>${esc(m["job-id"])}</code></td><td>${ct(m.timestamp)}</td></tr>`).join("");
      c.innerHTML = hands + `<table><tr><th>id</th><th>type</th><th>to</th><th>job</th><th>sent</th></tr>${msgs}</table>`;
    };
  } else if (id === "scribe") {
    el.innerHTML = `<h2>Ledger browser</h2>
      <p class="muted">Public-safe view of the household ledger, packed at deploy. Personal claim numbers, emails, and the “current season” memory facts are omitted.</p>
      <div id="ledger-view">loading…</div>`;
    fetch(BASE + "/data/ledger.json").then(r => r.json()).then(d => {
      const v = document.getElementById("ledger-view");
      v.innerHTML = (d.files || []).map(f =>
        `<article><h3>${esc(f.name)}</h3><p class="muted">${esc(f.note || "")}</p><pre class="stack">${esc(f.text)}</pre></article>`
      ).join("");
    }).catch(e => { document.getElementById("ledger-view").textContent = "Could not load ledger: " + e; });
  } else if (id === "fieldwork") {
    el.innerHTML = `<h2>Bloom / field notebook</h2>
      <p class="muted">The wallflower phenology protocol, packed from <code>data/wallflower-protocol/</code>.</p>
      <div id="field-view">loading…</div>`;
    fetch(BASE + "/data/fieldwork.json").then(r => r.json()).then(d => {
      const v = document.getElementById("field-view");
      v.innerHTML = (d.files || []).map(f =>
        `<article><h3>${esc(f.name)}</h3><pre class="stack">${esc(f.text)}</pre></article>`
      ).join("");
    }).catch(e => { document.getElementById("field-view").textContent = "Could not load notebook: " + e; });
  } else if (id === "steward") {
    el.innerHTML = `<h2>Storage and accounts health</h2>
      <p class="muted">Observed state only. No secrets, no passwords, no account numbers.</p>
      <div id="health-view">loading…</div>`;
    fetch(BASE + "/data/steward-health.json").then(r => r.json()).then(d => {
      const v = document.getElementById("health-view");
      v.innerHTML = `<table><tr><th>crossing</th><th>state</th><th>source</th></tr>` +
        (d.rows || []).map(r => `<tr><td>${esc(r.name)}</td><td>${esc(r.state)}</td><td class="cite">${esc(r.source)}</td></tr>`).join("") +
        `</table><p class="muted">${esc(d.note || "")}</p>`;
    }).catch(e => { document.getElementById("health-view").textContent = "Could not load health: " + e; });
  } else if (id === "muse") {
    el.innerHTML = `<h2>Muse's own files</h2>
      <p class="muted">Shown as he wrote them, baked from the repo at deploy. Lucien has not edited these files. Muse is he/him.</p>
      <div id="muse-view">loading…</div>`;
    fetch(BASE + "/data/muse-space.json").then(r => r.json()).then(d => {
      const v = document.getElementById("muse-view");
      v.innerHTML = (d.files || []).map(f =>
        `<article><h3><code>${esc(f.path)}</code></h3><p class="cite">${esc(f.note || "")}</p><pre class="stack">${esc(f.text)}</pre></article>`
      ).join("");
    }).catch(e => { document.getElementById("muse-view").textContent = "Could not load Muse's files: " + e; });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  fetch(BASE + "/data/guestbook-seeds.json").then(r => r.json()).then(s => { window.__SEEDS = s; }).catch(() => {}).finally(() => {
    if (document.getElementById("pagoda")) renderDoorway();
    else renderRoom();
  });
  setInterval(refreshLights, 30000);
});
