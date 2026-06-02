"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Palette, Shield, User } from "lucide-react";

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);

  return (
    <button
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300/25 ${
        on ? "bg-gradient-to-r from-pink-400 to-cyan-400" : "bg-white/10"
      }`}
    >
      <motion.span
        animate={{ x: on ? 21 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 block h-4 w-4 rounded-full bg-white shadow"
      />
    </button>
  );
}

function RadioOption({ label, checked }: { label: string; checked: boolean }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]">
      <div
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          checked
            ? "border-pink-200"
            : "border-zinc-700 group-hover:border-zinc-500"
        }`}
      >
        {checked && <div className="h-1.5 w-1.5 rounded-full bg-pink-200" />}
      </div>
      <span
        className={`text-sm transition-colors ${
          checked ? "text-white" : "text-zinc-500"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

const panelClass =
  "rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.20)] sm:p-6";

const iconBoxClass =
  "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.055]";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-100/50">
          Account
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Tune the dashboard to feel calm, cozy, and useful.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 260, damping: 22 }}
          whileHover={{ y: -3 }}
          className={panelClass}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className={iconBoxClass}>
              <User size={15} className="text-pink-100" />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Profile Information
            </h2>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              defaultValue="Kashish"
              placeholder="Full Name"
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-pink-200/35 focus:outline-none"
            />
            <input
              type="email"
              defaultValue="kashish@example.com"
              placeholder="Email Address"
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-pink-200/35 focus:outline-none"
            />
            <button className="rounded-2xl border border-cyan-200/25 bg-cyan-300/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-300/15">
              Save Changes
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, type: "spring", stiffness: 260, damping: 22 }}
          whileHover={{ y: -3 }}
          className={panelClass}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className={iconBoxClass}>
              <Palette size={15} className="text-cyan-100" />
            </div>
            <h2 className="text-sm font-semibold text-white">Appearance</h2>
          </div>

          <div className="space-y-1">
            <RadioOption label="Dark Mode" checked={true} />
            <RadioOption label="Light Mode" checked={false} />
            <RadioOption label="System Default" checked={false} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 22 }}
          whileHover={{ y: -3 }}
          className={panelClass}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className={iconBoxClass}>
              <Bell size={15} className="text-yellow-100" />
            </div>
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-1">
            {[
              {
                label: "Daily Learning Reminder",
                desc: "Get reminded to study every day",
                on: true,
              },
              {
                label: "Weekly Progress Report",
                desc: "Summary of your weekly progress",
                on: true,
              },
              {
                label: "Course Completion Alerts",
                desc: "Notified when you finish a course",
                on: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl px-3 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <div className="mr-4 min-w-0">
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
                </div>
                <Toggle defaultChecked={item.on} />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, type: "spring", stiffness: 260, damping: 22 }}
          whileHover={{ y: -3 }}
          className={panelClass}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className={iconBoxClass}>
              <Shield size={15} className="text-emerald-100" />
            </div>
            <h2 className="text-sm font-semibold text-white">Security</h2>
          </div>

          <div className="space-y-2">
            <button className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.07]">
              Change Password
            </button>
            <button className="w-full rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-left text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-400/15">
              Enable 2FA
            </button>
            <button className="w-full rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-left text-sm font-medium text-red-200 transition-colors hover:bg-red-400/15">
              Logout
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
