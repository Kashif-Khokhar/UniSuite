import { Check, AlertTriangle } from "lucide-react";

export default function AcademicWarningsCard({ count }: { count: number }) {
  const isClear = count === 0;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 px-5 py-4 shadow-sm">
      <p className="text-sm font-semibold text-amber-800">Academic Warnings</p>
      <span
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-white ${
          isClear ? "bg-emerald-500" : "bg-rose-500"
        }`}
      >
        {isClear ? <Check size={14} /> : <AlertTriangle size={14} />}
        {count}
      </span>
    </div>
  );
}
