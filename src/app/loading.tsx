export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 lg:col-span-2">
        <div className="mb-4 h-7 w-44 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="mb-3 h-10 w-full max-w-xl animate-pulse rounded-2xl bg-white/[0.07]" />
        <div className="h-4 w-72 animate-pulse rounded-full bg-white/[0.05]" />
      </div>

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="min-h-[240px] rounded-3xl border border-white/10 bg-white/[0.025] p-5"
        >
          <div className="mb-6 h-11 w-11 animate-pulse rounded-2xl bg-white/[0.07]" />
          <div className="mb-2 h-5 w-2/3 animate-pulse rounded-full bg-white/[0.07]" />
          <div className="mb-8 h-4 w-24 animate-pulse rounded-full bg-white/[0.05]" />
          <div className="h-2 w-full animate-pulse rounded-full bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}
