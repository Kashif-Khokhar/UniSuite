"use client";

import { useEffect, useState } from "react";
import { Printer, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { formatCurrency, formatDate } from "@/lib/format";

interface Challan {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  billingMonth: string;
}

interface FinanceData {
  challans: Challan[];
  totalPaid: number;
  totalUnpaid: number;
}

export default function FinancePage() {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/finance", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Finance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Review your fee challans and payment status.
        </p>
      </div>

      {loading && <div className="text-sm text-slate-500">Loading fee records...</div>}
      {!loading && !data && (
        <div className="text-sm text-red-500">Failed to load fee records.</div>
      )}

      {!loading && data && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              label="Total Paid"
              value={formatCurrency(data.totalPaid)}
              icon={CheckCircle2}
              tone="emerald"
            />
            <StatCard
              label="Outstanding Balance"
              value={formatCurrency(data.totalUnpaid)}
              icon={Wallet}
              tone="rose"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {data.challans.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No fee challans found.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Billing Month</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Due Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.challans.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-900">{c.billingMonth}</td>
                      <td className="px-5 py-3 text-slate-600">{formatCurrency(c.amount)}</td>
                      <td className="px-5 py-3 text-slate-600">{formatDate(c.dueDate)}</td>
                      <td className="px-5 py-3">
                        {c.status === "Paid" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            <CheckCircle2 size={12} /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                            <AlertCircle size={12} /> Unpaid
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <Printer size={14} /> Challan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
