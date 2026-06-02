"use client";

import { motion } from "framer-motion";

const activityData = [
  0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 2, 1, 0, 0, 1, 2, 3, 2, 1, 2, 3, 3, 2, 1,
  0, 0, 1, 2, 2, 3, 3, 2, 1, 0, 1, 2, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1,
];

const cellColor = (level: number) =>
  ({
    0: "bg-white/[0.04]",
    1: "bg-cyan-900/50",
    2: "bg-cyan-600/60",
    3: "bg-cyan-400",
  })[level] ?? "bg-white/[0.04]";

export default function ActivityTile() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.20)] sm:p-6 lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-white">Learning Activity</h2>
        <span className="text-xs text-zinc-500">Last 7 weeks</span>
      </div>

      {/* Activity grid */}
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
                delay: 0.55 + i * 0.012,
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

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className="mr-1 text-xs text-zinc-500">Less</span>
        {[0, 1, 2, 3].map((l) => (
          <div key={l} className={`h-3 w-3 rounded ${cellColor(l)}`} />
        ))}
        <span className="ml-1 text-xs text-zinc-500">More</span>
      </div>
    </motion.article>
  );
}
