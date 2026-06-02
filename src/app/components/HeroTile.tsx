"use client";

import { motion } from "framer-motion";
import { Clock, Flame, Sparkles, Trophy } from "lucide-react";

const stats = [
  { icon: Flame, value: "12 days", label: "streak", color: "orange" },
  { icon: Trophy, value: "4", label: "badges", color: "yellow" },
  { icon: Clock, value: "24h", label: "this week", color: "cyan" },
];

const colorMap: Record<
  string,
  { bg: string; border: string; icon: string; value: string; label: string }
> = {
  orange: {
    bg: "bg-orange-400/10",
    border: "border-orange-300/20",
    icon: "text-orange-300",
    value: "text-orange-200",
    label: "text-orange-200/60",
  },
  yellow: {
    bg: "bg-yellow-300/10",
    border: "border-yellow-200/20",
    icon: "text-yellow-200",
    value: "text-yellow-100",
    label: "text-yellow-100/55",
  },
  cyan: {
    bg: "bg-cyan-300/10",
    border: "border-cyan-200/20",
    icon: "text-cyan-200",
    value: "text-cyan-100",
    label: "text-cyan-100/55",
  },
};

export default function HeroTile() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.008 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0b0d]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7 lg:col-span-2"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(244,114,182,0.10),transparent_30%,rgba(34,211,238,0.08)_72%,transparent)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200/15 bg-pink-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100/75">
            <Sparkles size={13} />
            Welcome back
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Good morning, Kashish
          </h1>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            You have 3 courses in progress. Your study streak is looking sweet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:items-center">
          {stats.map((stat, i) => {
            const c = colorMap[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                whileHover={{ y: -3, scale: 1.03 }}
                className={`flex items-center gap-2 rounded-2xl border ${c.bg} ${c.border} px-4 py-3 shadow-[0_10px_36px_rgba(0,0,0,0.16)]`}
              >
                <stat.icon size={16} className={c.icon} />
                <div>
                  <p className={`${c.value} text-sm font-bold leading-none`}>
                    {stat.value}
                  </p>
                  <p className={`${c.label} mt-0.5 text-xs`}>{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
