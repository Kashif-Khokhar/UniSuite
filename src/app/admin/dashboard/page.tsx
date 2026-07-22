import { prisma } from "@/lib/prisma";
import { Users, BookOpen, UserCheck, Banknote, ArrowRight, UserPlus, BookPlus, Wallet } from "lucide-react";
import Link from "next/link";
import DashboardCharts from "./DashboardCharts";

export default async function AdminDashboardPage() {
  const studentCount = await prisma.student.count();
  const courseCount = await prisma.course.count();
  const enrollmentCount = await prisma.enrollment.count();

  // Aggregate paid and unpaid fees
  const unpaidChallans = await prisma.feeChallan.aggregate({
    where: { status: "Unpaid" },
    _sum: { amount: true },
  });
  const paidChallans = await prisma.feeChallan.aggregate({
    where: { status: "Paid" },
    _sum: { amount: true },
  });

  const unpaidAmount = unpaidChallans._sum.amount || 0;
  const paidAmount = paidChallans._sum.amount || 0;

  const feeData = [
    { name: "Paid", value: paidAmount || 50000 }, // Mock fallback if 0 to show chart
    { name: "Unpaid", value: unpaidAmount || 20000 },
  ];

  // Group students by program
  const studentsByProgram = await prisma.student.groupBy({
    by: ["program"],
    _count: true,
  });

  const programData = studentsByProgram.map((item) => ({
    program: item.program,
    count: item._count,
  }));

  // Fetch recent 5 students
  const recentStudents = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{greeting}, Admin! 👋</h1>
          <p className="mt-1 text-slate-500">Here's what's happening across the university today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/students"
            className="group flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-600 transition-all hover:bg-brand-100"
          >
            <UserPlus size={18} />
            Add Student
          </Link>
          <Link
            href="/admin/dashboard/courses"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:from-brand-500 hover:to-teal-500 hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            <BookPlus size={18} />
            Add Course
          </Link>
        </div>
      </div>

      {/* Premium Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50 transition-transform group-hover:scale-150" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
              <Users size={28} className="stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Students</p>
              <p className="text-3xl font-bold text-slate-800 tracking-tight">{studentCount}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-50 transition-transform group-hover:scale-150" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
              <BookOpen size={28} className="stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Courses</p>
              <p className="text-3xl font-bold text-slate-800 tracking-tight">{courseCount}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-50 transition-transform group-hover:scale-150" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-700 text-white shadow-lg shadow-brand-500/30">
              <UserCheck size={28} className="stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Enrollments</p>
              <p className="text-3xl font-bold text-slate-800 tracking-tight">{enrollmentCount}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-50 transition-transform group-hover:scale-150" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-red-500 text-white shadow-lg shadow-rose-500/30">
              <Banknote size={28} className="stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Unpaid Fees</p>
              <p className="text-3xl font-bold text-slate-800 tracking-tight">
                <span className="text-xl">Rs.</span> {unpaidAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Charts Layer */}
      <DashboardCharts feeData={feeData} programData={programData.length ? programData : [{ program: "BSCS", count: studentCount }]} />

      {/* Bottom Section: Recent Registrations & Quick Links */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Recent Students Panel */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h3 className="text-lg font-semibold text-slate-800">Recent Registrations</h3>
            <Link href="/admin/dashboard/students" className="group flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-semibold">Student Name</th>
                  <th className="px-6 py-3 font-semibold">Roll Number</th>
                  <th className="px-6 py-3 font-semibold">Program</th>
                  <th className="px-6 py-3 font-semibold text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentStudents.map((student) => (
                  <tr key={student.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">{student.rollNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                        {student.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentStudents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No students registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-slate-100 px-6 py-5">
            <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
          </div>
          <div className="flex-1 p-4 grid grid-cols-1 gap-3">
            <Link href="/admin/dashboard/students" className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-md hover:shadow-brand-500/5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm transition-transform group-hover:scale-110">
                  <UserPlus size={20} />
                </div>
                <div className="font-medium text-slate-700 group-hover:text-brand-700">Manage Students</div>
              </div>
              <ArrowRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
            </Link>
            
            <Link href="/admin/dashboard/courses" className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md hover:shadow-emerald-500/5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                  <BookPlus size={20} />
                </div>
                <div className="font-medium text-slate-700 group-hover:text-emerald-700">Course Catalog</div>
              </div>
              <ArrowRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
            </Link>

            <Link href="/admin/dashboard/finance" className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-rose-200 hover:bg-rose-50 hover:shadow-md hover:shadow-rose-500/5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-rose-600 shadow-sm transition-transform group-hover:scale-110">
                  <Wallet size={20} />
                </div>
                <div className="font-medium text-slate-700 group-hover:text-rose-700">Fee & Finance</div>
              </div>
              <ArrowRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-rose-600" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
