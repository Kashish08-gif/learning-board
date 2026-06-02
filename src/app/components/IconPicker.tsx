"use client";

import { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search } from "lucide-react";

// List of 20 common course-related Lucide React icons
export const COURSE_ICONS = [
  "BookOpen",
  "Code",
  "Palette",
  "Database",
  "Cpu",
  "Globe",
  "LineChart",
  "Music",
  "Calculator",
  "Terminal",
  "Atom",
  "Server",
  "Flame",
  "FolderOpen",
  "Workflow",
  "Brain",
  "Compass",
  "Briefcase",
  "Award",
  "Monitor",
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function IconPicker({ value, onChange, disabled = false }: IconPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get active icon component, fallback to BookOpen if not found
  const SelectedIcon = useMemo(() => {
    const iconName = value || "BookOpen";
    // Check if the icon exists in Lucide
    if (iconName in LucideIcons) {
      return LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
    }
    return LucideIcons.BookOpen;
  }, [value]);

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    return COURSE_ICONS.filter((icon) =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-3.5">
      {/* Search and Preview Row */}
      <div className="flex gap-3">
        {/* Preview Panel */}
        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 shrink-0">
          <SelectedIcon size={24} />
        </div>

        {/* Icon Search Input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={disabled}
            className="w-full pl-9 pr-4 py-2.5 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Grid of Icons */}
      <div className="max-h-[148px] overflow-y-auto p-1 bg-white/[0.02] border border-white/[0.05] rounded-xl scrollbar-thin scrollbar-thumb-white/[0.08]">
        {filteredIcons.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 text-xs">
            No matching icons found.
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {filteredIcons.map((iconName) => {
              const IconComponent =
                (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon) ||
                LucideIcons.BookOpen;
              const isSelected = value === iconName;

              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => onChange(iconName)}
                  disabled={disabled}
                  title={iconName}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                      : "bg-transparent border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <IconComponent size={18} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
