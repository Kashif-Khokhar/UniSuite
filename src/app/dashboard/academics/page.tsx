"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CoursesTable, { Course } from "@/components/academics/CoursesTable";
import AttendanceTable, { AttendanceRow } from "@/components/academics/AttendanceTable";
import TranscriptTable, { TranscriptRow } from "@/components/academics/TranscriptTable";

interface AcademicsData {
  courses: Course[];
  attendance: AttendanceRow[];
  transcript: TranscriptRow[];
}

const TABS = ["Enrolled Courses", "Attendance", "Transcript"] as const;
type Tab = (typeof TABS)[number];

export default function AcademicsPage() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-500">Loading academic records...</div>}>
      <AcademicsPageContent />
    </Suspense>
  );
}

function AcademicsPageContent() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = TABS.includes(requestedTab as Tab) ? (requestedTab as Tab) : "Enrolled Courses";

  const [data, setData] = useState<AcademicsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    fetch("/api/academics", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Academics</h1>
        <p className="mt-1 text-sm text-slate-500">
          View your enrolled courses, attendance record, and transcript.
        </p>
      </div>

      <div className="flex gap-1 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <div className="text-sm text-slate-500">Loading academic records...</div>}

      {!loading && !data && (
        <div className="text-sm text-red-500">Failed to load academic records.</div>
      )}

      {!loading && data && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {activeTab === "Enrolled Courses" && <CoursesTable courses={data.courses} />}
          {activeTab === "Attendance" && <AttendanceTable rows={data.attendance} />}
          {activeTab === "Transcript" && <TranscriptTable rows={data.transcript} />}
        </div>
      )}
    </div>
  );
}
