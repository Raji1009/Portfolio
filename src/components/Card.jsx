export default function Card({ title, children, className = '' }) {
  return (
    <article className={`glass-card rounded-3xl p-5 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      <div className="mt-3 text-[#a0a0c0]">{children}</div>
    </article>
  );
}
