"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Lock, Check, X } from "lucide-react";
import { getTodayMakeupClasses } from "./actions";

interface TodayClass {
  id: string;
  term: string;
  date: string;
  fromTime: string;
  toTime: string;
  course: {
    code: string;
    name: string;
  }
}

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"today" | "previous">("today");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);

  useEffect(() => {
    getTodayMakeupClasses().then(setTodayClasses).catch(console.error);
  }, []);

  const terms = [
    "SPRING 2026",
    "FALL 2025",
    "SPRING 2025",
    "FALL 2024"
  ];

  const mockAttendanceList = [
    { sr: "1.)", date: "10 - May - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "2.)", date: "03 - May - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "3.)", date: "26 - Apr - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "4.)", date: "19 - Apr - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "5.)", date: "12 - Apr - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "6.)", date: "05 - Apr - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "7.)", date: "29 - Mar - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true },
    { sr: "8.)", date: "22 - Mar - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: false },
    { sr: "9.)", date: "15 - Mar - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: false },
    { sr: "10.)", date: "08 - Mar - 2026", day: "Sunday", from: "11:40", to: "14:20", marked: true }
  ];

  return (
    <div className="flex flex-col w-full text-[#4a4a4a]">
      <h1 className="text-[24px] mb-6">Attendance Management</h1>

      <div className="bg-white border border-slate-200/60 shadow-sm w-full flex flex-col min-h-[250px]">
        {/* Tabs */}
        <div className="px-10 pt-8 border-b border-slate-100 flex gap-6">
          <button 
            onClick={() => setActiveTab("today")}
            className={`pb-3 text-[13px] font-medium uppercase tracking-wide relative ${
              activeTab === "today" 
                ? "text-emerald-600 after:absolute after:-bottom-[1px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500" 
                : "text-emerald-600"
            }`}
          >
            Today Classes
          </button>
          <button 
            onClick={() => setActiveTab("previous")}
            className={`pb-3 text-[13px] font-medium uppercase tracking-wide relative ${
              activeTab === "previous" 
                ? "text-red-500 after:absolute after:-bottom-[1px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500" 
                : "text-red-500"
            }`}
          >
            Previous Classes
          </button>
        </div>

        {/* Content */}
        <div className="p-10 pt-8">
          {activeTab === "today" ? (
            <div className="w-full">
              {todayClasses.length === 0 ? (
                <div className="text-[14px] text-slate-700">
                  <p>No class is scheduled for today.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] whitespace-nowrap">
                    <thead className="text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-2">Sr no.</th>
                        <th className="py-3 px-2">Course</th>
                        <th className="py-3 px-2">Term</th>
                        <th className="py-3 px-2">From</th>
                        <th className="py-3 px-2">To</th>
                        <th className="py-3 px-2">Class Type</th>
                        <th className="py-3 px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {todayClasses.map((row, index) => (
                        <tr key={row.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-2 font-medium">{index + 1}.)</td>
                          <td className="py-3.5 px-2">
                            <span className="font-semibold text-slate-700">{row.course.code}</span> - {row.course.name}
                          </td>
                          <td className="py-3.5 px-2">{row.term}</td>
                          <td className="py-3.5 px-2">{row.fromTime}</td>
                          <td className="py-3.5 px-2">{row.toTime}</td>
                          <td className="py-3.5 px-2">
                            <span className="bg-[#ff9800] text-white text-[11px] px-2 py-0.5 rounded-sm leading-none flex items-center w-fit h-[20px]">Makeup</span>
                          </td>
                          <td className="py-3.5 px-2">
                            <Link href={`/teacher/dashboard/attendance/roster/${row.id}`} className="text-brand-600 font-semibold hover:text-brand-700 hover:underline transition-colors">
                              Open Roster
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full">
              <div className="text-[14px] font-medium text-slate-700 pb-2 border-b-2 border-slate-300">
                Term
              </div>
              <div className="flex flex-col">
                {terms.map((term, i) => {
                  const isExpanded = expandedTerm === term;
                  return (
                    <div key={i} className="flex flex-col border-b border-slate-100">
                      <button 
                        onClick={() => setExpandedTerm(isExpanded ? null : term)}
                        className="flex items-center gap-2 py-3.5 text-[#3b82f6] hover:text-blue-600 text-[14px] hover:bg-slate-50 transition-colors text-left w-full"
                      >
                        {isExpanded ? (
                          <ChevronDown size={18} className="text-slate-500" />
                        ) : (
                          <ChevronRight size={18} className="text-slate-500" />
                        )}
                        {term}
                      </button>
                      
                      {isExpanded && (
                        <div className="pb-6 pt-2 animate-in slide-in-from-top-2 fade-in duration-200">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h3 className="text-[14px] font-bold text-slate-700">
                              Introduction to Financial Technology Code: ( CMS601380-S26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-5J-lecture )
                            </h3>
                            <button className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 text-xs font-semibold rounded-full shadow-sm transition-colors whitespace-nowrap">
                              DOWNLOAD ATTENDANCE
                            </button>
                          </div>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-[13px] whitespace-nowrap">
                              <thead className="text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                  <th className="py-3 px-2">Sr no.</th>
                                  <th className="py-3 px-2">Class Date</th>
                                  <th className="py-3 px-2">From</th>
                                  <th className="py-3 px-2">To</th>
                                  <th className="py-3 px-2">Class Type</th>
                                  <th className="py-3 px-2">State</th>
                                  <th className="py-3 px-2">Marked</th>
                                  <th className="py-3 px-2">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-600">
                                {mockAttendanceList.map((row, index) => (
                                  <tr key={index} className="hover:bg-slate-50">
                                    <td className="py-3.5 px-2 font-medium">{row.sr}</td>
                                    <td className="py-3.5 px-2">
                                      <div className="flex items-center gap-2">
                                        <span>{row.date}</span>
                                        <span className="bg-[#009688] text-white text-[11px] px-1.5 py-0.5 rounded-sm leading-none flex items-center h-[20px]">{row.day}</span>
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-2">{row.from}</td>
                                    <td className="py-3.5 px-2">{row.to}</td>
                                    <td className="py-3.5 px-2">
                                      <span className="bg-[#7cb342] text-white text-[11px] px-2 py-0.5 rounded-sm leading-none flex items-center w-fit h-[20px]">Regular</span>
                                    </td>
                                    <td className="py-3.5 px-2">
                                      <Lock size={15} className="text-[#ff9800]" />
                                    </td>
                                    <td className="py-3.5 px-2">
                                      {row.marked ? (
                                        <Check size={18} className="text-[#4caf50]" />
                                      ) : (
                                        <X size={18} className="text-[#ff9800]" />
                                      )}
                                    </td>
                                    <td className="py-3.5 px-2">
                                      <button className="text-brand-600 font-semibold hover:text-brand-700 hover:underline transition-colors">Open Roster</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
