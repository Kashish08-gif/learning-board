import { supabase } from "@/lib/supabase";
import CoursesList from "../components/CoursesList";
import { AlertCircle } from "lucide-react";

export default async function CoursesPage() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-red-400/20 bg-red-500/10 p-7 shadow-[0_24px_80px_rgba(239,68,68,0.10)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
              <AlertCircle className="text-red-300" size={22} />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Failed to Load Courses
            </h2>
          </div>
          <p className="mb-4 text-sm leading-6 text-zinc-400">
            Unable to fetch courses from the database. Please check your
            connection and try again.
          </p>
          <p className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-zinc-500">
            Error: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return <CoursesList initialCourses={courses || []} />;
}
