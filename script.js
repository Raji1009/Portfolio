const atsKeywords = [
  'MERN Stack',
  'Data Structures & Algorithms',
  'REST API Development',
  'Problem Solving',
  'Placement Preparation'
];

const skills = [
  { title: 'Languages', items: 'Java, JavaScript, C, SQL' },
  { title: 'Frontend', items: 'HTML, CSS, JavaScript' },
  { title: 'Backend', items: 'Node.js, Express.js' },
  { title: 'Database', items: 'MongoDB' },
  { title: 'Concepts', items: 'DSA, REST APIs' }
];

const projects = [
  {
    title: 'MERN Stack Web Application',
    description:
      'A full-stack application built with MongoDB, Express, React, and Node.js for real-world web workflows.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    features: ['Authentication', 'CRUD operations', 'REST API integration'],
    github: 'https://github.com/raji/mern-stack-web-app',
    demo: 'https://raji-mern-app-demo.vercel.app'
  },
  {
    title: 'API-Based Application',
    description:
      'A backend-centric application using REST APIs for business logic, server-side processing, and data handling.',
    techStack: ['Node.js', 'Express.js', 'REST APIs'],
    features: ['Server-side logic', 'Data handling'],
    github: 'https://github.com/raji/api-based-application',
    demo: ''
  }
];

const learningItems = [
  'Advanced JavaScript (closures, scope, async)',
  'Node.js & Express deep dive',
  'Data Structures & Algorithms (LeetCode, Striver Sheet)'
];

function renderChips() {
  const container = document.getElementById('keywordChips');
  if (!container) return;
  container.innerHTML = atsKeywords.map((chip) => `<span class="chip">${chip}</span>`).join('');
}

function renderSkills() {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = skills
    .map(
      (skill) => `
      <article class="skill-card">
        <h3>${skill.title}</h3>
        <p>${skill.items}</p>
      </article>
    `
    )
    .join('');
}

function createProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const contentId = `project-content-${index}`;
  card.innerHTML = `
    <button class="project-toggle" aria-expanded="false" aria-controls="${contentId}">
      <span class="project-title">${project.title}</span>
      <span class="chevron">⌄</span>
    </button>
    <div id="${contentId}" class="project-content" role="region">
      <div class="project-inner">
        <p>${project.description}</p>
        <p><strong>Tech Stack:</strong> ${project.techStack.join(', ')}</p>
        <p><strong>Key Features:</strong></p>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="btn-row">
          <a class="btn" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
          ${
            project.demo
              ? `<a class="btn" href="${project.demo}" target="_blank" rel="noreferrer">Live Demo</a>`
              : ''
          }
        </div>
      </div>
    </div>
  `;

  const toggle = card.querySelector('.project-toggle');

  toggle.addEventListener('click', () => {
    const isExpanded = card.classList.contains('expanded');

    document.querySelectorAll('.project-card').forEach((projectCard) => {
      projectCard.classList.remove('expanded');
      projectCard.querySelector('.project-toggle').setAttribute('aria-expanded', 'false');
    });

    if (!isExpanded) {
      card.classList.add('expanded');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  return card;
}

function renderProjects() {
  const projectList = document.getElementById('projectList');
  if (!projectList) return;
  projectList.innerHTML = '';

  projects.forEach((project, index) => {
    projectList.appendChild(createProjectCard(project, index));
  });
}

function renderLearning() {
  const learningList = document.getElementById('learningList');
  if (!learningList) return;

  learningList.innerHTML = learningItems.map((item) => `<li>${item}</li>`).join('');
}

renderChips();
renderSkills();
renderProjects();
renderLearning();
