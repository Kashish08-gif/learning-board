export default function Loading() {
  return (
    <div className="flex h-screen bg-[#060606]">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex w-[220px] h-screen bg-[#080808] border-r border-white/[0.06] p-5 flex-col gap-3 flex-shrink-0">
        <div className="h-8 w-28 bg-white/[0.05] rounded-lg animate-pulse mb-6" />
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-full bg-white/[0.04] rounded-xl animate-pulse"
          />
        ))}
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="col-span-2 h-44 bg-white/[0.04] rounded-2xl animate-pulse" />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-44 bg-white/[0.04] rounded-2xl animate-pulse"
            />
          ))}
          <div className="col-span-2 h-40 bg-white/[0.04] rounded-2xl animate-pulse" />
        </div>
      </main>
    </div>
  );
}
