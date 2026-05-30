"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, Palette } from "lucide-react";

interface Props {
  title: string;
  progress: number;
  icon: string;
}

export default function CourseCard({
  title,
  progress,
  icon,
}: Props) {
  const getIcon = () => {
    switch (icon) {
      case "book":
        return <BookOpen className="text-blue-400 mb-4" />;

      case "code":
        return <Code className="text-green-400 mb-4" />;

      case "palette":
        return <Palette className="text-pink-400 mb-4" />;

      default:
        return <BookOpen />;
    }
  };

  return (
    <motion.article
      
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
  }}
      className="
      bg-gradient-to-br
      from-zinc-900
      to-zinc-800
      p-6
      rounded-3xl
      border
      border-zinc-800
      hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
      "
    >
      {getIcon()}

      <h2 className="font-bold text-2xl">
        {title}
      </h2>

      <div className="w-full bg-zinc-700 h-3 rounded-full mt-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
          className="bg-blue-500 h-3 rounded-full"
        />
      </div>

      <p className="mt-3 text-xl">
        {progress}%
      </p>
    </motion.article>
  );
}