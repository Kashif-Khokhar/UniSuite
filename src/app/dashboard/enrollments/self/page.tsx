"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";

interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  instructor: string;
}

export default function SelfEnrollmentPage() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/enrollments/available", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setCourses(json.courses))
      .finally(() => setLoading(false));
  }, []);

  function handleEnroll(courseId: string) {
    // Mock only — no backend persistence yet.
    setEnrolledIds((prev) => new Set(prev).add(courseId));
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Self Enrollment"
        description="Browse and enroll in elective courses open for the upcoming term."
      />

      {loading && <div className="text-sm text-slate-500">Loading available courses...</div>}
      {!loading && !courses && (
        <div className="text-sm text-red-500">Failed to load available courses.</div>
      )}

      {!loading && courses && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {courses.length === 0 ? (
            <EmptyState message="No elective courses are currently open for self enrollment." />
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <Th>Course Code</Th>
                  <Th>Course Name</Th>
                  <Th>Credit Hours</Th>
                  <Th>Instructor</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => {
                  const isEnrolled = enrolledIds.has(c.id);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <Td className="font-medium text-slate-900">{c.code}</Td>
                      <Td>{c.name}</Td>
                      <Td>{c.creditHours}</Td>
                      <Td>{c.instructor}</Td>
                      <Td>
                        {isEnrolled ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            <CheckCircle2 size={12} /> Enrolled
                          </span>
                        ) : (
                          <button
                            onClick={() => handleEnroll(c.id)}
                            className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700"
                          >
                            Enroll
                          </button>
                        )}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      <p className="text-xs text-slate-400">
        Note: this is a demo action and does not persist to your enrollment record.
      </p>
    </div>
  );
}
