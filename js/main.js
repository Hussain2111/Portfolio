// ---------------------------------------------------------
// Syed Ali Hussain — Portfolio
// Mobile nav, scrollspy, reveal-on-scroll, and a live pull
// of GitHub repos so the "Work" section updates itself.
// ---------------------------------------------------------

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Sticky header shadow ---------- */
const header = document.getElementById('site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Scrollspy: highlight the active nav link ---------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
sections.forEach((section) => spyObserver.observe(section));

/* ---------- Reveal-on-scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Live GitHub projects ---------- */
const GITHUB_USER = 'Hussain2111';
const MAX_PROJECTS = 6;

// Repos to hide entirely: the portfolio itself, the profile-readme repo,
// and retired experiments.
const EXCLUDE = new Set(
  ['Portfolio', GITHUB_USER, 'Gaia', 'rosterforge'].map((n) => n.toLowerCase())
);

// Hand-curated cards for the projects worth leading with, in display order
// (grid fills left-to-right, so this array's order is the on-page order).
// These always show with this copy and these links regardless of what the
// GitHub API returns for them, so a repo's raw metadata drifting never
// changes what visitors see.
const PINNED_PROJECTS = [
  {
    name: 'Cairn',
    description: 'A personal planning tool that breaks big goals into stages that unlock one at a time, so there is always exactly one next small task to do. Built-in spaced-repetition review keeps what you learn from slipping away.',
    html_url: 'https://github.com/Hussain2111/Cairn',
    homepage: 'https://hussain2111.github.io/Cairn/',
    tags: ['JavaScript', 'PWA'],
  },
  {
    name: 'Trellis',
    description: 'An Instagram coach that pulls your own account’s analytics straight from the Graph API, benchmarks them against a scraped competitor pool, and surfaces the one gap worth fixing next, with the numbers behind every claim.',
    html_url: 'https://github.com/Hussain2111/trellis',
    homepage: null,
    tags: ['TypeScript', 'Next.js', 'Postgres', 'Vercel'],
  },
  {
    name: 'CodeLens',
    description: 'A phone PWA that photographs code on a screen or whiteboard and returns clean, selectable text: a FastAPI backend calls Gemini’s vision model to extract it, rate-limited to protect a shared free-tier quota. An optional VS Code extension pairs with the phone over a self-signed local WebSocket connection, so extracted code can land directly in an editor tab.',
    html_url: 'https://github.com/Hussain2111/CodeLens',
    homepage: 'https://code-lens-navy.vercel.app',
    tags: ['Python', 'FastAPI', 'React', 'Gemini AI'],
  },
  {
    name: 'NeuroTrade',
    description: 'A stock market prediction platform combining classic ML and deep learning (LSTM/GRU) with a data pipeline for collection, backtesting and evaluation, plus a web dashboard for visualizing predictions.',
    html_url: 'https://github.com/Hussain2111/NeuroTrade',
    homepage: 'https://neuro-trade-ten.vercel.app',
    tags: ['Python', 'Flask', 'TensorFlow', 'MongoDB'],
  },
  {
    name: 'Fina',
    description: 'Full-stack personal finance tracker (NestJS + React) with budgets, savings goals, multi-currency support, CSV bank import, and AI-driven spending insights.',
    html_url: 'https://github.com/Hussain2111/Fina',
    homepage: 'https://fina-beige.vercel.app',
    tags: ['TypeScript', 'NestJS', 'PostgreSQL'],
  },
  {
    name: 'Verisign',
    description: 'A blockchain content-authentication platform on Algorand: anyone can create an immutable, timestamped signature for a piece of content, and verified organizations issue non-transferable credentials so a signature can show who actually stands behind it. Includes a Chrome extension for in-page verification.',
    html_url: 'https://github.com/Hussain2111/verisign',
    homepage: 'https://veri-sign-wine.vercel.app',
    tags: ['TypeScript', 'Next.js', 'Algorand'],
  },
];

function projectCard(repo) {
  const description = repo.description || 'No description yet.';
  const homepage = repo.homepage && repo.homepage.trim() ? repo.homepage.trim() : null;
  const tags = repo.tags && repo.tags.length ? repo.tags : (repo.language ? [repo.language] : []);

  const card = document.createElement('article');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-card-top">
      <h3>${escapeHtml(repo.name)}</h3>
      <div class="project-card-links">
        <a class="card-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(repo.name)} on GitHub">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.29.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55 4.52-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5Z"/></svg>
        </a>
        ${homepage ? `
        <a class="card-link" href="${homepage}" target="_blank" rel="noopener noreferrer" aria-label="Open live demo of ${escapeHtml(repo.name)}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>
        </a>` : ''}
      </div>
    </div>
    <p>${escapeHtml(description)}</p>
    <div class="project-card-bottom">
      ${tags.length ? `
      <div class="project-tags">
        ${tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}
      </div>` : ''}
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderProjects(repos) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  if (!repos.length) {
    grid.innerHTML = '<p class="projects-status">No public projects to show yet — check back soon.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  repos.forEach((repo) => fragment.appendChild(projectCard(repo)));
  grid.appendChild(fragment);

  // Newly-added cards should also fade in.
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.classList.add('reveal');
    revealObserver.observe(card);
  });
}

// Pinned projects always lead the grid; remaining slots are filled with
// whatever else is most recently pushed on GitHub (excluding pinned/hidden repos).
function buildProjectList(liveRepos) {
  const pinnedNames = new Set(PINNED_PROJECTS.map((p) => p.name.toLowerCase()));
  const rest = liveRepos.filter((r) => !pinnedNames.has(r.name.toLowerCase()));
  return [...PINNED_PROJECTS, ...rest].slice(0, MAX_PROJECTS);
}

async function loadProjects() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const repos = await res.json();
    const live = repos
      .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name.toLowerCase()))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    renderProjects(buildProjectList(live));
  } catch (err) {
    console.warn('Falling back to static project list:', err);
    renderProjects(PINNED_PROJECTS.slice(0, MAX_PROJECTS));
  }
}

loadProjects();
