"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Printer } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Th, Td } from "@/components/shared/Table";

interface AttendanceRecord {
  sr: number;
  date: string;
  status: string;
}

interface AttendanceDetail {
  courseCode: string;
  courseName: string;
  delivered: number;
  attended: number;
  percentage: number;
  records: AttendanceRecord[];
}

const STATUS_STYLE: Record<string, string> = {
  P: "font-semibold text-emerald-600",
  A: "font-semibold text-rose-600",
  L: "font-semibold text-amber-600",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm">
      <span className="font-semibold text-slate-900">{label}: </span>
      <span className="text-slate-700">{value}</span>
    </p>
  );
}

export default function AttendanceClassDetailPage() {
  const params = useParams<{ enrollmentId: string }>();
  const [data, setData] = useState<AttendanceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/academics/attendance/${params.enrollmentId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setData(json.records ? json : null))
      .finally(() => setLoading(false));
  }, [params.enrollmentId]);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading attendance...</div>;
  }

  if (!data) {
    return <div className="text-sm text-red-500">Failed to load class attendance.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Attendance" description={`${data.courseName} — full lecture-wise attendance log.`} />
        <button
          onClick={() => window.print()}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <Printer size={16} /> Print Attendance
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-6 flex gap-6 border-b border-slate-200">
          <span className="-mb-px border-b-2 border-brand-600 pb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
            Lecture
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Stat label="Course" value={data.courseName} />
            <Stat label="Course Code" value={data.courseCode} />
          </div>
          <div className="flex flex-col gap-3">
            <Stat label="Number of Classes Conducted" value={String(data.delivered)} />
            <Stat label="Number of Classes Attended" value={String(data.attended)} />
          </div>
          <div>
            <Stat label="Attendance Percentage" value={`${data.percentage}%`} />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-700 text-xs uppercase tracking-wide text-white">
              <tr>
                <Th className="text-white">Sr. No</Th>
                <Th className="text-white">Date</Th>
                <Th className="text-white">Status</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.records.map((r) => (
                <tr key={r.sr} className="hover:bg-slate-50">
                  <Td>{r.sr}</Td>
                  <Td>{r.date.slice(0, 10)}</Td>
                  <Td className={STATUS_STYLE[r.status] ?? "font-medium text-slate-700"}>{r.status}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
