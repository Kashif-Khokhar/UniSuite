import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";

export interface TranscriptRow {
  courseCode: string;
  courseName: string;
  creditHours: number;
  midterm: number;
  final: number | null;
  sessional: number;
  total: number | null;
  gradeLetter: string | null;
  gpa: number;
  detained?: boolean;
}

export default function TranscriptTable({ rows }: { rows: TranscriptRow[] }) {
  if (rows.length === 0) {
    return <EmptyState message="No graded results available yet." />;
  }
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <Th>Course</Th>
          <Th>Credit Hrs</Th>
          <Th>Midterm</Th>
          <Th>Final</Th>
          <Th>Sessional</Th>
          <Th>Total</Th>
          <Th>Grade</Th>
          <Th>GPA</Th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((r) => (
          <tr key={r.courseCode} className={r.detained ? "bg-rose-50/40 hover:bg-rose-50" : "hover:bg-slate-50"}>
            <Td className="font-medium text-slate-900">
              {r.courseCode} · {r.courseName}
            </Td>
            <Td>{r.creditHours}</Td>
            <Td>{r.midterm}</Td>
            <Td>{r.detained ? "—" : r.final}</Td>
            <Td>{r.sessional}</Td>
            <Td className="font-medium">{r.detained ? "—" : r.total}</Td>
            <Td>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  r.detained
                    ? "bg-rose-100 text-rose-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {r.gradeLetter}
              </span>
            </Td>
            <Td>{r.detained ? "—" : r.gpa.toFixed(1)}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
