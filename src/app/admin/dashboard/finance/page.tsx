import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import MarkPaidButton from "./MarkPaidButton";

export default async function AdminFinancePage() {
  const challans = await prisma.feeChallan.findMany({
    include: { student: true },
    orderBy: { dueDate: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fee & Finance</h1>
          <p className="text-slate-500">Manage student fee challans and payments.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-brand-400 focus-within:ring-1 focus-within:ring-brand-400">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search by student name or roll number..."
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Student</th>
                <th className="px-6 py-4 font-semibold">Billing Month</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Due Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {challans.map((challan) => (
                <tr key={challan.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{challan.student.name}</div>
                    <div className="text-xs text-slate-500">{challan.student.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4">{challan.billingMonth}</td>
                  <td className="px-6 py-4">Rs. {challan.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{new Date(challan.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        challan.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {challan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {challan.status === "Unpaid" && (
                      <MarkPaidButton feeId={challan.id} />
                    )}
                  </td>
                </tr>
              ))}
              {challans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No fee challans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
