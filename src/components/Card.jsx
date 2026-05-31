export default function Card({ title, children, className = '' }) {
  return (
    <article className={`rounded-2xl border border-slate-800/90 bg-slate-900/70 p-5 shadow-glow ${className}`}>
      {title && <h3 className="text-lg font-semibold text-slate-100">{title}</h3>}
      <div className="mt-3 text-slate-300">{children}</div>
    </article>
  );
}
