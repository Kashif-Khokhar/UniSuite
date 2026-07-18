import AccentCard from "./AccentCard";
import { formatCurrency, formatDate } from "@/lib/format";

interface UpcomingFee {
  billingMonth: string;
  amount: number;
  dueDate: string;
}

export default function UpcomingFeeCard({ fee }: { fee: UpcomingFee | null }) {
  return (
    <AccentCard title="Upcoming Fee">
      {fee ? (
        <div className="flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3.5">
          <div>
            <p className="text-sm font-medium text-slate-900">{fee.billingMonth}</p>
            <p className="text-xs text-slate-500">Due {formatDate(fee.dueDate)}</p>
          </div>
          <p className="text-base font-semibold text-rose-700">{formatCurrency(fee.amount)}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl bg-slate-100 px-4 py-6">
          <p className="text-sm font-medium text-slate-600">No Pending Dues</p>
        </div>
      )}
    </AccentCard>
  );
}
