export default function StatsCard({ label, value }) {
  return (
    <div className="glass-card rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_0_28px_rgba(124,58,237,0.22)]">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-[#a0a0c0]">{label}</p>
    </div>
  );
}
