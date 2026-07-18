"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  User,
  BookOpen,
  CalendarCheck2,
  Clock,
  Wallet,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { REQUEST_TYPES } from "@/lib/request-types";

interface LaunchItem {
  label: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

function SixBoxesIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="1" y="2" width="6" height="9" rx="1" />
      <rect x="9" y="2" width="6" height="9" rx="1" />
      <rect x="17" y="2" width="6" height="9" rx="1" />
      <rect x="1" y="13" width="6" height="9" rx="1" />
      <rect x="9" y="13" width="6" height="9" rx="1" />
      <rect x="17" y="13" width="6" height="9" rx="1" />
    </svg>
  );
}

const LAUNCH_ITEMS: LaunchItem[] = [
  { label: "Notifications", href: "/dashboard/notifications", icon: MessageSquare, color: "bg-teal-500" },
  { label: "User Profile", href: "/dashboard/profile", icon: User, color: "bg-orange-500" },
  { label: "Enrolled Courses", href: "/dashboard/academics", icon: BookOpen, color: "bg-blue-500" },
  { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck2, color: "bg-red-500" },
  { label: "Class Schedules", href: "/dashboard/timetable", icon: Clock, color: "bg-sky-500" },
  { label: "Invoices", href: "/dashboard/finance", icon: Wallet, color: "bg-violet-500" },
  { label: "Results", href: "/dashboard/results", icon: BarChart3, color: "bg-purple-500" },
];

export default function QuickLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        title="Quick launcher"
        className="flex items-center text-white"
      >
        <SixBoxesIcon size={22} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-3 flex w-[min(92vw,640px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:flex-row">
            <div className="grid flex-1 grid-cols-3 gap-1 p-5">
              {LAUNCH_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-colors hover:bg-slate-50"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${item.color}`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-medium text-slate-700">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="shrink-0 border-t border-slate-100 p-5 md:w-48 md:border-l md:border-t-0">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Requests</p>
              <div className="flex flex-col gap-2.5">
                {REQUEST_TYPES.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/dashboard/requests/${r.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
