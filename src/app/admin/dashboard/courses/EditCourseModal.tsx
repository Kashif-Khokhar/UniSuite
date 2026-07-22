"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { updateCourse } from "../actions";
import { Course } from "@prisma/client";

export default function EditCourseModal({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await updateCourse(course.id, formData);

    setLoading(false);
    if (res.success) {
      setIsOpen(false);
    } else {
      setError(res.error || "Something went wrong");
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 rounded-md border border-slate-200 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
      >
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Course">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Course Name</label>
            <input
              name="name"
              type="text"
              defaultValue={course.name}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Credit Hours</label>
            <input
              name="creditHours"
              type="number"
              min="1"
              max="6"
              defaultValue={course.creditHours}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Instructor Name</label>
            <input
              name="instructor"
              type="text"
              defaultValue={course.instructor}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="rounded bg-amber-50 p-3 text-xs text-amber-700">
            For data integrity, the Course Code ({course.code}) cannot be changed here.
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
