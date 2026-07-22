"use client";

import { useTransition } from "react";
import { deleteStudent } from "../actions";
import EditStudentModal from "./EditStudentModal";
import { Student } from "@prisma/client";

export default function StudentActionButtons({ student }: { student: Student }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-3">
      <EditStudentModal student={student} />
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm("Are you sure you want to delete this student?")) {
            startTransition(() => {
              deleteStudent(student.id);
            });
          }
        }}
        className="text-rose-600 hover:underline disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
