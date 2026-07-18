import Link from "next/link";
import { BarChart3, Printer, Wallet, CalendarCheck2 } from "lucide-react";
import AccentCard from "./AccentCard";
import { getAvatarUrl } from "@/lib/avatar";

interface Props {
  studentName: string;
  rollNumber: string;
  program: string;
  faculty: string;
  currentTerm: string;
  batch: string;
  cgpa: number;
  sgpa: number;
  passCredits: number;
  fGrades: number;
}

// Icons mirror the ones used for these same destinations in the sidebar nav,
// so the same page is always represented by the same icon across the app.
const ACTION_LINKS = [
  { label: "Result Classes", href: "/dashboard/results", icon: BarChart3 },
  { label: "Exam Slip", href: "/dashboard/exam-slip", icon: Printer },
  { label: "Invoices", href: "/dashboard/finance", icon: Wallet },
  { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck2 },
];

export default function ProfileSummaryCard({
  studentName,
  rollNumber,
  program,
  faculty,
  currentTerm,
  batch,
  cgpa,
  sgpa,
  passCredits,
  fGrades,
}: Props) {
  const stats = [
    { label: "CGPA", value: cgpa.toFixed(2), color: "text-purple-700" },
    { label: "SGPA", value: sgpa.toFixed(2), color: "text-blue-600" },
    { label: "Pass Credits", value: String(passCredits), color: "text-emerald-600" },
    { label: "F Grades", value: String(fGrades), color: "text-rose-600" },
  ];

  return (
    <AccentCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photo, not worth Image config */}
          <img
            src={getAvatarUrl(rollNumber)}
            alt={studentName}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-slate-900">{studentName}</p>
            <p className="text-sm text-slate-500">{rollNumber}</p>
            <p className="text-sm text-slate-400">
              {program} | {faculty}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {ACTION_LINKS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300"
              >
                <Icon size={16} />
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5 border-t border-slate-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <div>
            <p className="text-xs text-slate-400">Roll Number</p>
            <p className="text-sm font-medium text-slate-900">{rollNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Current Term</p>
            <p className="text-sm font-medium text-slate-900">{currentTerm}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Batch</p>
            <p className="text-sm font-medium text-slate-900">{batch}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-violet-50 px-5 py-3 text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:shadow-violet-200/60 sm:min-w-[110px]"
            >
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AccentCard>
  );
}
