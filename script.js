const projects = [
  {
    title: 'MERN Stack Web Application',
    description:
      'A full-stack web application built using MongoDB, Express, React, and Node.js with end-to-end functionality.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    features: ['Authentication', 'CRUD operations', 'REST API integration'],
    github: 'https://github.com/raji/mern-stack-web-app',
    demo: 'https://raji-mern-app-demo.vercel.app'
  },
  {
    title: 'API-Based Application',
    description:
      'A backend-focused application using REST APIs to handle business logic and efficient data flow.',
    techStack: ['Node.js', 'Express.js', 'REST APIs'],
    features: ['Server-side logic', 'Data handling'],
    github: 'https://github.com/raji/api-based-application',
    demo: ''
  }
];

const projectList = document.getElementById('projectList');

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

projects.forEach((project, index) => {
  projectList.appendChild(createProjectCard(project, index));
});
