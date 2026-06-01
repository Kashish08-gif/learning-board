export default function ActivityPage() {
  const activities = [
    {
      id: 1,
      title: "Completed React Hooks",
      date: "Today",
      type: "Completed",
    },
    {
      id: 2,
      title: "Finished Next.js Routing",
      date: "Yesterday",
      type: "Completed",
    },
    {
      id: 3,
      title: "Earned UI/UX Badge",
      date: "2 Days Ago",
      type: "Achievement",
    },
    {
      id: 4,
      title: "Started Database Design",
      date: "3 Days Ago",
      type: "Started",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white">
        Learning Activity
      </h1>

      <p className="text-gray-400 mt-2">
        Track your learning progress
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-gray-400">Current Streak</h3>
          <p className="text-3xl font-bold text-orange-400 mt-2">
            12 Days
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-gray-400">Hours Learned</h3>
          <p className="text-3xl font-bold text-cyan-400 mt-2">
            72h
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-gray-400">Courses Completed</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">
            8
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-gray-400">Badges Earned</h3>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            4
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-white mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="
                bg-white/5
                border border-white/10
                rounded-2xl
                p-5
                hover:border-cyan-500/50
                transition-all
              "
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">
                    {activity.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {activity.date}
                  </p>
                </div>

                <span
                  className="
                    px-3 py-1
                    rounded-full
                    text-xs
                    bg-cyan-500/20
                    text-cyan-400
                  "
                >
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}