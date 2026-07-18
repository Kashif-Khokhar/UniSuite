import { LucideIcon, Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
}: {
  icon?: LucideIcon;
  title?: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon size={22} />
      </div>
      {title && <p className="text-sm font-medium text-slate-700">{title}</p>}
      <p className="max-w-sm text-sm text-slate-500">{message}</p>
    </div>
  );
}
