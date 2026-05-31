export default function StatsCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_50px_rgba(124,58,237,0.12)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-[0_18px_60px_rgba(168,85,247,0.18)]">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-[#a0a0c0]">{label}</p>
    </div>
  );
}
