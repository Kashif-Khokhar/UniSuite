"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import ProfileSummaryCard from "@/components/dashboard/ProfileSummaryCard";
import QuickAccessLinks from "@/components/dashboard/QuickAccessLinks";
import DetainedWarningBanner from "@/components/dashboard/DetainedWarningBanner";
import AccentCard from "@/components/dashboard/AccentCard";
import CgpaTrendChart from "@/components/dashboard/CgpaTrendChart";
import AttendanceProgress from "@/components/dashboard/AttendanceProgress";
import AcademicProgressRing from "@/components/dashboard/AcademicProgressRing";
import AdvisorCards from "@/components/dashboard/AdvisorCards";
import UpcomingFeeCard from "@/components/dashboard/UpcomingFeeCard";
import AcademicWarningsCard from "@/components/dashboard/AcademicWarningsCard";

interface ScheduleItem {
  day: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  time: string;
  room: string;
}

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  percentage: number;
  detained?: boolean;
}

interface TrendPoint {
  term: string;
  cgpa: number;
}

interface DashboardData {
  cgpa: number;
  totalCreditHours: number;
  attendancePercentage: number;
  outstandingBalance: number;
  todaySchedule: ScheduleItem[];
  studentName: string;
  program: string;
  faculty: string;
  rollNumber: string;
  currentTerm: string;
  batch: string;
  sgpa: number;
  passCredits: number;
  fGrades: number;
  courseAttendance: CourseAttendance[];
  detainedCourses: CourseAttendance[];
  cgpaTrend: TrendPoint[];
  creditProgress: { completed: number; total: number };
  upcomingFee: { billingMonth: string; amount: number; dueDate: string } | null;
  academicWarnings: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="text-sm text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <ProfileSummaryCard
        studentName={data.studentName}
        rollNumber={data.rollNumber}
        program={data.program}
        faculty={data.faculty}
        currentTerm={data.currentTerm}
        batch={data.batch}
        cgpa={data.cgpa}
        sgpa={data.sgpa}
        passCredits={data.passCredits}
        fGrades={data.fGrades}
      />

      <DetainedWarningBanner courses={data.detainedCourses} />

      <QuickAccessLinks />

      <AccentCard title="Today's Class Schedule">
        {data.todaySchedule.length === 0 ? (
          <p className="text-sm text-slate-500">No classes scheduled for today.</p>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100">
            {data.todaySchedule.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.courseCode} · {item.courseName}
                  </p>
                  <p className="text-xs text-slate-500">{item.instructor}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {item.room}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </AccentCard>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CgpaTrendChart data={data.cgpaTrend} />
        </div>
        <div className="flex flex-col gap-5">
          <UpcomingFeeCard fee={data.upcomingFee} />
          <AcademicWarningsCard count={data.academicWarnings} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceProgress courses={data.courseAttendance} />
        </div>
        <AcademicProgressRing
          completed={data.creditProgress.completed}
          total={data.creditProgress.total}
        />
      </div>

      <AdvisorCards />
    </div>
  );
}
