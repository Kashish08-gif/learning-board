export default function CourseDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="h-10 w-36 animate-pulse rounded-2xl bg-white/[0.05]" />

      <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-5 h-14 w-14 animate-pulse rounded-3xl bg-white/[0.07]" />
        <div className="mb-3 h-7 w-40 animate-pulse rounded-full bg-pink-100/10" />
        <div className="mb-3 h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-white/[0.07]" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-full bg-white/[0.05]" />
      </section>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        {[1, 2].map((item) => (
          <section
            key={item}
            className="min-h-[220px] rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
          >
            <div className="mb-5 h-5 w-40 animate-pulse rounded-full bg-white/[0.07]" />
            <div className="space-y-3">
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="h-12 animate-pulse rounded-2xl bg-white/[0.05]"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
