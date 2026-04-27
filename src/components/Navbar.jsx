export default function Navbar({ dark, onToggleTheme }) {
  const navItems = ['about', 'skills', 'projects', 'stats', 'timeline', 'contact'];

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur ${
        dark
          ? 'border-slate-800/90 bg-slate-950/85'
          : 'border-slate-300/80 bg-white/85'
      }`}
    >
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-3 py-3">
        <a href="#home" className={`font-bold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Raji.dev</a>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`rounded-full px-3 py-1 text-sm ${
                dark
                  ? 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                  : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              dark
                ? 'border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10'
                : 'border-cyan-600/40 text-cyan-700 hover:bg-cyan-100'
            }`}
          >
            Resume
          </a>
          <button
            onClick={onToggleTheme}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              dark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  );
}
