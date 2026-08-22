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

// Repos to skip: the portfolio itself and the profile-readme repo.
const EXCLUDE = new Set(['Portfolio', GITHUB_USER]);

// Fallback used if the GitHub API is unreachable or rate-limited.
const FALLBACK_PROJECTS = [
  {
    name: 'trellis',
    description: 'An Instagram coach that benchmarks your posts against your niche, names the one gap worth fixing, and drafts content to close it — with the receipts behind every claim.',
    html_url: 'https://github.com/Hussain2111/trellis',
    language: 'TypeScript',
  },
  {
    name: 'CodeLens',
    description: 'Turns photos of code into usable source files: a FastAPI backend extracts code from images, with a Vite/React frontend for capturing and reviewing it.',
    html_url: 'https://github.com/Hussain2111/CodeLens',
    language: 'Python',
  },
  {
    name: 'Cairn',
    description: 'A personal roadmap tool. Break every thread into stages that unlock in sequence, and always see the next small thing.',
    html_url: 'https://github.com/Hussain2111/Cairn',
    language: 'JavaScript',
  },
  {
    name: 'Barbican',
    description: 'A self-service edge platform: Envoy proxies dynamically configured over xDS by a Python control plane, with a provisioning API for public routes.',
    html_url: 'https://github.com/Hussain2111/Barbican',
    language: 'Python',
  },
  {
    name: 'Aurora',
    description: 'AI voice assistant for GP surgeries with real-time calls, live transcription, WebSocket audio streaming, and a clinician dashboard — deployed on Azure.',
    html_url: 'https://github.com/Hussain2111/Aurora',
    language: 'JavaScript',
  },
  {
    name: 'Fina',
    description: 'Full-stack personal finance tracker with budgets, savings goals, multi-currency support, CSV bank import, and AI-driven spending insights.',
    html_url: 'https://github.com/Hussain2111/Fina',
    language: 'TypeScript',
  },
];

function projectCard(repo) {
  const description = repo.description || 'No description yet.';
  const homepage = repo.homepage && repo.homepage.trim() ? repo.homepage.trim() : null;

  const card = document.createElement('article');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-card-top">
      <h3>${escapeHtml(repo.name)}</h3>
      <a class="card-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(repo.name)} on GitHub">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.29.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55 4.52-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5Z"/></svg>
      </a>
    </div>
    <p>${escapeHtml(description)}</p>
    <div class="project-card-bottom">
      ${repo.language ? `<span class="project-lang">${escapeHtml(repo.language)}</span>` : ''}
    </div>
  `;

  if (homepage) {
    const link = document.createElement('a');
    link.className = 'card-link';
    link.href = homepage;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Open live demo of ${repo.name}`);
    link.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>';
    card.querySelector('.project-card-top').appendChild(link);
  }

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

async function loadProjects() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const repos = await res.json();
    const filtered = repos
      .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, MAX_PROJECTS);

    renderProjects(filtered.length ? filtered : FALLBACK_PROJECTS);
  } catch (err) {
    console.warn('Falling back to static project list:', err);
    renderProjects(FALLBACK_PROJECTS);
  }
}

loadProjects();
