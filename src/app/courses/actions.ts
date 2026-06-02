"use server";

import { supabase, retryOperation } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import type { Course } from "@/types";

/**
 * Create a new course in the database with retry mechanism for transient failures
 * @param data - Course data without id and created_at
 * @returns The created course or throws an error
 */
export async function createCourse(
  data: Omit<Course, "id" | "created_at">
): Promise<Course> {
  // Validate and trim title
  const trimmedTitle = data.title.trim();
  
  if (trimmedTitle.length === 0) {
    throw new Error("Course title cannot be empty");
  }

  // Use retry mechanism for transient connection failures
  const course = await retryOperation(async () => {
    const { data: course, error } = await supabase
      .from("courses")
      .insert([
        {
          title: trimmedTitle,
          icon_name: data.icon_name || "BookOpen",
          progress: data.progress,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create course: ${error.message}`);
    }

    return course;
  });

  revalidatePath("/courses");
  return course;
}

/**
 * Update an existing course in the database with retry mechanism for transient failures
 * @param id - Course ID to update
 * @param updates - Partial course data to update
 * @returns The updated course or throws an error
 */
export async function updateCourse(
  id: string,
  updates: Partial<Omit<Course, "id" | "created_at">>
): Promise<Course> {
  // Build update object with trimmed title if provided
  const updateData: Record<string, unknown> = {};

  if (updates.title !== undefined) {
    const trimmedTitle = updates.title.trim();
    if (trimmedTitle.length === 0) {
      throw new Error("Course title cannot be empty");
    }
    updateData.title = trimmedTitle;
  }

  if (updates.icon_name !== undefined) {
    updateData.icon_name = updates.icon_name || "BookOpen";
  }

  if (updates.progress !== undefined) {
    updateData.progress = updates.progress;
  }

  // Use retry mechanism for transient connection failures
  const course = await retryOperation(async () => {
    const { data: course, error } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update course: ${error.message}`);
    }

    return course;
  });

  revalidatePath("/courses");
  return course;
}

/**
 * Delete a course from the database with retry mechanism for transient failures
 * @param id - Course ID to delete
 * @throws Error if deletion fails
 */
export async function deleteCourse(id: string): Promise<void> {
  // Use retry mechanism for transient connection failures
  await retryOperation(async () => {
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  });

  revalidatePath("/courses");
}
