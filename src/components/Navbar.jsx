export default function Navbar({ onToggleTheme }) {
  const navItems = ['about', 'skills', 'projects', 'stats', 'timeline', 'contact'];
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a1a]/70 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-3 py-3">
        <a href="#home" className="font-bold text-white">Raji.dev</a>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="rounded-full px-3 py-1 text-sm text-[#a0a0c0] transition hover:bg-white/10 hover:text-white">
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={resumeHref} download className="rounded-lg border border-purple-400/40 px-3 py-1.5 text-sm text-purple-200 shadow-[0_0_24px_rgba(124,58,237,0.18)] transition hover:bg-purple-500/10">
            Resume
          </a>
          <button onClick={onToggleTheme} className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[#a0a0c0] transition hover:bg-white/10 hover:text-white">
            Theme
          </button>
        </div>
      </div>
    </header>
  );
}
