"use client";

import { useEffect, useState } from "react";

interface Session {
  courseCode: string;
  courseName: string;
  instructor: string;
  time: string;
  room: string;
}

interface DayEntry {
  day: string;
  sessions: Session[];
}

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOUR_HEIGHT = 80;
const START_HOUR = 8;

export default function TeacherTimetablePage() {
  const [timetable, setTimetable] = useState<DayEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/timetable", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setTimetable(json.timetable))
      .finally(() => setLoading(false));
  }, []);

  const getEventStyle = (timeStr: string) => {
    try {
      const [start, end] = timeStr.split(" - ");
      const [startH, startM] = start.split(":").map(Number);
      const [endH, endM] = end.split(":").map(Number);

      const startDecimal = startH + startM / 60;
      const endDecimal = endH + endM / 60;

      const top = (startDecimal - START_HOUR) * HOUR_HEIGHT;
      const height = (endDecimal - startDecimal) * HOUR_HEIGHT;

      return { top: `${top}px`, height: `${height}px` };
    } catch (e) {
      return { top: 0, height: 0, display: "none" };
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full font-sans bg-white border border-slate-200 rounded-sm">
      <div className="flex items-center gap-24 p-4 lg:p-6 text-sm text-slate-800 font-medium border-b border-slate-100">
        <div>Term : SPRING 2026</div>
        <div>Month : July</div>
      </div>

      {loading && <div className="p-8 text-center text-slate-500">Loading schedule...</div>}

      {!loading && timetable && (
        <div className="overflow-x-auto flex-1">
          <div className="min-w-[750px] w-full flex pb-8 pr-8">
            {/* Hours Column */}
            <div className="w-[80px] shrink-0 bg-white z-20">
              <div className="h-[60px] border-b border-slate-100"></div>
              <div className="relative">
                {HOURS.map((h, i) => (
                  <div
                    key={h}
                    className="absolute w-full text-center text-[11px] text-slate-500 font-medium"
                    style={{ top: i * HOUR_HEIGHT - 8 }}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Columns */}
            <div className="flex-1 flex bg-white relative">
              {/* Horizontal grid lines */}
              <div className="absolute left-0 right-0 top-[60px] bottom-0 pointer-events-none z-0">
                {HOURS.map((h, i) => (
                  <div
                    key={h}
                    className="absolute w-full border-t border-slate-100"
                    style={{ top: i * HOUR_HEIGHT }}
                  ></div>
                ))}
              </div>

              {/* Days */}
              {DAYS.map((dayName, dayIndex) => {
                const dayData = timetable.find((d) => d.day === dayName);
                return (
                  <div
                    key={dayName}
                    className={`flex-1 border-slate-100 relative z-10 flex flex-col ${
                      dayIndex !== DAYS.length - 1 ? "border-r" : ""
                    }`}
                  >
                    <div className="h-[60px] border-b border-slate-100 flex items-center justify-center text-[12px] text-slate-700 bg-white">
                      {dayName}
                    </div>
                    <div
                      className="relative w-full"
                      style={{ height: (HOURS.length - 1) * HOUR_HEIGHT }}
                    >
                      {dayData?.sessions.map((session, idx) => (
                        <div
                          key={idx}
                          className="absolute left-[1px] right-[1px] border-t-2 border-emerald-700 bg-emerald-600 text-white overflow-hidden flex flex-col p-3 transition-opacity hover:opacity-95 rounded-[2px]"
                          style={getEventStyle(session.time)}
                        >
                          <div className="font-semibold text-[10px] opacity-90 mb-1">
                            {session.time}
                          </div>
                          <div className="font-bold text-[11px] xl:text-[12px] leading-tight mb-1">
                            {session.courseName}
                          </div>
                          <div className="font-medium text-[10px] xl:text-[11px] opacity-90 leading-tight">
                            {session.courseCode}
                          </div>
                          <div className="font-bold text-[10px] xl:text-[11px] mt-1">
                            {session.room}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
