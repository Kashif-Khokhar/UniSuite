import Link from "next/link";

export interface AttendanceClassSummary {
  id: string;
  courseCode: string;
  courseName: string;
  termLabel: string;
  percentage: number;
}

export default function AttendanceClassCard({ item }: { item: AttendanceClassSummary }) {
  const healthy = item.percentage >= 75;

  return (
    <Link
      href={`/dashboard/attendance/${item.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative bg-gradient-to-br from-brand-700 to-brand-600 p-4">
        <span className="absolute right-3 top-3 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {item.termLabel}
        </span>
        <p className="pr-16 text-base font-semibold leading-snug text-white">{item.courseName}</p>
        <p className="mt-1 text-xs text-white/80">{item.courseCode}</p>

        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-slate-900/90 px-4 py-1.5 text-xs font-medium text-white">
            Open class
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-slate-600">Attendance: {item.percentage.toFixed(1)}%</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${healthy ? "bg-emerald-500" : "bg-rose-500"}`}
            style={{ width: `${Math.min(100, item.percentage)}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
