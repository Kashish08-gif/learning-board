"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Clock,
  Trophy,
  BookOpen,
  CheckCircle2,
  Star,
  Play,
} from "lucide-react";

const stats = [
  {
    icon: Flame,
    value: "12",
    unit: "days",
    label: "Current Streak",
    color: "orange",
  },
  {
    icon: Clock,
    value: "72",
    unit: "hrs",
    label: "Hours Learned",
    color: "cyan",
  },
  {
    icon: BookOpen,
    value: "8",
    unit: "",
    label: "Courses Done",
    color: "emerald",
  },
  {
    icon: Trophy,
    value: "4",
    unit: "",
    label: "Badges Earned",
    color: "yellow",
  },
];

const colorMap = {
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-400",
    value: "text-orange-300",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "text-cyan-400",
    value: "text-cyan-300",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    value: "text-emerald-300",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: "text-yellow-400",
    value: "text-yellow-300",
  },
};

const typeConfig = {
  Completed: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  Achievement: {
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  Started: {
    icon: Play,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
};

const activities = [
  {
    id: 1,
    title: "Completed React Hooks",
    time: "2 hours ago",
    type: "Completed",
  },
  {
    id: 2,
    title: "Finished Next.js Routing",
    time: "1 day ago",
    type: "Completed",
  },
  {
    id: 3,
    title: "Earned UI/UX Badge",
    time: "2 days ago",
    type: "Achievement",
  },
  {
    id: 4,
    title: "Started Database Design",
    time: "3 days ago",
    type: "Started",
  },
];

const activityData = [
  0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 2, 1, 0, 0, 1, 2, 3, 2, 1, 2, 3, 3, 2,
  1, 0, 0, 1, 2, 2, 3, 3, 2, 1, 0, 1, 2, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1,
];

const cellColor = (level: number) =>
  ({
    0: "bg-white/[0.04]",
    1: "bg-cyan-900/50",
    2: "bg-cyan-600/60",
    3: "bg-cyan-400",
  })[level] ?? "bg-white/[0.04]";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="mb-8"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-100/50">
            Overview
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Learning Activity
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Track your learning progress and celebrate the tiny wins.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => {
            const c = colorMap[stat.color as keyof typeof colorMap];
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className={`rounded-3xl ${c.bg} border ${c.border} p-5 shadow-[0_16px_50px_rgba(0,0,0,0.16)]`}
              >
                <Icon size={15} className={`${c.icon} mb-3`} />
                <p className={`text-2xl font-bold ${c.value} leading-none`}>
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm font-medium ml-1 opacity-60">
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="text-zinc-500 text-xs mt-1.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Contribution heatmap */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.38,
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
          className="rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.20)] sm:p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">
              Learning Activity
            </h2>
            <span className="text-xs text-zinc-500">Last 7 weeks</span>
          </div>

          <div className="overflow-x-auto pb-1">
            <div
              className="grid w-max gap-1.5"
              style={{ gridTemplateColumns: "repeat(7, minmax(20px, 28px))" }}
            >
              {activityData.map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.01,
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }}
                  whileHover={{ scale: 1.35, transition: { duration: 0.1 } }}
                  className={`h-5 w-5 cursor-pointer rounded-md sm:h-7 sm:w-7 ${cellColor(level)}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-4">
            <span className="text-zinc-600 text-xs mr-1">Less</span>
            {[0, 1, 2, 3].map((l) => (
              <div key={l} className={`w-3 h-3 rounded-sm ${cellColor(l)}`} />
            ))}
            <span className="text-zinc-600 text-xs ml-1">More</span>
          </div>
        </motion.article>

        {/* Recent activity list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
        >
          <h2 className="mb-4 text-sm font-semibold text-white">
            Recent Activity
          </h2>

          <div className="space-y-2.5">
            {activities.map((activity, i) => {
              const t = typeConfig[activity.type as keyof typeof typeConfig];
              const TIcon = t.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#0d0c0d]/90 px-4 py-4 transition-colors hover:border-pink-200/20 sm:px-5"
                >
                  <div
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${t.bg}`}
                  >
                    <TIcon size={14} className={t.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {activity.title}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {activity.time}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${t.bg} ${t.color}`}
                  >
                    {activity.type}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
    </div>
  );
}
