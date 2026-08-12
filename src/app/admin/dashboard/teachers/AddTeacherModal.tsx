"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { createTeacher } from "../actions";
import { useToast } from "@/components/ui/ToastProvider";

export default function AddTeacherModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await createTeacher(formData);

    setLoading(false);
    if (res.success) {
      setIsOpen(false);
      showToast("Teacher added successfully.");
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
        Add Teacher
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Teacher">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Dr. Sarah Jenkins"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Employee ID</label>
            <input
              name="employeeId"
              type="text"
              required
              placeholder="e.g. FAC-24-089"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. s.jenkins@unisuite.edu"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
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
              Save Teacher
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
