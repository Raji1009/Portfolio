const atsKeywords = [
  'Full Stack Development',
  'IoT Systems',
  'Machine Learning',
  'Data Structures & Algorithms',
  'Problem Solving'
];

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

const projects = [
  {
    title: 'AI-Based Mental Health Monitoring Band (Swaas)',
    description:
      'Designed and developed a wearable IoT system that continuously monitors physiological signals and uses AI models to detect stress patterns in real time. Published as an IEEE-supported research work.',
    techStack: ['IoT', 'Embedded Systems', 'Sensors', 'Python', 'Machine Learning'],
    features: [
      'Real-time acquisition of physiological signals (heart rate, temperature)',
      'AI-based stress detection using trained ML models',
      'Low-power wearable device integration',
      'Research-backed system with documented results'
    ],
    github: 'https://github.com/Raji1009/Swaas',
    demo: 'https://swaasband.vercel.app/#/',
    paper: 'https://drive.google.com/file/d/19VwWmrkN8FeD2shPLhYuYgnJzlZb4-m4/view?usp=sharing'
  },
  {
    title: 'AI-Driven ESG Scoring and Sustainability Analytics Platform',
    description:
      'Built a data-driven platform that evaluates companies based on ESG metrics using analytics and machine learning to generate sustainability scores and insights.',
    techStack: ['Python', 'Machine Learning', 'Data Analytics', 'JavaScript', 'Dashboard UI'],
    features: [
      'Automated ESG score calculation using weighted metrics',
      'Data preprocessing and normalization pipeline',
      'Interactive dashboard for sustainability insights',
      'Company risk analysis based on ESG indicators'
    ],
    github: 'https://github.com/Raji1009/ESG-Scoring-App/tree/codex/find-deployment-options-for-app',
    demo: 'https://esg-scoring-app.onrender.com/'
  },
  {
    title: 'IoT-Based Poultry Disease Detection System',
    description:
      'Developed an IoT-enabled monitoring system that collects environmental data from poultry farms and applies anomaly detection techniques to identify early signs of disease.',
    techStack: ['IoT Sensors', 'Arduino', 'Cloud Integration', 'Machine Learning'],
    features: [
      'Real-time environmental monitoring (temperature, humidity)',
      'Anomaly detection using ML models',
      'Cloud-based data storage and processing',
      'Automated alert system for early disease detection'
    ],
    github: '',
    demo: ''
  },
  {
    title: 'Smart Expense Tracker with Predictive Analytics',
    description:
      'Developed an intelligent expense tracking system that analyzes user spending patterns and offers predictive budgeting insights.',
    techStack: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    features: [
      'Automated expense categorization using rule-based logic',
      'Real-time tracking and visualization of spending patterns',
      'Monthly budget planning with overspending alerts',
      'Predictive analysis of future expenses from historical data',
      'Interactive dashboard with charts and summaries',
      'Secure user authentication and data management'
    ],
    github: 'https://github.com/Raji1009/Smart-Expense-Tracker',
    demo: 'https://raji1009.github.io/Smart-Expense-Tracker/'
  },
  {
    title: 'ML-Based Elder Diabetic Monitoring System',
    description:
      'Implemented a machine learning model to predict diabetic risk in elderly individuals using health parameters for early intervention.',
    techStack: ['Python', 'Machine Learning', 'Data Preprocessing'],
    features: [
      'Data cleaning and preprocessing pipeline',
      'Predictive model for diabetes risk classification',
      'Feature selection for improved accuracy',
      'Health insights generation for preventive care'
    ],
    github: '',
    demo: ''
  },
  {
    title: 'Spotify Clone (Frontend Music Player)',
    description:
      'Built a responsive and interactive music player inspired by Spotify, focused on UI/UX and smooth DOM interaction.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Custom player controls with progress interactions',
      'Responsive UI design across devices',
      'Dynamic playlist handling via DOM updates',
      'Smooth interactions and transitions'
    ],
    github: 'https://github.com/Raji1009/Spotify_clone',
    demo: 'https://raji1009.github.io/Spotify_clone/'
  },
  {
    title: 'JavaScript Color Game',
    description:
      'Interactive browser game challenging users to match RGB values with colors.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Dynamic RGB color generation logic',
      'Multiple difficulty levels (Easy/Hard)',
      'Interactive UI with real-time feedback',
      'Efficient DOM updates and event handling'
    ],
    github: 'https://github.com/Raji1009/Simon-Game.git',
    demo: 'https://raji1009.github.io/Simon-Game/'
  }
];

const learningItems = [
  'Advanced JavaScript (Closures, Async, Scope)',
  'Node.js & Express Deep Dive',
  'Data Structures & Algorithms (LeetCode)',
  'System Design Basics'
];

const overviewStats = [
  { value: '7', label: 'Featured Projects' },
  { value: '5+', label: 'Core Domains' },
  { value: '150+', label: 'DSA Problems' },
  { value: '24/7', label: 'Learning Mindset' }
];

const recognitions = {
  achievements: [
    { title: 'Flipkart GRID Robotics Challenge', detail: 'Reached semi-finals with embedded innovation.' },
    { title: 'NASSCOM Agentic AI Program', detail: 'Finalist for practical AI workflow execution.' },
    { title: 'IEEE-Supported Research', detail: 'Published work related to AI-powered wearable monitoring.' }
  ],
  certifications: [
    { title: 'AI & Big Data in IoT', detail: 'Completed specialization for data-driven IoT systems.' },
    { title: 'NSIC Technical Internship', detail: 'Hands-on delivery with implementation-focused tasks.' },
    { title: 'Leadership Workshop', detail: 'Training in communication, collaboration, and ownership.' }
  ]
};

