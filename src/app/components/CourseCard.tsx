"use client";

import { motion } from "framer-motion";
import { icons } from "lucide-react";
import { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const Icon =
    icons[course.icon_name as keyof typeof icons] ?? icons["BookOpen"];

  const progressColor =
    course.progress >= 75
      ? "from-emerald-400 to-teal-500"
      : course.progress >= 40
        ? "from-cyan-400 to-blue-500"
        : "from-blue-400 to-indigo-500";

  const statusLabel =
    course.progress < 30
      ? "Just started"
      : course.progress < 70
        ? "In progress"
        : "Almost done!";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15 + index * 0.1,
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-2xl bg-[#0c0c0c] border border-white/[0.06] p-6 overflow-hidden group cursor-pointer"
    >
      {/* Hover radial glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 65%)",
        }}
      />
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border border-cyan-500/0 group-hover:border-cyan-500/25 transition-colors duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
          className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5"
        >
          <Icon size={18} className="text-cyan-400" />
        </motion.div>

        {/* Title + status */}
        <h3 className="text-white text-base font-semibold mb-1 leading-snug">
          {course.title}
        </h3>
        <p className="text-zinc-600 text-xs mb-5">{statusLabel}</p>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-zinc-600 text-xs">Progress</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-zinc-400 text-xs font-semibold tabular-nums"
            >
              {course.progress}%
            </motion.span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{
                delay: 0.3 + index * 0.1,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`h-full bg-gradient-to-r ${progressColor} rounded-full`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
