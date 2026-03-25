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
  transition: { duration: 0.5 }
};

export default function App() {
  const [dark, setDark] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetLoading, setLeetLoading] = useState(true);
  const [githubStats, setGithubStats] = useState(null);
  const [leetStats, setLeetStats] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const githubResponse = await fetch('https://api.github.com/users/Raji1009');
        const githubData = await githubResponse.json();
        setGithubStats(githubData);
      } catch {
        setGithubStats(null);
      } finally {
        setGithubLoading(false);
      }

      try {
        const leetResponse = await fetch('https://leetcode-stats-api.herokuapp.com/Raji1009');
        const leetData = await leetResponse.json();
        setLeetStats(leetData);
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

  return (
    <div className="min-h-screen bg-slate-950 bg-grid bg-[length:28px_28px] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_44%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.16),_transparent_40%)]" />
      <Navbar dark={dark} onToggleTheme={() => setDark((prev) => !prev)} />

      <main id="home" className="relative mx-auto flex w-[min(1120px,92vw)] flex-col gap-6 py-8">
        <motion.section {...fadeUp} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-glow">
          <p className="text-sm font-medium text-cyan-300">Frontend-first, placement-focused</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl">{profile.name}</h1>
          <p className="mt-3 text-lg text-slate-300">{profile.role}</p>
          <p className="mt-4 max-w-3xl text-slate-400">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-200 hover:bg-cyan-500/30">View Projects</a>
            <a href="#contact" className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-800">Contact</a>
          </div>
        </motion.section>

        <motion.section id="about" {...fadeUp}>
          <Card title="About">
            <p>{profile.about}</p>
            <p className="mt-3 text-slate-400">Education: 3rd year engineering student.</p>
            <p className="mt-1 text-slate-400">Goal: secure placements through strong DSA + development execution.</p>
          </Card>
        </motion.section>

        <motion.section id="skills" {...fadeUp} className="grid gap-4 md:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.title} title={skill.title}>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </motion.section>

        <motion.section id="projects" {...fadeUp}>
          <h2 className="mb-4 text-2xl font-bold">Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" className="h-44 w-full rounded-xl object-cover" />
                <h3 className="mt-4 text-xl font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3 text-sm">
                  <a className="text-cyan-300 hover:text-cyan-200" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                  <a className="text-violet-300 hover:text-violet-200" href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section id="stats" {...fadeUp}>
          <h2 className="mb-4 text-2xl font-bold">Stats</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="GitHub Stats">
              {githubLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-20 animate-pulse rounded-xl bg-slate-800/70" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatsCard label="Public Repos" value={githubStats?.public_repos ?? '--'} />
                  <StatsCard label="Followers" value={githubStats?.followers ?? '--'} />
                  <StatsCard label="Following" value={githubStats?.following ?? '--'} />
                  <StatsCard label="Contributions" value="See graphs below" />
                </div>
              )}
              <div className="mt-4 grid gap-3">
                <img src={githubApiImage} loading="lazy" alt="GitHub Readme Stats" className="w-full rounded-xl border border-slate-800" />
                <img src={streakImage} loading="lazy" alt="GitHub Streak Stats" className="w-full rounded-xl border border-slate-800" />
              </div>
            </Card>

            <Card title="LeetCode Stats">
              {leetLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-20 animate-pulse rounded-xl bg-slate-800/70" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatsCard label="Total Solved" value={leetStats?.totalSolved ?? '--'} />
                  <StatsCard label="Easy / Medium / Hard" value={`${leetStats?.easySolved ?? '--'} / ${leetStats?.mediumSolved ?? '--'} / ${leetStats?.hardSolved ?? '--'}`} />
                  <StatsCard label="Acceptance Rate" value={leetStats?.acceptanceRate ? `${leetStats.acceptanceRate}%` : '--'} />
                  <StatsCard label="Ranking" value={leetStats?.ranking ?? '--'} />
                </div>
              )}
            </Card>
          </div>
        </motion.section>

        <motion.section {...fadeUp}>
          <h2 className="mb-4 text-2xl font-bold">Timeline</h2>
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            {timeline.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-cyan-300">{item.type}</p>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" {...fadeUp} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-bold">Contact</h2>
          <form className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="rounded-lg border border-slate-700 bg-slate-950 p-3" placeholder="Your Name" />
            <input className="rounded-lg border border-slate-700 bg-slate-950 p-3" placeholder="Your Email" type="email" />
            <textarea className="md:col-span-2 rounded-lg border border-slate-700 bg-slate-950 p-3" rows="4" placeholder="Message" />
            <button type="button" className="md:col-span-2 rounded-lg bg-cyan-600/20 px-4 py-2 text-cyan-200 hover:bg-cyan-600/30">
              Send Message
            </button>
          </form>
          <div className="mt-4 flex gap-4 text-sm">
            <a href="https://github.com/Raji1009" target="_blank" rel="noreferrer" className="text-cyan-300">GitHub</a>
            <a href="https://www.linkedin.com/in/Rajalakshmir10" target="_blank" rel="noreferrer" className="text-violet-300">LinkedIn</a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
