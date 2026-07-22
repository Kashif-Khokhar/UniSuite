"use client";

import { useState } from "react";
import { 
  Globe, BookOpen, Users, LayoutDashboard, Search, FileText, 
  Calendar, Star, Award, BarChart3, CreditCard, CalendarCheck, Clock,
  ChevronDown, ArrowRight, Bell, GraduationCap, User
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip 
} from "recharts";

export default function TeacherDashboardPage() {
  const [term, setTerm] = useState("SPRING 2026");

  // Mock Data from Screenshots
  const surveyData = [{ name: "Score", value: 90.02 }, { name: "Remaining", value: 9.98 }];
  const COLORS = ["#10b981", "#e2e8f0"];

  const gradeData = [
    { name: "A", percentage: 40.0, count: 418, fill: "#22c55e" },
    { name: "A-", percentage: 25.6, count: 267, fill: "#22c55e" },
    { name: "B+", percentage: 22.0, count: 230, fill: "#86efac" },
    { name: "B", percentage: 4.6, count: 48, fill: "#86efac" },
    { name: "B-", percentage: 3.6, count: 38, fill: "#86efac" },
    { name: "C+", percentage: 0.8, count: 8, fill: "#fbbf24" },
    { name: "C", percentage: 0.5, count: 5, fill: "#fbbf24" },
    { name: "C-", percentage: 0.5, count: 5, fill: "#fbbf24" },
    { name: "D+", percentage: 0.5, count: 5, fill: "#f97316" },
    { name: "F", percentage: 1.9, count: 20, fill: "#ef4444" },
  ];

  const attendanceData = [
    { name: "16/05", hours: 8, date: "16/05/2026", in: "03:00", out: "11:00" },
    { name: "15/05", hours: 8, date: "15/05/2026", in: "03:00", out: "11:00" },
    { name: "09/05", hours: 8, date: "09/05/2026", in: "03:00", out: "11:00" },
    { name: "08/05", hours: 8, date: "08/05/2026", in: "03:00", out: "11:00" },
    { name: "02/05", hours: 8, date: "02/05/2026", in: "03:00", out: "11:00" },
    { name: "25/04", hours: 8, date: "25/04/2026", in: "03:00", out: "11:00" },
    { name: "24/04", hours: 8, date: "24/04/2026", in: "03:00", out: "11:00" },
  ];

  const leaveTypesData = [
    { name: "Global holiday", days: 10, fill: "#0d9488" },
    { name: "Global holiday", days: 5, fill: "#14b8a6" },
    { name: "Global holiday", days: 1, fill: "#5eead4" },
  ];

  const notifications = [
    { name: "Zeeshan Mehmood-100391", date: "2026-07-21 08:45:48" },
    { name: "Farah Taj-42463", date: "2026-07-21 08:45:31" },
    { name: "Syeda Mehreen Fatima-42894", date: "2026-07-21 08:45:25", active: true },
    { name: "Ayesha Hussain Ara-41995", date: "2026-07-21 08:45:17" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Profile Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 to-teal-600 text-white shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Profile Info */}
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/20 bg-brand-500 text-3xl font-medium text-white shadow-xl">
                S
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Syed Ahsan Raza Shah-42228</h1>
                <p className="mt-1 text-sm font-medium text-white/90">Faculty Position</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    Department of Computer Sciences
                  </span>
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    LMP-42228
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-teal-200/30 bg-teal-100/20 px-3 py-1 text-xs font-medium text-teal-50 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
              {[
                { label: "CLASSES", value: "0" },
                { label: "STUDENTS", value: "0" },
                { label: "WORKLOAD", value: "0" },
                { label: "PASS RATE", value: "98.1%" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/10">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="mt-1 text-[10px] font-semibold tracking-wider text-white/70">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Details Row */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Email</p>
              <p className="mt-1 font-medium">ahsan.shah@superior.edu.pk</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Mobile</p>
              <p className="mt-1 font-medium">3039369405</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Nationality</p>
              <p className="mt-1 font-medium">Pakistan</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Institute</p>
              <p className="mt-1 font-medium">N/A</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Joining Date</p>
              <p className="mt-1 font-medium">2026-01-05</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Quick Access</h2>
            <p className="text-sm text-slate-500">Navigate to key sections</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors">
              <FileText size={14} /> Grade Assignment
            </button>
            <button className="flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-600 transition-colors">
              <BookOpen size={14} /> Assessment
            </button>
            <button className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-600 transition-colors">
              <Users size={14} /> Attendance
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 mt-6">
          <button className="group flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 group-hover:scale-110 transition-transform"><Globe size={20} /></div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-brand-700">Website</p>
              <p className="text-[10px] text-slate-400">View portal</p>
            </div>
          </button>
          <button className="group flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform"><GraduationCap size={20} /></div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-brand-700">LMS</p>
              <p className="text-[10px] text-slate-400">Learning system</p>
            </div>
          </button>
          <button className="group flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform"><User size={20} /></div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-brand-700">ESS Portal</p>
              <p className="text-[10px] text-slate-400">Employee services</p>
            </div>
          </button>
          <button className="group flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform"><LayoutDashboard size={20} /></div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-brand-700">PMS</p>
              <p className="text-[10px] text-slate-400">Dashboard</p>
            </div>
          </button>
          <button className="group flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform"><Award size={20} /></div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-brand-700">SIRC</p>
              <p className="text-[10px] text-slate-400">Research</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Workload & Classes Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Workload */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Calendar size={20} /></div>
                  <div>
                    <h3 className="font-bold text-slate-800">Workload Details</h3>
                    <p className="text-[10px] text-slate-500">Active classes and schedules</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">0</p>
                  <p className="text-[10px] font-bold text-slate-500">Classes</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-600">Terms :</label>
                <div className="relative mt-1">
                  <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-brand-500">
                    <option>SPRING 2026</option>
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                <BookOpen size={24} className="mb-2 opacity-50" />
                <p className="text-sm font-semibold text-slate-600">No Active Classes</p>
                <p className="text-xs">No workload details available</p>
              </div>
            </div>

            {/* Today's Classes */}
            <div className="rounded-2xl border-2 border-brand-500 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white"><CalendarCheck size={16} /></div>
                  <h3 className="font-bold text-slate-800">Today's Classes</h3>
                </div>
                <span className="text-xs text-slate-500">0 classes today</span>
              </div>
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                <span className="mb-2 text-2xl">☕</span>
                <p className="text-sm font-semibold text-slate-600">No classes today</p>
                <p className="text-xs">Enjoy your day off! 🎉</p>
              </div>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white"><BarChart3 size={16} /></div>
                <h3 className="font-bold text-slate-800">Grade Distribution</h3>
              </div>
              <span className="text-xs text-slate-500">1044 Students</span>
            </div>
            
            <div className="space-y-3">
              {gradeData.map((grade) => (
                <div key={grade.name} className="flex items-center gap-3">
                  <span className="w-6 text-sm font-bold text-slate-700">{grade.name}</span>
                  <div className="relative h-6 flex-1 rounded-full bg-slate-100">
                    <div 
                      className="absolute inset-y-0 left-0 flex items-center justify-end rounded-full px-2" 
                      style={{ width: `${Math.max(grade.percentage, 5)}%`, backgroundColor: grade.fill }}
                    >
                      {grade.percentage > 5 && <span className="text-[10px] font-bold text-white">{grade.percentage}%</span>}
                    </div>
                  </div>
                  <span className="w-8 text-right text-sm font-medium text-blue-500">{grade.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-4 border-t border-slate-100 pt-4 text-center">
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Total</p><p className="text-lg font-bold text-slate-800">1044</p></div>
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Passed (A-D)</p><p className="text-lg font-bold text-emerald-500">1024</p></div>
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Failed (F)</p><p className="text-lg font-bold text-red-500">20</p></div>
              <div><p className="text-[10px] font-bold uppercase text-slate-400">Pass Rate</p><p className="text-lg font-bold text-emerald-500">98.1%</p></div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Survey Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white"><Star size={16} /></div>
              <div>
                <h3 className="font-bold text-slate-800">Survey / Feedback Score</h3>
                <p className="text-[10px] text-slate-500">Student Evaluation Analytics</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">🏆 Outstanding Performance</div>
              <div className="relative mt-6 h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={surveyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                      {surveyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-500">90.02%</span>
                  <span className="text-[10px] font-semibold text-slate-400">SCORE</span>
                </div>
              </div>

              <div className="mt-6 w-full space-y-3">
                <div className="rounded-xl border border-slate-100 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Respondents</p>
                  <p className="text-xl font-bold text-brand-600">291</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3 text-center">
                  <p className="text-sm font-bold text-slate-600">SPRING 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Advising */}
          <div className="rounded-2xl border-l-4 border-l-brand-600 border-y border-r border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white"><Star size={16} /></div>
                <h3 className="font-bold uppercase text-slate-800">Batch Advising</h3>
              </div>
              <span className="text-[10px] text-slate-400">Last updated: Today</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-2xl font-medium text-white shadow-md">S</div>
              <div>
                <p className="text-2xl font-bold text-brand-600">0</p>
                <p className="text-xs font-semibold text-slate-500">Advisee Students</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
                <span>Student Satisfaction</span>
                <span className="text-emerald-500">90.02%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '90.02%' }}></div>
              </div>
              <p className="mt-1 text-right text-[10px] font-bold text-emerald-600">⭐ Excellent</p>
            </div>
          </div>

        </div>
      </div>

      {/* Attendance Analytics */}
      <div className="mt-6 rounded-2xl border-l-4 border-emerald-500 border-y border-r border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-emerald-500"></div>
            <h3 className="font-bold text-slate-800">Attendance Analytics</h3>
          </div>
          <span className="text-xs font-medium text-slate-400">7 Records</span>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-600">
            <p className="text-[10px] font-bold uppercase tracking-widest">Total Days</p>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-600">
            <p className="text-[10px] font-bold uppercase tracking-widest">Total Hours</p>
            <p className="text-2xl font-bold">56.1</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 p-4 text-red-500">
            <p className="text-[10px] font-bold uppercase tracking-widest">Late Check-ins</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-brand-100 bg-brand-50 p-4 text-brand-600">
            <p className="text-[10px] font-bold uppercase tracking-widest">Overtime</p>
            <p className="text-2xl font-bold">0.0</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-emerald-500 text-xs font-bold uppercase text-white">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Check In/Out</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">{row.date}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs text-white">S</div>
                    Syed Ahsan Raza Shah-42228
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-emerald-600">▼ {row.in}</span>
                      <span className="text-slate-300">→</span>
                      <span className="flex items-center gap-1 rounded bg-red-50 px-2 py-1 text-red-500">▲ {row.out}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center rounded bg-emerald-100 p-1 text-emerald-500">✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications Row */}
      <div className="mt-8">
        <h3 className="mb-4 font-bold text-slate-800">Notifications</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {notifications.map((notif, i) => (
            <div key={i} className={`flex w-72 shrink-0 flex-col overflow-hidden rounded-xl border ${notif.active ? 'border-brand-500 shadow-md' : 'border-slate-200 bg-white'}`}>
              <div className={`flex h-24 items-center justify-center ${notif.active ? 'bg-brand-500' : 'bg-slate-100'}`}>
                <Bell size={32} className={notif.active ? 'text-white' : 'text-slate-300'} />
              </div>
              <div className="p-4">
                <p className={`text-xs font-bold ${notif.active ? 'text-slate-800' : 'text-slate-400'}`}>Attendance of {notif.name} is Requested</p>
                <p className="mt-2 text-[10px] text-slate-400">{notif.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
