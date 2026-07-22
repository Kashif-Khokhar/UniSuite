"use client";

import { useTransition } from "react";
import { deleteCourse } from "../actions";
import EditCourseModal from "./EditCourseModal";
import { Course } from "@prisma/client";

export default function CourseActionButtons({ course }: { course: Course }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-4 flex gap-2">
      <EditCourseModal course={course} />
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm("Are you sure you want to delete this course?")) {
            startTransition(() => {
              deleteCourse(course.id);
            });
          }
        }}
        className="flex-1 rounded-md border border-rose-200 bg-rose-50 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
