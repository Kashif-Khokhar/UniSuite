"use client";

import { useState } from "react";
import { Users, X } from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
}

interface Props {
  students: Student[];
  sectionName: string;
}

export default function ViewStudentsModal({ students, sectionName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
      >
        <Users size={16} />
        View Students
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl flex flex-col max-h-full">
        <div className="border-b border-slate-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Enrolled Students</h2>
            <p className="text-sm text-slate-500">Section {sectionName}</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {students.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No students are currently enrolled in this section.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {students.map((student, index) => (
                <div key={student.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.rollNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
