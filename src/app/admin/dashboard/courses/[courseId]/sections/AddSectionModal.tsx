"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { createSection } from "../../../actions";

interface AddSectionModalProps {
  courseId: string;
  teachers: { id: string; name: string; employeeId: string }[];
}

export default function AddSectionModal({ courseId, teachers }: AddSectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await createSection(courseId, formData);

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
        className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        <Plus size={18} />
        Add Section
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Section">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Section Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. BSCS-6A"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Assign Teacher</label>
            <select
              name="teacherId"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-white"
            >
              <option value="">Select a teacher...</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.employeeId})
                </option>
              ))}
            </select>
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
              Save Section
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
