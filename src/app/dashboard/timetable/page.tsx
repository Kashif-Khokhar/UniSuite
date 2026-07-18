"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import AccentCard from "@/components/dashboard/AccentCard";
import EmptyState from "@/components/shared/EmptyState";

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

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<DayEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/timetable", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setTimetable(json.timetable))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Time Table" description="Your weekly class schedule." />

      {loading && <div className="text-sm text-slate-500">Loading time table...</div>}
      {!loading && !timetable && (
        <div className="text-sm text-red-500">Failed to load time table.</div>
      )}

      {!loading && timetable && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {timetable.map((d) => (
            <AccentCard key={d.day} title={d.day}>
              {d.sessions.length === 0 ? (
                <EmptyState message="No classes scheduled." />
              ) : (
                <div className="flex flex-col divide-y divide-slate-100">
                  {d.sessions.map((s, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-medium text-slate-900">
                        {s.courseCode} · {s.courseName}
                      </p>
                      <p className="text-xs text-slate-500">{s.instructor}</p>
                      <div className="mt-1.5 flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {s.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {s.room}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccentCard>
          ))}
        </div>
      )}
    </div>
  );
}
