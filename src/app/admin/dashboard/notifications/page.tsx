import { Construction } from "lucide-react";

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Notifications</h1>
        <p className="text-slate-500">This management section is currently under construction.</p>
      </div>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <Construction size={32} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">Coming Soon</h3>
        <p className="max-w-md text-sm text-slate-500">
          The administrative controls for Notifications will be available in a future update. 
          Please check back later.
        </p>
      </div>
    </div>
  );
}
