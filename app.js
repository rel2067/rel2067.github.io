// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let globalLevel = localStorage.getItem('lr_level') || 'beginner';
let openArticleId = null;
const PER_PAGE = 6;
const currentPage = { home: 1, browse: 1 };

// ═══════════════════════════════════════════════════════
// ARTICLES DATA  (add your articles here)
// ═══════════════════════════════════════════════════════
const articles = [

];

// ═══════════════════════════════════════════════════════
// SPECIALTIES METADATA
// ═══════════════════════════════════════════════════════
const categoryMeta = {
  "Exercise":             { icon:"🏋️",  desc:"Physical activity & performance" },
  "Nutrition":            { icon:"🥗",  desc:"Diet, food, & metabolic health" },
  "Basic Science":        { icon:"🔬",  desc:"Fundamental biology & mechanisms" },
  "Cognitive Health":     { icon:"🧠",  desc:"Brain function, memory & mental wellness" },
  "Pharmacology":         { icon:"💊",  desc:"Drugs, dosing & therapeutic targets" },
  "Diseases / Pathology": { icon:"🩺",  desc:"Disease processes & clinical conditions" }
};
// Alias for backward-compatibility
const specialtyMeta = categoryMeta;

// ═══════════════════════════════════════════════════════
// LEVEL PERSISTENCE
// ═══════════════════════════════════════════════════════
function applyLevel(level) {
  globalLevel = level;
  localStorage.setItem('lr_level', level);
  document.querySelectorAll('.level-btn').forEach(b => {
    b.classList.remove('active','beginner','intermediate','pro');
    if (b.textContent.toLowerCase().trim() === level) b.classList.add('active', level);
  });
  document.querySelectorAll('.modal-level-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.level === level)
  );
}

function switchLevel(level) {
  applyLevel(level);
  if (openArticleId !== null) {
    const a = articles.find(x => x.id === openArticleId);
    if (a) updateModalContent(a, level);
  }
  if (typeof renderHome  === 'function') renderHome();
  if (typeof renderBrowse === 'function') renderBrowse();
}

// ═══════════════════════════════════════════════════════
// CARD RENDERING
// ═══════════════════════════════════════════════════════
function cardHTML(a, delay) {
  const sum = a.summaries[globalLevel] || '';
  return `<div class="card" style="animation-delay:${delay}ms" onclick="openModal(${a.id})">
    <div class="card-header">
      <div class="card-tags">${a.tags.map(t=>`<span class="tag ${t.cls}">${t.label}</span>`).join('')}${a.isNew?'<span class="new-badge">NEW</span>':''}</div>
      <span class="card-date">${a.date}</span>
    </div>
    <div class="card-body">
      <div class="card-journal">${a.journalShort} · ${a.volume}</div>
      <div class="card-takeaway">${a.takeaway}</div>
      <div class="card-real-title">${a.title}</div>
      <div class="card-summary">${sum}</div>
    </div>
    <div class="card-footer">
      <span class="card-authors">${a.authors}</span>
      <button class="read-more">Read more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════
// PAGINATION
// ═══════════════════════════════════════════════════════
function renderPagination(containerId, total, key) {
  const totalPages = Math.ceil(total / PER_PAGE);
  const cur = currentPage[key];
  const el = document.getElementById(containerId);
  if (!el) return;
  if (totalPages <= 1) { el.innerHTML = ''; return; }
  let html = `<button class="page-btn" onclick="goPage('${key}',${cur-1})" ${cur===1?'disabled':''}>← Prev</button>`;
  for (let p = 1; p <= totalPages; p++) {
    if (p===1||p===totalPages||Math.abs(p-cur)<=1) {
      html += `<button class="page-btn ${p===cur?'active':''}" onclick="goPage('${key}',${p})">${p}</button>`;
    } else if (Math.abs(p-cur)===2) html += `<span style="color:var(--muted);padding:0 4px">…</span>`;
  }
  html += `<button class="page-btn" onclick="goPage('${key}',${cur+1})" ${cur===totalPages?'disabled':''}>Next →</button>`;
  el.innerHTML = html;
}

function goPage(key, p) {
  const totalPages = Math.ceil(articles.length / PER_PAGE);
  if (p < 1 || p > totalPages) return;
  currentPage[key] = p;
  if (key === 'home') renderHome();
  else renderBrowse();
  window.scrollTo(0, 200);
}

// ═══════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════
function openModal(id) {
  const a = articles.find(x => x.id === id);
  if (!a) return;
  openArticleId = id;
  document.getElementById('modal-tags').innerHTML = a.tags.map(t => `<span class="tag ${t.cls}">${t.label}</span>`).join('');
  document.getElementById('modal-title').textContent = a.title;
  document.getElementById('modal-meta').innerHTML = `${a.journal} &nbsp;·&nbsp; ${a.volume} &nbsp;·&nbsp; ${a.date}<br>${a.authors}`;
  const levels = ['beginner','intermediate','pro'];
  document.getElementById('modal-level-tabs').innerHTML = levels.map(l =>
    `<button class="modal-level-btn${l===globalLevel?' active':''}" data-level="${l}" onclick="switchLevel('${l}')">${l.charAt(0).toUpperCase()+l.slice(1)}</button>`
  ).join('');
  updateModalContent(a, globalLevel);
  document.getElementById('modal-doi').textContent = `DOI: ${a.doi}`;
  document.getElementById('modal-pubmed').href = a.sourceUrl;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalContent(a, level) {
  document.getElementById('modal-summary').textContent = a.summaries[level] || '';
  const kpSec = document.getElementById('modal-keypoints-section');
  const kp    = document.getElementById('modal-keypoints');
  if (a.keyPoints?.length) { kpSec.style.display=''; kp.innerHTML = a.keyPoints.map(p=>`<li>${p}</li>`).join(''); }
  else kpSec.style.display='none';
  const ctxSec = document.getElementById('modal-context-section');
  const ctx    = document.getElementById('modal-context');
  if (a.context) { ctxSec.style.display=''; ctx.textContent = a.context; } else ctxSec.style.display='none';
  const limSec = document.getElementById('modal-limitations-section');
  const lim    = document.getElementById('modal-limitations');
  if (a.limitations) { limSec.style.display=''; lim.textContent = a.limitations; } else limSec.style.display='none';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  openArticleId = null;
}
function closeModalOutside(e) { if (e.target === document.getElementById('modal-overlay')) closeModal(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Apply persisted level on load
document.addEventListener('DOMContentLoaded', () => applyLevel(globalLevel));
