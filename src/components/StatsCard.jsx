export default function StatsCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition hover:-translate-y-1 hover:border-cyan-400/40">
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
