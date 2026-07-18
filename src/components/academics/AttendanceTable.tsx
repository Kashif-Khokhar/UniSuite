import { AlertTriangle } from "lucide-react";
import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";

export interface AttendanceRow {
  courseCode: string;
  courseName: string;
  delivered: number;
  attended: number;
  absents: number;
  leaves: number;
  percentage: number;
  detained?: boolean;
}

export default function AttendanceTable({ rows }: { rows: AttendanceRow[] }) {
  if (rows.length === 0) {
    return <EmptyState message="No attendance records found." />;
  }
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <Th>Course</Th>
          <Th>Delivered</Th>
          <Th>Attended</Th>
          <Th>Absent</Th>
          <Th>Leave</Th>
          <Th>Percentage</Th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((r) => (
          <tr key={r.courseCode} className={r.detained ? "bg-rose-50/40 hover:bg-rose-50" : "hover:bg-slate-50"}>
            <Td className="font-medium text-slate-900">
              {r.courseCode} · {r.courseName}
            </Td>
            <Td>{r.delivered}</Td>
            <Td>{r.attended}</Td>
            <Td>{r.absents}</Td>
            <Td>{r.leaves}</Td>
            <Td>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.percentage >= 75
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {r.percentage}%
                </span>
                {r.detained && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600">
                    <AlertTriangle size={12} /> Drop Required
                  </span>
                )}
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
