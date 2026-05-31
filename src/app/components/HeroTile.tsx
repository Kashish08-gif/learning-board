"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, Clock } from "lucide-react";

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
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-400",
    value: "text-orange-300",
    label: "text-orange-500/60",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: "text-yellow-400",
    value: "text-yellow-300",
    label: "text-yellow-500/60",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "text-cyan-400",
    value: "text-cyan-300",
    label: "text-cyan-500/60",
  },
};

export default function HeroTile() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.01 }}
      className="relative col-span-2 rounded-2xl overflow-hidden border border-white/6 bg-[#0c0c0c] p-8"
    >
      {/* Background glows */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left text */}
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
          <p className="text-zinc-500 text-xs mb-2 tracking-widest uppercase font-semibold">
            Welcome back
          </p>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-2">
            Good morning, Kashish 👋
          </h1>
          <p className="text-zinc-500 text-sm">
            You have 3 courses in progress. Keep it up!
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex items-center gap-3 shrink-0">
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
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 ${c.bg} border ${c.border} rounded-xl px-4 py-3`}
              >
                <stat.icon size={16} className={c.icon} />
                <div>
                  <p className={`${c.value} text-sm font-bold leading-none`}>
                    {stat.value}
                  </p>
                  <p className={`${c.label} text-xs mt-0.5`}>{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
