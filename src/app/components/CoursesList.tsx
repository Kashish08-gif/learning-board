"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import CourseModal, { CourseFormData } from "./CourseModal";
import CourseCard from "./CourseCard";
import ConfirmDialog from "./ConfirmDialog";
import { createCourse, updateCourse, deleteCourse } from "../courses/actions";
import type { Course } from "@/types";

interface CoursesListProps {
  initialCourses: Course[];
}

/**
 * CoursesList component - Main client-side orchestrator for courses page
 * 
 * Task 7.1: Create CoursesList component with state management
 * - Manages local state for courses, search query, and modal visibility
 * - Tracks modal mode (create/edit) and selected course
 * - Tracks delete dialog state and course to delete
 * - Coordinates between CourseCard, CourseModal, and ConfirmDialog components
 * 
 * Requirements: 1.3, 2.1, 3.1, 4.1
 */
export default function CoursesList({ initialCourses }: CoursesListProps) {
  const router = useRouter();

  // Local state for courses (for optimistic updates)
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Error state for displaying operation failures
  const [error, setError] = useState<string | null>(null);

  // Filter courses by search query (case-insensitive)
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    courses.forEach((course) => router.prefetch(`/courses/${course.id}`));
  }, [courses, router]);

  // Handle create button click
  const handleCreateClick = () => {
    setModalMode("create");
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  // Handle edit button click from CourseCard
  const handleEditClick = (course: Course) => {
    setModalMode("edit");
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Handle delete button click from CourseCard
  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteDialogOpen(true);
  };

  // Handle view button click from CourseCard
  const handleViewClick = (course: Course) => {
    router.push(`/courses/${course.id}`);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Handle delete dialog cancel
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  /**
   * Handles modal form submission with optimistic UI updates.
   * 
   * Task 7.4: Implement optimistic UI updates
   * - In create mode: immediately shows new course before server confirmation
   * - In edit mode: immediately updates course display before server confirmation
   * - Implements rollback mechanism for failed operations
   * - Displays error messages when operations fail after optimistic update
   * 
   * Requirements: 10.1, 10.2, 10.3, 10.4
   */
  const handleModalSubmit = async (data: CourseFormData) => {
    // Clear any previous errors
    setError(null);

    if (modalMode === "create") {
      // Optimistic create: immediately show new course before server confirmation
      const optimisticCourse: Course = {
        id: `temp-${Date.now()}`, // Temporary ID
        title: data.title,
        icon_name: data.icon_name,
        progress: data.progress,
        created_at: new Date().toISOString(),
      };

      // Save previous state for rollback
      const previousCourses = [...courses];

      // Optimistically add the course to the UI
      setCourses([optimisticCourse, ...courses]);

      try {
        // Call server action
        const createdCourse = await createCourse(data);
        
        // Replace optimistic course with real course from server
        setCourses((current) =>
          current.map((c) => (c.id === optimisticCourse.id ? createdCourse : c))
        );
      } catch (err) {
        // Rollback on failure
        setCourses(previousCourses);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to create course. Please try again."
        );
        throw err; // Re-throw so CourseModal can handle it
      }
    } else if (modalMode === "edit" && selectedCourse) {
      // Optimistic update: immediately update course display before server confirmation
      const previousCourses = [...courses];

      // Optimistically update the course in the UI
      setCourses((current) =>
        current.map((c) =>
          c.id === selectedCourse.id
            ? { ...c, ...data }
            : c
        )
      );

      try {
        // Call server action
        const updatedCourse = await updateCourse(selectedCourse.id, data);
        
        // Replace optimistic update with real data from server
        setCourses((current) =>
          current.map((c) => (c.id === selectedCourse.id ? updatedCourse : c))
        );
      } catch (err) {
        // Rollback on failure
        setCourses(previousCourses);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update course. Please try again."
        );
        throw err; // Re-throw so CourseModal can handle it
      }
    }
    // Modal will close on successful submission (handled by CourseModal's onClose callback)
  };

  /**
   * Handles course deletion with optimistic UI updates
   * 
   * Task 7.4: Implement optimistic UI updates
   * - Immediately removes course with exit animation before server confirmation
   * - Implements rollback mechanism for failed operations
   * - Displays error messages when operations fail after optimistic update
   * 
   * Requirements: 10.3, 10.4
   */
  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    // Clear any previous errors
    setError(null);

    // Save previous state for rollback
    const previousCourses = [...courses];

    // Optimistic delete: immediately remove course from UI
    setCourses((current) => current.filter((c) => c.id !== courseToDelete.id));

    // Close dialog immediately for better UX
    setIsDeleteDialogOpen(false);
    const deletedCourse = courseToDelete;
    setCourseToDelete(null);

    try {
      // Call server action
      await deleteCourse(deletedCourse.id);
    } catch (err) {
      // Rollback on failure
      setCourses(previousCourses);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete course. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-100/50">
          Library
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Courses
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Keep your learning list tidy and a little lovely.
        </p>
      </motion.div>

      {/* Header with search and add button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.055] py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 transition-all focus:border-pink-200/35 focus:outline-none focus:ring-2 focus:ring-pink-300/20"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateClick}
          className="flex items-center justify-center gap-2 rounded-2xl border border-pink-100/30 bg-white px-4 py-3 text-sm font-bold text-[#171317] shadow-[0_16px_44px_rgba(244,114,182,0.22)] transition-colors hover:bg-pink-50 sm:min-w-36"
        >
          <Plus size={18} className="text-pink-500" />
          <span>Add Course</span>
        </motion.button>
      </div>

      {/* Error message display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl border border-red-400/20 bg-red-500/10 p-4 text-red-300"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="shrink-0 text-red-400 hover:text-red-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Courses grid or empty state */}
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.025] py-20">
          <div className="text-center">
            <p className="mb-2 text-lg text-zinc-300">
              {searchQuery ? "No courses found" : "No courses yet"}
            </p>
            <p className="text-sm text-zinc-500">
              {searchQuery
                ? "Try adjusting your search query"
                : "Get started by adding your first course"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onView={handleViewClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* CourseModal for create/edit */}
      <CourseModal
        isOpen={isModalOpen}
        mode={modalMode}
        course={selectedCourse || undefined}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {/* ConfirmDialog for delete confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Course"
        message={`Are you sure you want to delete "${courseToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
