import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface DetainedCourse {
  courseCode: string;
  courseName: string;
  percentage: number;
}

export default function DetainedWarningBanner({ courses }: { courses: DetainedCourse[] }) {
  if (courses.length === 0) return null;

  return (
    <div className="rounded-2xl border border-rose-200 border-l-4 border-l-rose-600 bg-rose-50 p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-rose-900">
              Attendance Shortage — {courses.length} Course{courses.length > 1 ? "s" : ""} Below 75%
            </p>
            <p className="mt-1 text-sm text-rose-700">
              You are not eligible to sit the final exam for:{" "}
              {courses.map((c, i) => (
                <span key={c.courseCode} className="font-medium">
                  {c.courseCode} ({c.percentage}%)
                  {i < courses.length - 1 ? ", " : ""}
                </span>
              ))}
              . These courses must be dropped.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/requests/course-drop"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-rose-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-rose-700"
        >
          Request Course Drop <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
