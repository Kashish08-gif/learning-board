"use client";

import { useState, useTransition } from "react";
import { useEffect } from "react";
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
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href));
  }, [router]);

  const activePendingHref = pendingHref !== pathname ? pendingHref : null;
  const visiblePathname = activePendingHref ?? pathname;

  const getActive = () => {
    const match = navItems.find((item) => item.href === visiblePathname);
    return match ? match.id : "dashboard";
  };

  const navigateTo = (href: string) => {
    if (href === pathname) return;
    setPendingHref(href);
    startTransition(() => router.push(href));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative hidden h-screen flex-shrink-0 flex-col overflow-hidden border-r border-white/[0.08] bg-[#080707]/95 py-6 shadow-[16px_0_60px_rgba(0,0,0,0.25)] backdrop-blur md:flex"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 mb-10">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 via-cyan-300 to-blue-500 shadow-[0_10px_30px_rgba(34,211,238,0.22)]"
          >
            <Zap size={14} className="text-white" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap text-base font-bold tracking-tight text-white"
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
                <motion.button
                  whileHover={{ x: collapsed ? 0 : 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigateTo(item.href)}
                  className="group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-pill"
                      className="absolute inset-0 rounded-2xl border border-pink-300/20 bg-white/[0.075] shadow-[0_12px_36px_rgba(244,114,182,0.10)]"
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
                        ? "text-cyan-300"
                        : "text-zinc-600 group-hover:text-pink-200"
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
                            : "text-zinc-500 group-hover:text-zinc-200"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </li>
            );
          })}
        </ul>

        {/* Collapse button */}
        <div className="px-3 mt-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-2 text-zinc-600 transition-colors hover:bg-white/[0.05] hover:text-zinc-300"
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
        <AnimatePresence>
          {(isPending || activePendingHref) && (
            <motion.span
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 h-full w-px origin-top bg-gradient-to-b from-pink-300 via-cyan-300 to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/[0.08] bg-[#080707]/90 px-3 py-3 shadow-[0_-16px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden">
        {navItems.map((item) => {
          const isActive = getActive() === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigateTo(item.href)}
              className="relative flex min-w-14 flex-col items-center gap-1"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-pill"
                  className="absolute -inset-2 rounded-2xl border border-pink-300/15 bg-white/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={20}
                className={`relative z-10 transition-colors ${isActive ? "text-cyan-300" : "text-zinc-600"}`}
              />
              <span
                className={`relative z-10 text-[10px] transition-colors ${isActive ? "text-white" : "text-zinc-600"}`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
        <AnimatePresence>
          {(isPending || activePendingHref) && (
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-pink-300 via-cyan-300 to-blue-400"
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
