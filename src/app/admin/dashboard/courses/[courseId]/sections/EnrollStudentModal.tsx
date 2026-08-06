"use client";

import { useState, useTransition, useActionState, useEffect } from "react";
import { Plus } from "lucide-react";
import { enrollStudentAction } from "../../../actions";

interface Props {
  sectionId: string;
}

export default function EnrollStudentModal({ sectionId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(enrollStudentAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-md bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100 transition-colors"
      >
        <Plus size={16} />
        Enroll Student
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl flex flex-col max-h-full">
        <div className="border-b border-slate-100 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Enroll Student</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <form 
          action={(formData) => {
            startTransition(() => {
              formAction(formData);
            });
          }} 
          className="p-6 flex flex-col gap-4 overflow-y-auto"
        >
          <input type="hidden" name="sectionId" value={sectionId} />

          {state?.error && (
            <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600 border border-rose-200">
              {state.error}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="rollNumber" className="text-sm font-medium text-slate-700">
              Student Roll Number
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              required
              placeholder="e.g. BSCS-12345"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="semester" className="text-sm font-medium text-slate-700">
              Semester
            </label>
            <input
              id="semester"
              name="semester"
              type="number"
              min="1"
              max="8"
              defaultValue="1"
              required
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {isPending ? "Enrolling..." : "Enroll Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
