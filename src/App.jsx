import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Card from './components/Card';
import StatsCard from './components/StatsCard';
import { profile, projects, skills, timeline } from './data/content';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

const timelineSections = [
  { id: 'education', label: 'Education', types: ['Education'], color: '#60a5fa' },
  { id: 'projects', label: 'Experience & Projects', types: ['Experience', 'Project'], color: '#a78bfa' },
  { id: 'achievements', label: 'Achievements', types: ['Achievement'], color: '#f472b6' },
  { id: 'certifications', label: 'Certifications', types: ['Certification'], color: '#34d399' }
];

const timelineTabs = [{ id: 'all', label: 'All', color: '#c4b5fd' }, ...timelineSections];

// ── skill card accent colors ─────────────────────────────────────────────────
const skillColors = {
  Frontend:                '#7C6FCD',
  Backend:                 '#5DCAA5',
  Database:                '#85B7EB',
  'Programming Languages': '#FAC775',
  'DSA & Problem Solving': '#F09995',
  'IoT & Emerging Technologies': '#9FE1CB',
  'Tools & Platforms':     '#AFA9EC',
};

const PREVIEW_COUNT = 2;

// ── SkillCard ────────────────────────────────────────────────────────────────
function SkillCard({ title, items }) {
  const [hovered, setHovered] = useState(false);
  const color = skillColors[title] ?? '#a0a0c0';
  const preview = items.slice(0, PREVIEW_COUNT);
  const rest    = items.slice(PREVIEW_COUNT);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.03 : 1,
        boxShadow: hovered
          ? `0 0 0 1.5px ${color}55, 0 8px 32px ${color}22`
          : '0 0 0 1px rgba(255,255,255,0.07)',
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="relative cursor-default overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d2b] p-5"
    >
      {/* Glow blob */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${color}1A 0%, transparent 68%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>

      {/* Preview pills — always visible */}
      <ul className="space-y-2">
        {preview.map((item) => (
          <li
            key={item}
            className="rounded-xl px-3 py-2 text-sm"
            style={{
              border: `1px solid ${color}33`,
              backgroundColor: `${color}0D`,
              color: '#a0a0c0',
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Expanded pills */}
      <AnimatePresence>
        {hovered && rest.length > 0 && (
          <motion.ul
            key="rest"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-2 space-y-2 overflow-hidden"
          >
            {rest.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                className="rounded-xl px-3 py-2 text-sm"
                style={{
                  border: `1px solid ${color}33`,
                  backgroundColor: `${color}0D`,
                  color: '#a0a0c0',
                }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Hint when collapsed */}
      <AnimatePresence>
        {!hovered && rest.length > 0 && (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-3 text-xs"
            style={{ color: `${color}99` }}
          >
            +{rest.length} more · hover to expand
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetLoading, setLeetLoading] = useState(true);
  const [githubStats, setGithubStats] = useState(null);
  const [leetStats, setLeetStats] = useState(null);
  const [repoTotals, setRepoTotals] = useState({ stars: 0, forks: 0 });
  const [githubContributions, setGithubContributions] = useState('--');
  const [recentCommits, setRecentCommits] = useState('--');
  const [activeTimelineTab, setActiveTimelineTab] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const normalizeLeetData = (data) => {
      if (!data || data.status === 'error') return null;
      return {
        totalSolved: data.totalSolved ?? data.solvedProblem ?? '--',
        easySolved: data.easySolved ?? '--',
        mediumSolved: data.mediumSolved ?? '--',
        hardSolved: data.hardSolved ?? '--',
        acceptanceRate: data.acceptanceRate ?? '--',
        ranking: data.ranking ?? '--',
        contributionPoints: data.contributionPoints ?? data.reputation ?? '--'
      };
    };

    const getStats = async () => {
      try {
        const parseJson = async (response) => {
          if (!response?.ok) return null;
          const data = await response.json();
          return data?.message ? null : data;
        };

        const [githubResult, reposResult, eventsResult, contributionResult] = await Promise.allSettled([
          fetch('https://api.github.com/users/Raji1009').then(parseJson),
          fetch('https://api.github.com/users/Raji1009/repos?per_page=100').then(parseJson),
          fetch('https://api.github.com/users/Raji1009/events/public?per_page=100').then(parseJson),
          fetch('https://github-contributions-api.jogruber.de/v4/Raji1009?y=last').then(parseJson)
        ]);

        const githubData = githubResult.status === 'fulfilled' ? githubResult.value : null;
        const reposData = reposResult.status === 'fulfilled' ? reposResult.value : null;
        const eventsData = eventsResult.status === 'fulfilled' ? eventsResult.value : null;
        const contributionData = contributionResult.status === 'fulfilled' ? contributionResult.value : null;

        setGithubStats(githubData);

        if (Array.isArray(reposData)) {
          const stars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
          const forks = reposData.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
          setRepoTotals({ stars, forks });
        }

        if (Array.isArray(eventsData)) {
          const pushEvents = eventsData.filter((event) => event.type === 'PushEvent');
          const commitCount = pushEvents.reduce((sum, event) => sum + (event.payload?.commits?.length || 0), 0);
          setRecentCommits(commitCount);
        }

        if (contributionData?.total) {
          const contributionTotal = Object.values(contributionData.total).reduce((sum, value) => sum + Number(value || 0), 0);
          setGithubContributions(contributionTotal || '--');
        }
      } catch {
        setGithubStats(null);
      } finally {
        setGithubLoading(false);
      }

      try {
        const leetEndpoints = [
          'https://leetcode-stats-api.herokuapp.com/Rajalakshmi_10',
          'https://leetcode-stats-api.vercel.app/Rajalakshmi_10',
          'https://leetcode-stats.tashif.codes/Rajalakshmi_10'
        ];

        let parsedLeetData = null;
        for (const endpoint of leetEndpoints) {
          try {
            const response = await fetch(endpoint);
            if (!response.ok) continue;
            const data = await response.json();
            const normalized = normalizeLeetData(data);
            if (normalized) {
              parsedLeetData = normalized;
              break;
            }
          } catch {
            // try next endpoint
          }
        }

        setLeetStats(parsedLeetData);
      } catch {
        setLeetStats(null);
      } finally {
        setLeetLoading(false);
      }
    };

    getStats();
  }, []);

  const githubApiImage = useMemo(
    () =>
      'https://github-readme-stats.vercel.app/api?username=Raji1009&show_icons=true&theme=midnight-purple&hide_border=true&bg_color=0d0d2b&title_color=a855f7&text_color=a0a0c0&icon_color=7c3aed',
    []
  );

  const streakImage = useMemo(
    () => 'https://streak-stats.demolab.com?user=Raji1009&theme=midnight-purple&hide_border=true&background=0D0D2B&ring=A855F7&fire=7C3AED&currStreakLabel=A0A0C0',
    []
  );

  const visibleTimelineSections = useMemo(() => {
    const sectionsToShow =
      activeTimelineTab === 'all'
        ? timelineSections
        : timelineSections.filter((section) => section.id === activeTimelineTab);

    return sectionsToShow
      .map((section) => ({
        ...section,
        items: timeline.filter((item) => section.types.includes(item.type))
      }))
      .filter((section) => section.items.length > 0);
  }, [activeTimelineTab]);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:irajalakshmirajaram@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a1a] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(124,58,237,0.30),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.20),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(76,29,149,0.18),transparent_34%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[length:32px_32px] opacity-30" />
      <Navbar />

      <main id="home" className="relative mx-auto flex w-[min(1180px,92vw)] flex-col gap-16 py-10 md:gap-20">

        {/* ── Hero ── */}
        <motion.section
          {...fadeUp}
          className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d2b]/80 px-6 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:px-10 md:py-16"
        >
          <div className="absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.40),rgba(168,85,247,0.12)_42%,transparent_70%)] blur-2xl md:left-auto md:right-8 md:translate-x-0" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-300">Frontend-first, placement-focused</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-none tracking-tight text-white md:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-5 inline-flex items-center text-xl font-semibold text-[#a0a0c0] md:text-2xl">
                {profile.role}
                <span className="ml-2 inline-block h-7 w-0.5 animate-cursor bg-violet-300 shadow-[0_0_18px_rgba(168,85,247,0.85)]" />
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#a0a0c0]">{profile.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_34px_rgba(124,58,237,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(168,85,247,0.52)]">
                  View Projects
                </a>
                <a href="#contact" className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300/50 hover:bg-violet-500/10">
                  Contact
                </a>
                <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/10">GitHub</a>
                <a href="https://www.linkedin.com/in/Rajalakshmir10" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/10">LinkedIn</a>
              </div>
            </div>
            <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.36),transparent_66%)] blur-2xl" />
              <div className="relative h-full w-full rounded-full border border-violet-300/40 bg-white/[0.04] p-2 shadow-[0_0_55px_rgba(124,58,237,0.45)]">
                <img
                  src="https://github.com/Raji1009.png"
                  alt={profile.name}
                  className="h-full w-full rounded-full border border-white/10 object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── About ── */}
        <motion.section id="about" {...fadeUp} className="section-shell bg-[#10102e]">
          <div className="section-heading">
            <h2>About</h2>
          </div>
          <Card>
            <p>{profile.about}</p>
            <p className="mt-3 text-[#a0a0c0]">Education: 3rd year engineering student.</p>
            <p className="mt-1 text-[#a0a0c0]">Goal: secure placements through strong DSA + development execution.</p>
          </Card>
        </motion.section>

        {/* ── Skills ── CHANGED SECTION ── */}
        <motion.section id="skills" {...fadeUp} className="section-shell bg-[#0d0d2b]">
          <div className="section-heading">
            <h2>Skills</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                items={skill.items}
              />
            ))}
          </div>
        </motion.section>

        {/* ── Projects ── */}
        <motion.section id="projects" {...fadeUp} className="section-shell bg-[#10102e]">
          <div className="section-heading">
            <h2>Featured Projects</h2>
          </div>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`glass-card overflow-hidden rounded-[1.75rem] p-5 md:p-7 ${
                  index % 2 === 1 ? 'lg:[&>div]:flex-row-reverse' : ''
                }`}
              >
                <div className="flex flex-col items-center gap-8 lg:flex-row">
                  <div className="w-full lg:w-3/5">
                    <div className="project-mockup relative rounded-2xl border border-violet-300/20 bg-[#0a0a1a] p-3 shadow-[0_28px_70px_rgba(0,0,0,0.42)]">
                      <div className="mb-3 flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#a855f7]" />
                        <span className="h-3 w-3 rounded-full bg-[#7c3aed]" />
                        <span className="h-3 w-3 rounded-full bg-white/25" />
                      </div>
                      <div className="aspect-[680/360] overflow-hidden rounded-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/5">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
                    <p className="mt-4 leading-7 text-[#a0a0c0]">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                      <a className="text-violet-300 hover:text-white" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                      <a className="text-[#a855f7] hover:text-white" href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* ── Stats ── */}
        <motion.section id="stats" {...fadeUp} className="section-shell bg-[#0d0d2b]">
          <div className="section-heading">
            <h2>Stats</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="GitHub Stats">
              {githubLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-20 animate-pulse rounded-xl bg-white/[0.05]" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatsCard label="Recent Commits (100 events)" value={recentCommits} />
                  <StatsCard label="Total Stars" value={repoTotals.stars} />
                  <StatsCard label="Public Repos" value={githubStats?.public_repos ?? '--'} />
                  <StatsCard label="Contributions (last year)" value={githubContributions} />
                </div>
              )}
              <div className="mt-4 grid gap-3">
                <img src={githubApiImage} loading="lazy" alt="GitHub Readme Stats" className="w-full rounded-xl border border-white/10" />
                <img src={streakImage} loading="lazy" alt="GitHub Streak Stats" className="w-full rounded-xl border border-white/10" />
              </div>
              <div className="mt-4">
                <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-violet-400/40 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/10">
                  Open GitHub Profile
                </a>
              </div>
            </Card>

            <Card title="LeetCode Stats">
              {leetLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(5)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-20 animate-pulse rounded-xl bg-white/[0.05]"
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <StatsCard
                      label="Total Solved"
                      value={leetStats?.totalSolved ?? "--"}
                    />

                    <StatsCard
                      label="Easy / Medium / Hard"
                      value={`${leetStats?.easySolved ?? "--"} / ${
                        leetStats?.mediumSolved ?? "--"
                      } / ${leetStats?.hardSolved ?? "--"}`}
                    />

                    <StatsCard
                      label="Acceptance Rate"
                      value={
                        leetStats?.acceptanceRate
                          ? `${leetStats.acceptanceRate}%`
                          : "--"
                      }
                    />

                    <StatsCard
                      label="Global Ranking"
                      value={leetStats?.ranking ?? "--"}
                    />

                    <StatsCard
                      label="Contribution Points"
                      value={leetStats?.contributionPoints ?? "--"}
                    />
                  </div>

                  <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src="https://leetcard.jacoblin.cool/Rajalakshmi_10?theme=transparent&font=Spectral&colors=Background%3A%20%23171738%20Border%3A%20%20%20%20%20%232E2A5E%20Title%3A%20%20%20%20%20%20%23FFFFFF%20Accent%3A%20%20%20%20%20%238B5CF6%20Text%3A%20%20%20%20%20%20%20%23B4B0D3&ext=heatmap"
                      alt="LeetCode Heatmap"
                      className="w-full"
                    />
                  </div>
                </>
              )}

              <div className="mt-4">
                <a
                  href="https://leetcode.com/Rajalakshmi_10/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-violet-400/40 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/10"
                >
                  Open LeetCode Profile
                </a>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* ── Timeline ── */}
        <motion.section id="timeline" {...fadeUp} className="section-shell bg-[#10102e]">
          <div className="section-heading">
            <h2>Build History</h2>
          </div>
          <div className="mb-6 flex flex-wrap gap-3" role="tablist" aria-label="Timeline categories">
            {timelineTabs.map((tab) => {
              const isActive = activeTimelineTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTimelineTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? 'border-white/20 bg-white/12 text-white shadow-[0_0_26px_rgba(124,58,237,0.2)]'
                      : 'border-white/10 bg-white/[0.04] text-[#a0a0c0] hover:border-white/20 hover:bg-white/[0.07] hover:text-white'
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tab.color }} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="space-y-6">
            {visibleTimelineSections.map((section, sectionIndex) => (
              <div key={section.id} className="space-y-3">
                {activeTimelineTab === 'all' && (
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a0a0c0]">
                    {section.label}
                  </p>
                )}
                <div className="grid gap-3 md:grid-cols-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.article
                      key={`${section.id}-${item.title}`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.4, delay: (sectionIndex + itemIndex) * 0.03 }}
                      className="glass-card relative overflow-hidden rounded-2xl border-l-4 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_0_28px_rgba(124,58,237,0.18)]"
                      style={{ borderLeftColor: section.color }}
                    >
                      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full opacity-20 blur-xl" style={{ backgroundColor: section.color }} />
                      <div className="relative">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a0a0c0]">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: section.color }} />
                          {item.type}
                        </div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 truncate text-sm text-[#a0a0c0]">{item.detail}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Contact ── */}
        <motion.section id="contact" {...fadeUp} className="section-shell relative overflow-hidden bg-[#0d0d2b]">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
          <div className="section-heading">
            <h2>Contact</h2>
          </div>
          <form onSubmit={handleContactSubmit} className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-[#0a0a1a]/80 p-3 text-white outline-none transition placeholder:text-[#a0a0c0]/70 focus:border-violet-300/60 focus:shadow-[0_0_22px_rgba(124,58,237,0.18)]"
              placeholder="Your Name"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
            <input
              className="rounded-2xl border border-white/10 bg-[#0a0a1a]/80 p-3 text-white outline-none transition placeholder:text-[#a0a0c0]/70 focus:border-violet-300/60 focus:shadow-[0_0_22px_rgba(124,58,237,0.18)]"
              placeholder="Your Email"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
            <textarea
              className="rounded-2xl border border-white/10 bg-[#0a0a1a]/80 p-3 text-white outline-none transition placeholder:text-[#a0a0c0]/70 focus:border-violet-300/60 focus:shadow-[0_0_22px_rgba(124,58,237,0.18)] md:col-span-2"
              rows="4"
              placeholder="Message"
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              required
            />
            <button type="submit" className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(124,58,237,0.36)] transition hover:-translate-y-0.5 md:col-span-2">
              Send Message
            </button>
          </form>
          <div className="mt-5 flex gap-4 text-sm font-semibold">
            <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="text-violet-300 hover:text-white">GitHub</a>
            <a href="https://www.linkedin.com/in/Rajalakshmir10" target="_blank" rel="noreferrer" className="text-[#a855f7] hover:text-white">LinkedIn</a>
          </div>
        </motion.section>

      </main>
    </div>
  );
}