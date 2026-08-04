"use client";

import { useTransition } from "react";
import { deleteTeacher } from "../actions";
import EditTeacherModal from "./EditTeacherModal";
import { Teacher } from "@prisma/client";

export default function TeacherActionButtons({ teacher }: { teacher: Teacher }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-4 flex gap-2">
      <EditTeacherModal teacher={teacher} />
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm("Are you sure you want to delete this teacher?")) {
            startTransition(() => {
              deleteTeacher(teacher.id);
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
