import Link from "next/link";

export interface ActiveResultCourse {
  id: string;
  courseCode: string;
  courseName: string;
  creditHours: number;
  termLabel: string;
}

export default function ResultActiveCourseCard({ item }: { item: ActiveResultCourse }) {
  return (
    <Link
      href={`/dashboard/results/${item.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative bg-gradient-to-br from-brand-700 to-brand-600 p-4">
        <p className="text-base font-semibold leading-snug text-white">{item.courseName}</p>
        <p className="mt-1 text-xs text-white/80">{item.courseCode}</p>

        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-slate-900/90 px-4 py-1.5 text-xs font-medium text-white">
            Open class
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <span className="text-sm text-slate-600">Credits: {item.creditHours.toFixed(1)}</span>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="whitespace-nowrap rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            Class in progress
          </span>
          <span className="whitespace-nowrap rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-600">
            {item.termLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
