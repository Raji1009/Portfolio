export default function Navbar() {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'stats', label: 'Stats' },
    { id: 'journey', label: 'Highlights' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a1a]/65 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1180px,92vw)] flex-wrap items-center justify-between gap-3 py-4">
        <a href="#home" className="text-base font-bold tracking-tight text-white">
          Raji.dev
        </a>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-3 py-1 text-sm text-[#a0a0c0] transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/resume.pdf"
          download
          className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-200 shadow-[0_0_22px_rgba(124,58,237,0.24)] transition hover:border-violet-300 hover:bg-violet-500/20"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
