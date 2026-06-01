export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white">
        Settings
      </h1>

      <p className="text-gray-400 mt-2">
        Manage your account preferences
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Profile Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white"
            />

            <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-2 rounded-xl font-medium">
              Save Changes
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Appearance
          </h2>

          <div className="space-y-3 text-gray-300">
            <label className="flex items-center gap-3">
              <input type="radio" name="theme" />
              Dark Mode
            </label>

            <label className="flex items-center gap-3">
              <input type="radio" name="theme" />
              Light Mode
            </label>

            <label className="flex items-center gap-3">
              <input type="radio" name="theme" />
              System Default
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Notifications
          </h2>

          <div className="space-y-3 text-gray-300">
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Daily Learning Reminder
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Weekly Progress Report
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              Course Completion Alerts
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Security
          </h2>

          <div className="flex flex-col gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-xl">
              Change Password
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-black py-2 rounded-xl">
              Enable 2FA
            </button>

            <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl">
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}