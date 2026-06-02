"use client";

import { motion } from "framer-motion";
import { icons, Eye, Pencil, Trash } from "lucide-react";
import { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index: number;
  onView?: (course: Course) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
  showActions?: boolean;
}

export default function CourseCard({
  course,
  index,
  onView,
  onEdit,
  onDelete,
  showActions = true,
}: CourseCardProps) {
  const Icon =
    icons[course.icon_name as keyof typeof icons] ?? icons["BookOpen"];

  const progressColor =
    course.progress >= 75
      ? "from-emerald-300 to-teal-400"
      : course.progress >= 40
        ? "from-cyan-300 to-blue-400"
        : "from-pink-300 to-violet-400";

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
        y: -5,
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group relative min-h-[260px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0d0c0d]/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-colors hover:border-pink-200/20 sm:p-6"
    >
      {/* Hover wash */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(244,114,182,0.10), transparent 38%, rgba(34,211,238,0.08))",
        }}
      />
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-3xl border border-cyan-300/0 group-hover:border-cyan-200/20 transition-colors duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.055] shadow-[0_10px_28px_rgba(34,211,238,0.10)]"
        >
          <Icon size={18} className="text-cyan-200" />
        </motion.div>

        {/* Title + status */}
        <h3 className="mb-1 text-base font-semibold leading-snug text-white">
          {course.title}
        </h3>
        <p className="mb-5 text-xs text-zinc-500">{statusLabel}</p>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500">Progress</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-xs font-semibold tabular-nums text-zinc-300"
            >
              {course.progress}%
            </motion.span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
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

        {/* Action Buttons */}
        {showActions && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onView?.(course);
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-zinc-400 transition-colors duration-200 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
              aria-label="View course details"
            >
              <Eye size={14} />
              <span className="text-xs font-medium">View</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(course);
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-zinc-400 transition-colors duration-200 hover:border-pink-300/30 hover:bg-pink-300/10 hover:text-pink-100"
              aria-label="Edit course"
            >
              <Pencil size={14} />
              <span className="text-xs font-medium">Edit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(course);
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-zinc-400 transition-colors duration-200 hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-200"
              aria-label="Delete course"
            >
              <Trash size={14} />
              <span className="text-xs font-medium">Delete</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
