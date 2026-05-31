"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", href: "/" },
  { icon: BookOpen, label: "Courses", id: "courses", href: "/courses" },
  { icon: Activity, label: "Activity", id: "activity", href: "/activity" },
  { icon: Settings, label: "Settings", id: "settings", href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getActive = () => {
    const match = navItems.find((item) => item.href === pathname);
    return match ? match.id : "dashboard";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative hidden md:flex flex-col h-screen bg-[#080808] border-r border-white/[0.06] py-6 overflow-hidden flex-shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-white font-bold text-base tracking-tight whitespace-nowrap"
              >
                Luminary
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <ul className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map((item) => {
            const isActive = getActive() === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => router.push(item.href)}
                  className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group"
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-pill"
                      className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <item.icon
                    size={17}
                    className={`relative z-10 flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-cyan-400"
                        : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`relative z-10 text-sm font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Collapse button */}
        <div className="px-3 mt-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-400 hover:bg-white/[0.04] transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <ChevronLeft size={15} />
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080808] border-t border-white/[0.06] flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const isActive = getActive() === item.id;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="relative flex flex-col items-center gap-1"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-pill"
                  className="absolute -inset-2 rounded-xl bg-white/[0.07]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={20}
                className={`relative z-10 ${isActive ? "text-cyan-400" : "text-zinc-600"}`}
              />
              <span
                className={`relative z-10 text-[10px] ${isActive ? "text-cyan-400" : "text-zinc-600"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
