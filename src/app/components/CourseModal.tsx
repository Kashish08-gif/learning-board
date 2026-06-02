"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Course } from "@/types";
import IconPicker from "./IconPicker";

interface CourseModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  course?: Course;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => Promise<void>;
}

export interface CourseFormData {
  title: string;
  icon_name: string;
  progress: number;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const blankFormData: CourseFormData = {
  title: "",
  icon_name: "BookOpen",
  progress: 0,
};

const getInitialFormData = (
  mode: CourseModalProps["mode"],
  course?: Course,
): CourseFormData =>
  mode === "edit" && course
    ? {
        title: course.title,
        icon_name: course.icon_name,
        progress: course.progress,
      }
    : blankFormData;

export default function CourseModal(props: CourseModalProps) {
  const { isOpen, mode, course } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <CourseModalForm
          key={`${mode}-${course?.id ?? "new"}`}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

function CourseModalForm({
  mode,
  course,
  onClose,
  onSubmit,
}: Omit<CourseModalProps, "isOpen">) {
  const [formData, setFormData] = useState<CourseFormData>(() =>
    getInitialFormData(mode, course),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let isValid = true;

    setTitleError(null);
    setProgressError(null);

    if (!formData.title || formData.title.trim().length === 0) {
      setTitleError(
        formData.title ? "Course title cannot be empty" : "Course title is required",
      );
      isValid = false;
    }

    if (formData.progress < 0 || formData.progress > 100) {
      setProgressError("Progress must be between 0 and 100");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setTitleError(null);
    setProgressError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md rounded-2xl border border-white/[0.06] bg-[#0c0c0c] p-6 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {mode === "create" ? "Add New Course" : "Edit Course"}
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-zinc-400"
              >
                Course Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                disabled={isSubmitting}
                className={`w-full rounded-lg border bg-white/[0.05] px-4 py-2.5 text-white placeholder-zinc-600 transition-colors focus:bg-white/[0.08] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                  titleError
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/[0.08] focus:border-cyan-500/50"
                }`}
                placeholder="Enter course title"
                autoFocus
                aria-invalid={!!titleError}
                aria-describedby={titleError ? "title-error" : undefined}
              />
              {titleError && (
                <motion.p
                  id="title-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-400"
                  role="alert"
                >
                  {titleError}
                </motion.p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">
                Course Icon
              </label>
              <input
                id="icon_name"
                className="sr-only"
                value={formData.icon_name}
                onChange={(event) =>
                  setFormData({ ...formData, icon_name: event.target.value })
                }
                aria-label="Icon Name"
              />
              <IconPicker
                value={formData.icon_name}
                onChange={(iconName) =>
                  setFormData({ ...formData, icon_name: iconName })
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="progress"
                className="mb-2 block text-sm font-medium text-zinc-400"
              >
                Progress
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="progress"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      progress: parseInt(event.target.value),
                    })
                  }
                  disabled={isSubmitting}
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                  aria-invalid={!!progressError}
                  aria-describedby={progressError ? "progress-error" : undefined}
                />
                <span className="w-12 text-right text-sm font-semibold tabular-nums text-white">
                  {formData.progress}%
                </span>
              </div>
              {progressError && (
                <motion.p
                  id="progress-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-400"
                  role="alert"
                >
                  {progressError}
                </motion.p>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 font-medium text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-cyan-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving..."
                  : mode === "create"
                    ? "Create Course"
                    : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
