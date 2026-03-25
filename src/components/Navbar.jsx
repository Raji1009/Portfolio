export default function Navbar({ dark, onToggleTheme }) {
  const navItems = ['about', 'skills', 'projects', 'stats', 'contact'];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-3 py-3">
        <a href="#home" className="font-bold text-slate-100">Raji.dev</a>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="rounded-full px-3 py-1 text-sm text-slate-300 hover:bg-slate-800/70 hover:text-slate-100">
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/resume.pdf" download className="rounded-lg border border-cyan-400/40 px-3 py-1.5 text-sm text-cyan-300 hover:bg-cyan-500/10">
            Resume
          </a>
          <button onClick={onToggleTheme} className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800">
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  );
}
