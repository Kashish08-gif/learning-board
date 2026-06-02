export default function CoursesLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 h-3 w-20 animate-pulse rounded-full bg-pink-100/10" />
        <div className="mb-3 h-9 w-36 animate-pulse rounded-2xl bg-white/[0.07]" />
        <div className="h-4 w-72 animate-pulse rounded-full bg-white/[0.05]" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/[0.05] sm:max-w-md" />
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/[0.08] sm:w-36" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="min-h-[260px] rounded-3xl border border-white/10 bg-white/[0.025] p-5"
          >
            <div className="mb-6 h-11 w-11 animate-pulse rounded-2xl bg-white/[0.07]" />
            <div className="mb-2 h-5 w-2/3 animate-pulse rounded-full bg-white/[0.07]" />
            <div className="mb-7 h-4 w-24 animate-pulse rounded-full bg-white/[0.05]" />
            <div className="mb-5 h-2 w-full animate-pulse rounded-full bg-white/[0.06]" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((button) => (
                <div
                  key={button}
                  className="h-9 animate-pulse rounded-2xl bg-white/[0.05]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
