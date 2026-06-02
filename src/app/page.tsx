import { Suspense } from "react";
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
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <HeroTile />

        {courses.length !== 0 &&
          courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              showActions={false}
            />
          ))}

        <ActivityTile />
      </div>
    </Suspense>
  );
}
