const atsKeywords = [
  'Full Stack Development',
  'IoT + AI Prototyping',
  'REST API Integration',
  'Problem Solving',
  'Performance-focused UI'
];

const stats = [
  { value: '5+', label: 'Portfolio Projects' },
  { value: '3', label: 'Domains (Web/IoT/AI)' },
  { value: '150+', label: 'DSA Problems Practiced' },
  { value: '100%', label: 'Hands-on Learning Mindset' }
];

const skills = [
  {
    title: 'Frontend Development',
    items: 'HTML, CSS, JavaScript, responsive layouts, and smooth UI interactions'
  },
  {
    title: 'Backend & APIs',
    items: 'Node.js, Express.js, REST APIs, and modular server architecture'
  },
  {
    title: 'Database',
    items: 'MongoDB and SQL for schema design, data retrieval, and optimization'
  },
  {
    title: 'Core CS',
    items: 'Data Structures, Algorithms, OOP, and scalable problem-solving patterns'
  }
];

const projects = [
  {
    title: 'AI-Based Mental Health Monitoring Band (Swaas)',
    description:
      'Wearable IoT band that analyzes physiological data to identify stress levels in near real-time.',
    techStack: ['IoT', 'Sensors', 'Embedded Systems', 'AI']
  },
  {
    title: 'Spotify UI Clone',
    description:
      'A polished and responsive music interface inspired by modern streaming dashboards.',
    techStack: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'JavaScript Color Challenge',
    description:
      'Interactive game where users guess RGB colors with dynamic difficulty levels.',
    techStack: ['JavaScript', 'DOM', 'Game Logic']
  },
  {
    title: 'IoT Poultry Disease Detection',
    description:
      'Smart system using sensor telemetry and ML insights to detect anomalies in poultry farms.',
    techStack: ['Arduino', 'IoT Sensors', 'ML', 'Cloud']
  }
];

function renderChips() {
  const container = document.getElementById('keywordChips');
  if (!container) return;

  container.innerHTML = atsKeywords
    .map((chip) => `<span class="chip">${chip}</span>`)
    .join('');
}

function renderStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  grid.innerHTML = stats
    .map(
      (stat) => `
      <article class="stat-card reveal">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </article>
    `
    )
    .join('');
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = skills
    .map(
      (skill) => `
      <article class="skill-card reveal">
        <h3>${skill.title}</h3>
        <p class="muted">${skill.items}</p>
      </article>
    `
    )
    .join('');
}

function renderProjects() {
  const grid = document.getElementById('projectList');
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card reveal">
        <h3>${project.title}</h3>
        <p class="muted">${project.description}</p>
        <div class="project-tech">
          ${project.techStack.map((tech) => `<span class="tech-pill">${tech}</span>`).join('')}
        </div>
      </article>
    `
    )
    .join('');
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.section, .reveal').forEach((node) => observer.observe(node));
}

renderChips();
renderStats();
renderSkills();
renderProjects();
setupRevealAnimation();
