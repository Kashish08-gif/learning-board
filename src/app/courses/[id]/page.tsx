import Link from "next/link";
import { notFound } from "next/navigation";
import { icons, ArrowLeft, Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Course } from "@/types";

const milestones = [
  "Review course overview",
  "Complete core lessons",
  "Practice with exercises",
  "Finish final project",
];

const statusLabel = (progress: number) =>
  progress < 30
    ? "Just started"
    : progress < 70
      ? "In progress"
      : "Almost done";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const course = data as Course;
  const Icon = icons[course.icon_name as keyof typeof icons] ?? icons.BookOpen;
  const completedMilestones = Math.max(1, Math.ceil(course.progress / 25));

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-pink-200/25 hover:bg-white/[0.07] hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Courses
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(244,114,182,0.13),transparent_34%,rgba(34,211,238,0.10)_80%,transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-200/45 to-transparent" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_14px_40px_rgba(34,211,238,0.12)]">
              <Icon size={24} className="text-cyan-100" />
            </div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-pink-200/15 bg-pink-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100/70">
              <Sparkles size={13} />
              {statusLabel(course.progress)}
            </p>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              A focused learning space for this course. Track progress, review
              milestones, and keep momentum without leaving the cozy dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Progress
                </p>
                <p className="mt-1 text-4xl font-bold text-white">
                  {course.progress}%
                </p>
              </div>
              <CheckCircle2 className="text-emerald-200" size={26} />
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-300 via-cyan-300 to-emerald-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Course Snapshot
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-zinc-400">
                <Calendar size={15} className="text-pink-100" />
                Created
              </span>
              <span className="text-sm font-medium text-white">
                {new Date(course.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-zinc-400">
                <Clock size={15} className="text-cyan-100" />
                Pace
              </span>
              <span className="text-sm font-medium text-white">Steady</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Learning Path
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {milestones.map((milestone, index) => {
              const done = index < completedMilestones;
              return (
                <div
                  key={milestone}
                  className={`rounded-2xl border px-4 py-3 ${
                    done
                      ? "border-emerald-200/20 bg-emerald-300/10"
                      : "border-white/10 bg-white/[0.035]"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      done ? "text-emerald-100" : "text-zinc-400"
                    }`}
                  >
                    {milestone}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Step {index + 1}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
