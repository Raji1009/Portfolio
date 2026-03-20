// =====================
// ATS KEYWORDS
// =====================
const atsKeywords = [
  'Full Stack Development',
  'IoT Systems',
  'Machine Learning',
  'Data Structures & Algorithms',
  'Problem Solving'
];

// =====================
// SKILLS
// =====================
const skills = [
  {
    title: 'Languages',
    items:
      'Java, JavaScript, C, SQL with strong foundation in OOP and problem-solving'
  },
  {
    title: 'Frontend',
    items:
      'Building responsive UI using HTML, CSS, JavaScript with focus on UX and performance'
  },
  {
    title: 'Backend',
    items:
      'Node.js and Express.js for scalable server-side development and REST APIs'
  },
  {
    title: 'Database',
    items:
      'MongoDB for schema design, efficient data handling, and CRUD operations'
  },
  {
    title: 'Concepts',
    items:
      'DSA, REST APIs, and core software engineering principles'
  }
];

// =====================
// PROJECTS
// =====================
const projects = [
  {
    title: 'AI-Based Mental Health Monitoring Band (Swaas)',
    description:
      'A wearable IoT system enhanced with AI to analyze physiological signals and detect stress levels. Supported by an IEEE research paper.',
    techStack: ['IoT', 'Sensors', 'Embedded Systems', 'AI'],
    features: [
      'Real-time physiological monitoring',
      'AI-based stress detection',
      'Wearable integration'
    ],
    github: '',
    demo: '',
    paper: 'YOUR_DRIVE_LINK'
  },
  {
    title: 'Spotify Clone',
    description:
      'A responsive front-end music player inspired by Spotify focusing on UI/UX and interactivity.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Music player UI',
      'Responsive design',
      'Interactive controls'
    ],
    github: '',
    demo: ''
  },
  {
    title: 'JavaScript Color Game',
    description:
      'An interactive browser game where users guess colors using RGB values.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Dynamic color generation',
      'Difficulty levels',
      'DOM manipulation'
    ],
    github: '',
    demo: ''
  },
  {
    title: 'IoT-Based Poultry Disease Detection System',
    description:
      'Monitors poultry farm conditions and detects disease using sensor data and ML.',
    techStack: ['IoT Sensors', 'Arduino', 'Cloud', 'Machine Learning'],
    features: [
      'Real-time monitoring',
      'Anomaly detection',
      'Alert system'
    ],
    github: '',
    demo: ''
  },
  {
    title: 'ML-Based Elder Diabetic Monitoring System',
    description:
      'A machine learning system that predicts diabetic risks in elderly individuals.',
    techStack: ['Python', 'Machine Learning'],
    features: [
      'Data preprocessing',
      'Prediction model',
      'Health insights'
    ],
    github: '',
    demo: ''
  }
];

// =====================
// LEARNING
// =====================
const learningItems = [
  'Advanced JavaScript (Closures, Async, Scope)',
  'Node.js & Express Deep Dive',
  'Data Structures & Algorithms (LeetCode)',
  'System Design Basics'
];

// =====================
// RENDER FUNCTIONS
// =====================

// ATS Chips
function renderChips() {
  const container = document.getElementById('keywordChips');
  if (!container) return;

  container.innerHTML = atsKeywords
    .map((chip) => `<span class="chip">${chip}</span>`)
    .join('');
}

// Skills
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = skills
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

// Create Project Card
function createProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const contentId = `project-${index}`;

  card.innerHTML = `
    <button class="project-toggle" aria-expanded="false" aria-controls="${contentId}">
      <span class="project-title">
        ${project.title} ${project.paper ? '🏆' : ''}
      </span>
      <span class="chevron">⌄</span>
    </button>

    <div id="${contentId}" class="project-content">
      <div class="project-inner">
        <p>${project.description}</p>

        <p><strong>Tech Stack:</strong> ${project.techStack.join(', ')}</p>

        <p><strong>Key Features:</strong></p>
        <ul>
          ${project.features.map((f) => `<li>${f}</li>`).join('')}
        </ul>

        <div class="btn-row">
          ${
            project.github
              ? `<a class="btn" href="${project.github}" target="_blank">GitHub</a>`
              : ''
          }
          ${
            project.demo
              ? `<a class="btn" href="${project.demo}" target="_blank">Live Demo</a>`
              : ''
          }
          ${
            project.paper
              ? `<a class="btn" href="${project.paper}" target="_blank">Research Paper</a>`
              : ''
          }
        </div>
      </div>
    </div>
  `;

  const toggle = card.querySelector('.project-toggle');

  toggle.addEventListener('click', () => {
    const isExpanded = card.classList.contains('expanded');

    document.querySelectorAll('.project-card').forEach((c) => {
      c.classList.remove('expanded');
      c.querySelector('.project-toggle').setAttribute('aria-expanded', 'false');
    });

    if (!isExpanded) {
      card.classList.add('expanded');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  return card;
}

// Projects
function renderProjects() {
  const list = document.getElementById('projectList');
  if (!list) return;

  list.innerHTML = '';
  projects.forEach((p, i) => {
    list.appendChild(createProjectCard(p, i));
  });
}

// Learning
function renderLearning() {
  const list = document.getElementById('learningList');
  if (!list) return;

  list.innerHTML = learningItems
    .map((item) => `<li>${item}</li>`)
    .join('');
}

// =====================
// SCROLL ANIMATION
// =====================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.section').forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  observer.observe(section);
});

// =====================
// INIT
// =====================
renderChips();
renderSkills();
renderProjects();
renderLearning();