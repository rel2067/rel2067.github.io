// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let globalLevel = localStorage.getItem('lr_level') || 'beginner';
let openArticleId = null;
const PER_PAGE = 6;
const currentPage = { home: 1, browse: 1 };

// ═══════════════════════════════════════════════════════
// ARTICLES DATA
// ── specialty is now an ARRAY so one article can belong
//    to multiple categories, e.g.:
//    specialty: ["Basic Science", "Diseases / Pathology"]
// ═══════════════════════════════════════════════════════
const articles = [

  {id:1, specialty:["Basic Science", "Diseases / Pathology"], year:"2023", date:"Jul 2023",
    takeaway:"SERINC proteins restrict HIV-1 by acting as lipid transporters that scramble the viral membrane, disrupting the envelope structure needed for infection.",
    title:"Antiviral HIV-1 SERINC restriction factors disrupt virus membrane asymmetry",
    journal:"Nature Communications", journalShort:"Nat Commun",
    volume:"14:4368",
    doi:"10.1038/s41467-023-39262-2", sourceUrl:"https://pmc.ncbi.nlm.nih.gov/articles/PMC10359404/",
    authors:"Leonhardt SA, Purdy MD, Grover JR, Yang Z, Poulos S, McIntire WE, Tatham EA, Erramilli SK, Nosol K, Lai KK, Ding S, Lu M, Uchil PD, Finzi A, Rein A, Kossiakoff AA, Mothes W, Yeager M",
    tags:[{label:"Basic Science",cls:"blue"},{label:"Basic Science Study",cls:"green"}], isNew:true,
    keyPoints:[
      "SERINC3 and SERINC5 are human proteins that reduce HIV-1 infectivity when incorporated into the viral envelope",
      "CryoEM revealed SERINC3's architecture closely resembles non-ATP-dependent lipid transporters",
      "Purified SERINC proteins flip phosphatidylserine, phosphatidylethanolamine, and phosphatidylcholine across membranes",
      "This lipid scrambling disrupts normal membrane asymmetry and alters the conformation of the viral envelope protein (Env)",
      "HIV's Nef protein counteracts SERINC by rerouting it away from the viral envelope before the virus buds"
    ],
    summaries:{
      beginner:"HIV is one of the most studied viruses in history, yet researchers are still uncovering the molecular tricks our own cells use to fight it. Your body makes proteins called SERINC3 and SERINC5 that can get embedded in HIV's outer membrane and make the virus far less infectious. Scientists knew this happened, but they did not understand why. This study set out to answer that question. Using a powerful imaging technique called cryo-electron microscopy, researchers determined the three-dimensional structure of SERINC3 for the first time. The structure looked strikingly similar to proteins that shuttle lipids — the fatty molecules that make up cell membranes. When the team tested this idea directly, they confirmed that SERINC proteins physically flip lipids from one side of a membrane to the other. In a healthy viral membrane, certain lipids are carefully kept on the inside. SERINC scrambles that arrangement, exposing normally hidden lipids on the outer surface. That disruption changes the shape of the proteins on HIV's outer coat that the virus needs to fuse with and enter human cells. Without the right membrane geometry, HIV becomes far less able to infect. HIV does have a workaround — a viral protein called Nef reroutes SERINCs away from the envelope before the virus forms — but understanding exactly how SERINCs work opens new doors for antiviral thinking.",
      intermediate:"SERINC3 and SERINC5 are host restriction factors incorporated into HIV-1 particles that substantially reduce viral infectivity, but their structural basis and mechanism of action were previously unknown. This study used single-particle cryo-electron microscopy to resolve the structure of full-length human SERINC3 at 4.2 Å resolution. The resulting map revealed an architecture of two alpha-helical bundles connected by a ~40-residue diagonal crossmember helix, closely resembling non-ATP-dependent lipid transporter proteins. To test the functional implication of this structural similarity, purified hSERINC3 and hSERINC5 were reconstituted into proteoliposomes and assayed for lipid flipping activity. Both proteins drove transbilayer movement of phosphatidylserine (PS), phosphatidylethanolamine (PE), and phosphatidylcholine (PC). In HIV-1 and murine leukemia virus (MLV) models, SERINC3, SERINC5, and the known scramblase TMEM16F all exposed PS on the viral surface and reduced infectivity. This loss of membrane asymmetry correlated strongly with conformational changes in the envelope glycoprotein (Env) and restriction activity. The viral protein Nef in HIV-1 and GlycoGag in MLV each counteracted SERINC by preventing its incorporation into the viral envelope, preserving membrane asymmetry and infectivity.",
      pro:"SERINC3 and SERINC5 are multipass transmembrane restriction factors incorporated into retroviral envelopes that reduce infectivity through an incompletely characterized mechanism. Prior work established that SERINC5 alters Env conformation and impedes membrane fusion intermediates, but without structural data the molecular basis remained elusive. Here, single-particle cryoEM of full-length wild-type hSERINC3 — stabilized via a synthetic Fab complex — yielded a map at 4.2 Å mean resolution. The structure consists of two alpha-helical bundles bridged by a ~40-residue, steeply tilted crossmember helix, a topology with marked resemblance to non-ATP-dependent lipid scramblases and flippases. Functional reconstitution of purified hSERINC3 and hSERINC5 into proteoliposomes confirmed transbilayer flipping of PS, PE, and PC, establishing SERINCs as bona fide lipid transporters. In parallel retroviral infectivity assays using HIV-1 and MLV, both hSERINCs and the canonical scramblase mTMEM16F exposed PS on the outer viral leaflet, altered Env conformation as measured by epitope accessibility, and suppressed infectivity. These phenotypes were rescued by Nef in HIV-1 and GlycoGag in MLV, which counteract restriction by diverting SERINC from the assembly site. A cryoEM map of the ΔICL4 deletion mutant — removing the acidic cluster motif implicated in Nef/AP2-mediated endosomal rerouting — further informed the structural basis of Nef antagonism. Collectively, these data establish that SERINC-driven loss of membrane lipid asymmetry is mechanistically coupled to Env conformational change and restriction activity across retroviral systems."
    },
    context:"Despite decades of HIV research, the molecular basis of host-encoded restriction factors has remained incompletely understood. Defining how SERINC proteins work at the structural level is significant because it identifies membrane lipid asymmetry as a functional determinant of viral envelope integrity — a concept with implications beyond HIV for other enveloped viruses that rely on precise lipid organization for fusion competence.",
    limitations:"The study was conducted primarily in cell-based and proteoliposome reconstitution systems. Direct structural characterization of SERINC5 — the more potent isoform — was not achieved, with AlphaFold modeling used in its place. Causal directionality between lipid scrambling, Env conformational change, and infectivity loss is strongly suggested by correlation but has not yet been formally dissected with experiments that isolate each step independently."
  },

];

// ═══════════════════════════════════════════════════════
// CATEGORY METADATA
// All seven allowed categories. specialty arrays are
// matched against these keys for filtering and display.
// ═══════════════════════════════════════════════════════
const categoryMeta = {
  "Exercise":             { icon:"🏋️",  desc:"Physical activity & performance" },
  "Nutrition":            { icon:"🥗",  desc:"Diet, food, & metabolic health" },
  "Basic Science":        { icon:"🔬",  desc:"Fundamental biology & mechanisms" },
  "Cognitive Health":     { icon:"🧠",  desc:"Brain function, memory & mental wellness" },
  "Pharmacology":         { icon:"💊",  desc:"Drugs, dosing & therapeutic targets" },
  "Diseases / Pathology": { icon:"🩺",  desc:"Disease processes & clinical conditions" },
  "Historical Papers":    { icon:"📜",  desc:"Landmark & foundational studies" }
};

// ═══════════════════════════════════════════════════════
// HELPER — normalize specialty to always be an array
// ═══════════════════════════════════════════════════════
function getCategories(a) {
  if (Array.isArray(a.specialty)) return a.specialty;
  if (a.specialty) return [a.specialty];
  return [];
}

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