function renderChips() {
  const container = document.getElementById('keywordChips');
  if (!container) return;

  container.innerHTML = atsKeywords.map((chip) => `<span class="chip">${chip}</span>`).join('');
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

function renderOverviewStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  grid.innerHTML = overviewStats
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

function createProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  const contentId = `project-${index}`;

  card.innerHTML = `
    <button class="project-toggle" aria-expanded="false" aria-controls="${contentId}">
      <span class="project-title">${project.title} ${project.paper ? '🏆' : ''}</span>
      <span class="chevron">⌄</span>
    </button>

    <div id="${contentId}" class="project-content">
      <div class="project-inner">
        <p class="muted">${project.description}</p>
        <p><strong>Tech Stack:</strong> ${project.techStack.join(', ')}</p>
        <p><strong>Key Features:</strong></p>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="btn-row">
          ${project.github ? `<a class="btn" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>` : ''}
          ${project.demo ? `<a class="btn" href="${project.demo}" target="_blank" rel="noreferrer">Live Demo</a>` : ''}
          ${project.paper ? `<a class="btn" href="${project.paper}" target="_blank" rel="noreferrer">Research Paper</a>` : ''}
          <button class="btn btn-secondary share-btn" data-title="${project.title}">Copy Title</button>
        </div>
      </div>
    </div>
  `;

  const toggle = card.querySelector('.project-toggle');
  toggle.addEventListener('click', () => {
    const isExpanded = card.classList.contains('expanded');

    document.querySelectorAll('.project-card').forEach((projectCard) => {
      projectCard.classList.remove('expanded');
      const projectToggle = projectCard.querySelector('.project-toggle');
      if (projectToggle) projectToggle.setAttribute('aria-expanded', 'false');
    });

    if (!isExpanded) {
      card.classList.add('expanded');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  const shareBtn = card.querySelector('.share-btn');
  shareBtn.addEventListener('click', async () => {
    const text = `${project.title} - Rajalakshmi R Portfolio`;
    try {
      await navigator.clipboard.writeText(text);
      shareBtn.textContent = 'Copied!';
      setTimeout(() => {
        shareBtn.textContent = 'Copy Title';
      }, 1000);
    } catch (error) {
      shareBtn.textContent = 'Copy Failed';
    }
  });

  return card;
}

function renderProjects(projectData = projects) {
  const list = document.getElementById('projectList');
  const counter = document.getElementById('projectCount');
  if (!list) return;

  list.innerHTML = '';
  projectData.forEach((project, index) => list.appendChild(createProjectCard(project, index)));
  if (counter) counter.textContent = `${projectData.length} project${projectData.length === 1 ? '' : 's'}`;
}

function setupProjectSearch() {
  const search = document.getElementById('projectSearch');
  if (!search) return;

  search.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    if (!query) {
      renderProjects(projects);
      setupRevealAnimation();
      return;
    }

    const filtered = projects.filter((project) => {
      const blob = `${project.title} ${project.description} ${project.techStack.join(' ')}`.toLowerCase();
      return blob.includes(query);
    });

    renderProjects(filtered);
    setupRevealAnimation();
  });
}

function renderLearning() {
  const list = document.getElementById('learningList');
  if (!list) return;

  list.innerHTML = learningItems.map((item) => `<li>${item}</li>`).join('');
}

function renderRecognition(tab = 'achievements') {
  const container = document.getElementById('achievementList');
  if (!container) return;

  container.innerHTML = recognitions[tab]
    .map(
      (entry) => `
      <article class="achieve-card reveal">
        <h3>${entry.title}</h3>
        <p class="muted">${entry.detail}</p>
      </article>
    `
    )
    .join('');
}

function setupRecognitionTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((tab) => tab.classList.remove('active'));
      button.classList.add('active');
      renderRecognition(button.dataset.tab);
      setupRevealAnimation();
    });
  });
}

async function renderGithubStats() {
  const container = document.getElementById('githubStats');
  if (!container) return;

  const fallback = [
    { label: 'Public Repos', value: '10+' },
    { label: 'Followers', value: 'Growing' },
    { label: 'Following', value: 'Active' },
    { label: 'Profile', value: 'Raji1009' }
  ];

  try {
    const response = await fetch('https://api.github.com/users/Raji1009');
    if (!response.ok) throw new Error('GitHub API unavailable');
    const data = await response.json();

    const cards = [
      { label: 'Public Repos', value: data.public_repos ?? '--' },
      { label: 'Followers', value: data.followers ?? '--' },
      { label: 'Following', value: data.following ?? '--' },
      { label: 'Profile', value: 'Live' }
    ];

    container.innerHTML = cards
      .map(
        (item) => `
        <div class="metric-card">
          <span class="metric-value">${item.value}</span>
          <span class="metric-label">${item.label}</span>
        </div>
      `
      )
      .join('');
  } catch (error) {
    container.innerHTML = fallback
      .map(
        (item) => `
        <div class="metric-card">
          <span class="metric-value">${item.value}</span>
          <span class="metric-label">${item.label}</span>
        </div>
      `
      )
      .join('');
  }
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section, .reveal').forEach((element) => observer.observe(element));
}

renderChips();
renderOverviewStats();
renderSkills();
renderProjects();
setupProjectSearch();
renderLearning();
renderRecognition();
setupRecognitionTabs();
setupRevealAnimation();
renderGithubStats();
