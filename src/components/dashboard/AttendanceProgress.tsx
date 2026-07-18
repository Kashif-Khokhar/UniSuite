import { AlertTriangle } from "lucide-react";
import AccentCard from "./AccentCard";

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  percentage: number;
  detained?: boolean;
}

export default function AttendanceProgress({ courses }: { courses: CourseAttendance[] }) {
  return (
    <AccentCard title="Attendance">
      {courses.length === 0 ? (
        <p className="text-sm text-slate-500">No attendance records yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((c) => {
            const barColor = c.percentage >= 75 ? "bg-emerald-500" : "bg-rose-500";
            return (
              <div key={c.courseCode}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-700">{c.courseName}</span>
                  <div className="flex items-center gap-2">
                    {c.detained && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600">
                        <AlertTriangle size={12} /> Drop Required
                      </span>
                    )}
                    <span className="font-medium text-slate-900">{c.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all`}
                    style={{ width: `${Math.min(100, c.percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AccentCard>
  );
}
