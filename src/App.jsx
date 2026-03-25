import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';

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

  const [repoTotals, setRepoTotals] = useState({ stars: 0, forks: 0 });
  const [recentCommits, setRecentCommits] = useState('--');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const [githubResponse, reposResponse, eventsResponse] =
          await Promise.all([
            fetch('https://api.github.com/users/Raji1009'),
            fetch('https://api.github.com/users/Raji1009/repos?per_page=100'),
            fetch('https://api.github.com/users/Raji1009/events/public?per_page=100')
          ]);

        const githubData = await githubResponse.json();
        setGithubStats(githubData);

        const reposData = await reposResponse.json();
        const stars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const forks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
        setRepoTotals({ stars, forks });

        const eventsData = await eventsResponse.json();
        const pushEvents = eventsData.filter(e => e.type === 'PushEvent');
        const commitCount = pushEvents.reduce(
          (sum, e) => sum + e.payload.commits.length,
          0
        );
        setRecentCommits(commitCount);
      } catch {
        setGithubStats(null);
      } finally {
        setGithubLoading(false);
      }

      // ✅ FIXED LEETCODE API
      try {
        const res = await fetch(
          'https://leetcode-stats-api.herokuapp.com/Rajalakshmi_10'
        );
        const data = await res.json();
        setLeetStats(data);
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
    () =>
      'https://github-readme-streak-stats.herokuapp.com?user=Raji1009&theme=github-dark&hide_border=true',
    []
  );

  return (
    <div className={`${dark ? 'dark bg-slate-950 text-white' : ''}`}>
      <Navbar dark={dark} onToggleTheme={() => setDark(!dark)} />

      <main className="p-6 space-y-8 max-w-6xl mx-auto">

        {/* ================= STATS SECTION ================= */}
        <motion.section id="stats" {...fadeUp}>
          <h2 className="text-2xl font-bold mb-4">Stats</h2>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* ================= GITHUB ================= */}
            <Card title="GitHub Stats">
              {githubLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <StatsCard label="Recent Commits" value={recentCommits} />
                    <StatsCard label="Total Stars" value={repoTotals.stars} />
                    <StatsCard label="Repos" value={githubStats?.public_repos} />
                    <StatsCard label="Followers" value={githubStats?.followers} />
                  </div>

                  {/* GitHub Cards */}
                  <div className="mt-4 space-y-3">
                    <img src={githubApiImage} className="rounded-xl" />
                    <img src={streakImage} className="rounded-xl" />
                  </div>

                  {/* 🔥 CONTRIBUTION HEATMAP */}
                  <div className="mt-6">
                    <h3 className="text-sm text-slate-400 mb-2">
                      Contribution Activity
                    </h3>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto">
                      <GitHubCalendar
                        username="Raji1009"
                        blockSize={12}
                        blockMargin={4}
                        fontSize={12}
                        theme={{
                          dark: [
                            '#0f172a',
                            '#134e4a',
                            '#0e7490',
                            '#06b6d4',
                            '#22d3ee'
                          ]
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </Card>

            {/* ================= LEETCODE ================= */}
            <Card title="LeetCode Stats">
              {leetLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <StatsCard label="Total Solved" value={leetStats?.totalSolved} />
                    <StatsCard
                      label="Easy / Medium / Hard"
                      value={`${leetStats?.easySolved} / ${leetStats?.mediumSolved} / ${leetStats?.hardSolved}`}
                    />
                    <StatsCard
                      label="Acceptance Rate"
                      value={`${leetStats?.acceptanceRate}%`}
                    />
                    <StatsCard
                      label="Ranking"
                      value={leetStats?.ranking}
                    />
                  </div>

                  {/* 🔥 LEETCODE HEATMAP STYLE */}
                  <div className="mt-6">
                    <h3 className="text-sm text-slate-400 mb-2">
                      LeetCode Activity
                    </h3>

                    <img
                      src="https://leetcard.jacoblin.cool/Rajalakshmi_10?theme=dark&ext=heatmap"
                      className="rounded-xl border border-slate-800"
                    />
                  </div>
                </>
              )}
            </Card>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
