"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { updateTeacher } from "../actions";
import { useToast } from "@/components/ui/ToastProvider";
import { Teacher } from "@prisma/client";

export default function EditTeacherModal({ teacher }: { teacher: Teacher }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await updateTeacher(teacher.id, formData);

    setLoading(false);
    if (res.success) {
      setIsOpen(false);
      showToast("Teacher updated successfully.");
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Teacher">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <input
              name="name"
              type="text"
              defaultValue={teacher.name}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="rounded bg-amber-50 p-3 text-xs text-amber-700 space-y-1">
            <p>For data integrity, the following fields cannot be changed here:</p>
            <ul className="list-disc pl-4">
              <li>Employee ID: {teacher.employeeId}</li>
              <li>Email: {teacher.email}</li>
            </ul>
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
