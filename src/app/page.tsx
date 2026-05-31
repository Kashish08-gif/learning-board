import { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import HeroTile from "./components/HeroTile";
import CourseCard from "./components/CourseCard";
import ActivityTile from "./components/ActivityTile";
import { Course } from "@/types";
import Loading from "./loading";
import { supabase } from "@/lib/supabase";

const getCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    return [];
  }
  return data;
};


export default async function Home() {
  const courses: Course[] = await getCourses();
  return (
    <div className="flex h-screen bg-[#060606] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Hero tile — full width */}
            <HeroTile />

            {/* Course tiles */}
            {courses.length != 0 &&  courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}

            {/* Activity tile — full width */}
            <ActivityTile />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
