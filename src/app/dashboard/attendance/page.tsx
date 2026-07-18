"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import AttendanceClassCard, { AttendanceClassSummary } from "@/components/academics/AttendanceClassCard";

export default function AttendancePage() {
  const [classes, setClasses] = useState<AttendanceClassSummary[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/academics", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        const rows: AttendanceClassSummary[] = (json.attendance ?? []).map(
          (a: { id: string; courseCode: string; courseName: string; percentage: number; termLabel: string }) => ({
            id: a.id,
            courseCode: a.courseCode,
            courseName: a.courseName,
            percentage: a.percentage,
            termLabel: a.termLabel,
          })
        );
        setClasses(rows);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Attendance" description="Delivered lectures, attended lectures, and percentage per course." />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex gap-6 border-b border-slate-200">
          <span className="-mb-px border-b-2 border-brand-600 pb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
            Active Classes
          </span>
        </div>

        {loading && <div className="text-sm text-slate-500">Loading attendance records...</div>}
        {!loading && !classes && (
          <div className="text-sm text-red-500">Failed to load attendance records.</div>
        )}
        {!loading && classes && classes.length === 0 && (
          <EmptyState message="No attendance records found." />
        )}

        {!loading && classes && classes.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map((c) => (
              <AttendanceClassCard key={c.id} item={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
