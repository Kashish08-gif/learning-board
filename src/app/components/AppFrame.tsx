"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#070607] text-white">
      <Sidebar />

      <main className="relative h-screen flex-1 overflow-y-auto bg-[linear-gradient(135deg,rgba(244,114,182,0.08)_0%,transparent_24%,rgba(34,211,238,0.07)_64%,transparent_100%)] px-4 py-5 pb-24 sm:px-5 md:p-6">
        <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:30px_30px]" />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12, scale: 0.995, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.998, filter: "blur(4px)" }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
