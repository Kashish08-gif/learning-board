export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      category: "Frontend",
      progress: 75,
    },
    {
      id: 2,
      title: "Fullstack Next.js",
      category: "Web Development",
      progress: 45,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      progress: 60,
    },
    {
      id: 4,
      title: "Database Design",
      category: "Backend",
      progress: 30,
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white">
        My Courses
      </h1>

      <p className="text-gray-400 mt-2">
        Manage your courses
      </p>

      {/* Search + Add Course */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
        <input
          type="text"
          placeholder="Search courses..."
          className="
            w-full md:w-80
            bg-white/5
            border border-white/10
            rounded-xl
            px-4 py-3
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:border-cyan-500
          "
        />

        <button
          className="
            bg-cyan-500
            hover:bg-cyan-600
            text-black
            font-semibold
            px-5 py-3
            rounded-xl
            transition-all
          "
        >
          + Add Course
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-6
              hover:border-cyan-500/50
              hover:shadow-lg hover:shadow-cyan-500/10
              transition-all
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {course.title}
                </h2>

                <span
                  className="
                    inline-block
                    mt-2
                    px-3 py-1
                    text-xs
                    rounded-full
                    bg-cyan-500/20
                    text-cyan-400
                  "
                >
                  {course.category}
                </span>
              </div>

              <span className="text-cyan-400 font-semibold">
                {course.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{
                    width: `${course.progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                className="
                  flex-1
                  bg-cyan-500
                  hover:bg-cyan-600
                  text-black
                  font-medium
                  py-2
                  rounded-xl
                "
              >
                View
              </button>

              <button
                className="
                  flex-1
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-black
                  font-medium
                  py-2
                  rounded-xl
                "
              >
                Edit
              </button>

              <button
                className="
                  flex-1
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  font-medium
                  py-2
                  rounded-xl
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}