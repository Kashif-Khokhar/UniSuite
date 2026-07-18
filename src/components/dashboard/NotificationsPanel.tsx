"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/notifications";

const TABS = ["Notifications", "Alerts"] as const;
type Tab = (typeof TABS)[number];

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Notifications");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        title="Notifications"
        className="relative flex items-center text-white"
      >
        <Bell size={20} />
        {NOTIFICATIONS.length > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold leading-none text-white">
            {NOTIFICATIONS.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-3 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex border-b border-slate-100 px-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-brand-600 text-brand-700"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="sidebar-scroll max-h-80 overflow-y-auto">
              {activeTab === "Notifications" ? (
                <div className="flex flex-col divide-y divide-slate-100">
                  {NOTIFICATIONS.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div key={n.title} className="flex items-start gap-3 px-4 py-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brand-700">{n.title}</p>
                          <p className="text-xs text-slate-400">{n.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                  <BellOff size={22} className="text-slate-300" />
                  <p className="text-sm text-slate-500">No new alerts.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
