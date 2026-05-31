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
      className="rounded-2xl bg-[#0c0c0c] border border-white/[0.06] p-6 col-span-2"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-sm font-semibold">Learning Activity</h2>
        <span className="text-zinc-600 text-xs">Last 7 weeks</span>
      </div>

      {/* Activity grid */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: "repeat(7, 28px)" }}
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
            whileHover={{ scale: 1.4, transition: { duration: 0.1 } }}
            className={`aspect-square rounded-sm cursor-pointer ${cellColor(level)}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className="text-zinc-600 text-xs mr-1">Less</span>
        {[0, 1, 2, 3].map((l) => (
          <div key={l} className={`w-3 h-3 rounded-sm ${cellColor(l)}`} />
        ))}
        <span className="text-zinc-600 text-xs ml-1">More</span>
      </div>
    </motion.article>
  );
}
