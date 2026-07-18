"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Printer, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/format";

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  detained: boolean;
}

const EXAM_ROOMS = ["Examination Hall A", "Examination Hall B", "Room 108", "Auditorium"];
const EXAM_TIMES = ["09:00 AM", "11:30 AM", "02:00 PM"];

export default function ExamSlipPage() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/academics", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setCourses(json.courses))
      .finally(() => setLoading(false));
  }, []);

  const examStart = new Date(2026, 8, 28);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Print Exam Slip"
        description="View your final examination schedule and print your admit slip per course."
      />

      {loading && <div className="text-sm text-slate-500">Loading exam schedule...</div>}
      {!loading && !courses && (
        <div className="text-sm text-red-500">Failed to load exam schedule.</div>
      )}

      {!loading && courses && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {courses.length === 0 ? (
            <EmptyState message="No exams scheduled." />
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <Th>Course</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Room</Th>
                  <Th className="text-right">Action</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c, idx) => (
                  <tr key={c.id} className={c.detained ? "bg-rose-50/40 hover:bg-rose-50" : "hover:bg-slate-50"}>
                    <Td className="font-medium text-slate-900">
                      {c.code} · {c.name}
                    </Td>
                    <Td>
                      {c.detained ? "—" : formatDate(new Date(examStart.getTime() + idx * 2 * 86400000))}
                    </Td>
                    <Td>{c.detained ? "—" : EXAM_TIMES[idx % EXAM_TIMES.length]}</Td>
                    <Td>{c.detained ? "—" : EXAM_ROOMS[idx % EXAM_ROOMS.length]}</Td>
                    <Td className="text-right">
                      {c.detained ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700">
                          <AlertTriangle size={14} /> Not Eligible
                        </span>
                      ) : (
                        <button
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <Printer size={14} /> Print Slip
                        </button>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {!loading && courses && courses.some((c) => c.detained) && (
        <p className="text-xs text-slate-400">
          Courses marked <span className="font-medium text-rose-600">Not Eligible</span> have
          attendance below 75% and are barred from the final exam. Submit a{" "}
          <Link href="/dashboard/requests/course-drop" className="font-medium text-brand-600 underline">
            Course Drop request
          </Link>{" "}
          for these courses.
        </p>
      )}
    </div>
  );
}
