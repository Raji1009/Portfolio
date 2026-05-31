export default function Card({ title, children, className = '' }) {
  return (
    <article className={`glass-ring rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(124,58,237,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:shadow-[0_24px_90px_rgba(168,85,247,0.2)] ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      <div className="mt-3 text-[#a0a0c0]">{children}</div>
    </article>
  );
}
