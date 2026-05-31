import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Card from './components/Card';
import StatsCard from './components/StatsCard';
import { profile, projects, skills, timeline } from './data/content';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 }
};

export default function App() {
  const [dark, setDark] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetLoading, setLeetLoading] = useState(true);
  const [githubStats, setGithubStats] = useState(null);
  const [leetStats, setLeetStats] = useState(null);
  const [repoTotals, setRepoTotals] = useState({ stars: 0, forks: 0 });
  const [githubContributions, setGithubContributions] = useState('--');
  const [recentCommits, setRecentCommits] = useState('--');
  const [activeProject, setActiveProject] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

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
        contributionPoints: data.contributionPoints ?? data.reputation ?? '--',
        reputation: data.reputation ?? '--'
      };
    };

    const getStats = async () => {
      try {
        const [githubResponse, reposResponse, eventsResponse, contributionResponse] = await Promise.all([
          fetch('https://api.github.com/users/Raji1009'),
          fetch('https://api.github.com/users/Raji1009/repos?per_page=100'),
          fetch('https://api.github.com/users/Raji1009/events/public?per_page=100'),
          fetch('https://github-contributions-api.jogruber.de/v4/Raji1009?y=last').catch(() => null)
        ]);

        const githubData = await githubResponse.json();
        if (githubData?.message) {
          throw new Error(githubData.message);
        }

        setGithubStats(githubData);

        const reposData = await reposResponse.json();
        if (Array.isArray(reposData)) {
          const stars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
          const forks = reposData.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
          setRepoTotals({ stars, forks });
        }

        const eventsData = await eventsResponse.json();
        if (Array.isArray(eventsData)) {
          const pushEvents = eventsData.filter((event) => event.type === 'PushEvent');
          const commitCount = pushEvents.reduce((sum, event) => sum + (event.payload?.commits?.length || 0), 0);
          setRecentCommits(commitCount);
        }

        if (contributionResponse?.ok) {
          const contributionData = await contributionResponse.json();
          setGithubContributions(contributionData?.total?.[2025] || contributionData?.total?.[2024] || '--');
        }
      } catch {
        setGithubStats(null);
      } finally {
        setGithubLoading(false);
      }

      try {
        const leetEndpoints = [
          'https://leetcode-stats-api.herokuapp.com/Raji1009',
          'https://leetcode-stats-api.vercel.app/Raji1009',
          'https://leetcode-stats.tashif.codes/Raji1009'
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
      'https://github-readme-stats.vercel.app/api?username=Raji1009&show_icons=true&theme=github_dark&hide_border=true',
    []
  );

  const streakImage = useMemo(
    () => 'https://github-readme-streak-stats.herokuapp.com?user=Raji1009&theme=github-dark&hide_border=true',
    []
  );

  const currentProject = projects[activeProject];
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  const leetTotal = Number(leetStats?.totalSolved) || 0;
  const leetBreakdown = [
    { label: 'Easy', value: Number(leetStats?.easySolved) || 0, color: 'bg-emerald-400' },
    { label: 'Medium', value: Number(leetStats?.mediumSolved) || 0, color: 'bg-amber-400' },
    { label: 'Hard', value: Number(leetStats?.hardSolved) || 0, color: 'bg-rose-400' }
  ];

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:lavanis7u@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a1a] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(168,85,247,0.25),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,#0a0a1a_0%,#0d0d2b_45%,#0a0a1a_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:46px_46px]" />
      <Navbar dark={dark} onToggleTheme={() => setDark((prev) => !prev)} />

      <main id="home" className="relative mx-auto flex w-[min(1120px,92vw)] flex-col gap-12 py-10">
        <motion.section {...fadeUp} className="glass-ring relative rounded-[2rem] border border-white/10 bg-[#0d0d2b]/80 p-8 shadow-[0_30px_120px_rgba(124,58,237,0.24)] backdrop-blur-xl md:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_260px]">
            <div>
              <p className="text-sm font-medium text-purple-300">Frontend-first, placement-focused</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-6xl">{profile.name}</h1>
              <p className="cursor-pulse mt-4 text-lg font-semibold text-[#a0a0c0] md:text-xl">{profile.role}</p>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[#a0a0c0]">{profile.intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#projects" className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(124,58,237,0.45)] transition hover:bg-purple-500">
                  View Projects
                </a>
                <a href="#contact" className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-purple-100 transition hover:border-purple-400/50 hover:bg-purple-500/10">
                  Contact
                </a>
                <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[#a0a0c0] transition hover:text-white">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/Rajalakshmir10" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[#a0a0c0] transition hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-purple-300/40 bg-[radial-gradient(circle,rgba(168,85,247,0.28),rgba(255,255,255,0.04)_55%,rgba(124,58,237,0.12))] text-5xl font-black text-white shadow-[0_0_80px_rgba(168,85,247,0.35)]">
              {initials}
            </div>
          </div>
        </motion.section>

        <div className="section-divider" />

        <motion.section id="about" {...fadeUp} className="rounded-[2rem] bg-[#10102e]/70 p-1">
          <Card title="About">
            <p>{profile.about}</p>
            <p className="mt-3 text-[#a0a0c0]">Education: 3rd year engineering student.</p>
            <p className="mt-1 text-[#a0a0c0]">Goal: secure placements through strong DSA + development execution.</p>
          </Card>
        </motion.section>

        <motion.section id="skills" {...fadeUp} className="grid gap-4 md:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.title} title={skill.title}>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#a0a0c0]">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </motion.section>

        <motion.section id="projects" {...fadeUp} className="rounded-[2rem] bg-[#0d0d2b]/70 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-white">Projects</h2>
            <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">Featured Work</span>
          </div>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
                className={`glass-ring grid gap-6 rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_90px_rgba(124,58,237,0.14)] md:grid-cols-2 md:p-7 ${index % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}
              >
                <div className="project-mockup overflow-hidden rounded-2xl border border-white/10 bg-[#10102e] p-2">
                  <img src={project.image} alt={project.title} loading="lazy" className="h-64 w-full rounded-xl object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#a0a0c0]">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-purple-400/20 bg-purple-500/10 px-2.5 py-1 text-xs text-purple-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm">
                    <a className="text-purple-300 transition hover:text-white" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                    <a className="text-purple-300 transition hover:text-white" href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <button type="button" className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[#a0a0c0] transition hover:border-purple-400/40 hover:text-white" onClick={() => setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}>
              Previous
            </button>
            <p className="text-xs text-[#a0a0c0]">Project {activeProject + 1} of {projects.length}</p>
            <button type="button" className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[#a0a0c0] transition hover:border-purple-400/40 hover:text-white" onClick={() => setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}>
              Next
            </button>
          </div>
        </motion.section>

        <div className="section-divider" />

        <motion.section id="stats" {...fadeUp} className="rounded-[2rem] bg-[#10102e]/70 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-black text-white">Stats</h2>
            <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">Live Dashboard</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="GitHub Stats">
              {githubLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-20 animate-pulse rounded-xl bg-white/10" />
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
                <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="inline-flex rounded-lg border border-purple-400/40 px-3 py-2 text-sm text-purple-200 transition hover:bg-purple-500/10">
                  Open GitHub Profile
                </a>
              </div>
            </Card>

            <Card title="LeetCode Stats">
              {leetLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-20 animate-pulse rounded-xl bg-white/10" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatsCard label="Total Solved" value={leetStats?.totalSolved ?? '--'} />
                  <StatsCard label="Easy / Medium / Hard" value={`${leetStats?.easySolved ?? '--'} / ${leetStats?.mediumSolved ?? '--'} / ${leetStats?.hardSolved ?? '--'}`} />
                  <StatsCard label="Acceptance Rate" value={leetStats?.acceptanceRate ? `${leetStats.acceptanceRate}%` : '--'} />
                  <StatsCard label="Global Ranking" value={leetStats?.ranking ?? '--'} />
                  <StatsCard label="Contribution Points" value={leetStats?.contributionPoints ?? '--'} />
                  <StatsCard label="Reputation" value={leetStats?.reputation ?? '--'} />
                </div>
              )}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-2 text-sm font-semibold text-white">Solved Distribution</p>
                <div className="space-y-2">
                  {leetBreakdown.map((item) => {
                    const percentage = leetTotal > 0 ? Math.round((item.value / leetTotal) * 100) : 0;
                    return (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-xs text-[#a0a0c0]">
                          <span>{item.label}</span>
                          <span>{item.value} ({percentage}%)</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full ${item.color}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <a href="https://leetcode.com/Raji1009/" target="_blank" rel="noreferrer" className="inline-flex rounded-lg border border-purple-400/40 px-3 py-2 text-sm text-purple-200 transition hover:bg-purple-500/10">
                  Open LeetCode Profile
                </a>
              </div>
            </Card>
          </div>
        </motion.section>

        <motion.section id="timeline" {...fadeUp} className="rounded-[2rem] bg-[#0d0d2b]/70 p-6 md:p-8">
          <h2 className="mb-6 text-3xl font-black text-white">Timeline</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="glass-ring rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_70px_rgba(124,58,237,0.12)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-sm font-bold text-purple-200">
                  {item.type[0]}
                </div>
                <p className="text-xs uppercase tracking-wide text-purple-300">{item.type}</p>
                <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#a0a0c0]">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" {...fadeUp} className="glass-ring rounded-[2rem] border border-white/10 bg-[#10102e]/80 p-6 shadow-[0_24px_90px_rgba(124,58,237,0.16)] md:p-8">
          <h2 className="text-3xl font-black text-white">Contact</h2>
          <form onSubmit={handleContactSubmit} className="mt-5 grid gap-3 md:grid-cols-2">
            <input className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none transition placeholder:text-[#a0a0c0] focus:border-purple-400/50" placeholder="Your Name" value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} required />
            <input className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none transition placeholder:text-[#a0a0c0] focus:border-purple-400/50" placeholder="Your Email" type="email" value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} required />
            <textarea className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-white outline-none transition placeholder:text-[#a0a0c0] focus:border-purple-400/50 md:col-span-2" rows="4" placeholder="Message" value={formData.message} onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))} required />
            <button type="submit" className="rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(124,58,237,0.35)] transition hover:bg-purple-500 md:col-span-2">
              Send Message
            </button>
          </form>
          <div className="mt-5 flex gap-4 text-sm">
            <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="text-purple-300 transition hover:text-white">GitHub</a>
            <a href="https://www.linkedin.com/in/Rajalakshmir10" target="_blank" rel="noreferrer" className="text-purple-300 transition hover:text-white">LinkedIn</a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
