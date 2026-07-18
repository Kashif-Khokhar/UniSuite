import PageHeader from "@/components/shared/PageHeader";
import AccentCard from "@/components/dashboard/AccentCard";
import { NOTIFICATIONS } from "@/lib/notifications";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Notifications" description="Recent announcements from your university." />

      <div className="flex flex-col gap-3">
        {NOTIFICATIONS.map((n) => {
          const Icon = n.icon;
          return (
            <AccentCard key={n.title}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p className="text-sm font-medium text-slate-900">{n.title}</p>
                    <p className="text-xs text-slate-400">{n.date}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                </div>
              </div>
            </AccentCard>
          );
        })}
      </div>
    </div>
  );
}
