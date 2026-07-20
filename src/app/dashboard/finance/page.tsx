"use client";

import { Printer } from "lucide-react";

const INVOICES = [
  { no: "UNIGC/2026/04/08007", date: "2026-04-24", due: "2026-05-06", term: "FALL 2026", semester: "", receipt: "Misc. Fee Tuition Fee", barcode: "1525172", amount: "0.0", status: "paid" },
  { no: "UNIGC/2026/04/01982", date: "2026-04-10", due: "2026-04-20", term: "SPRING 2026", semester: "", receipt: "Student Fund Collection", barcode: "1499553", amount: "0.0", status: "paid" },
  { no: "UNIGC/2026/01/32361", date: "2026-01-21", due: "2026-03-20", term: "SPRING 2026", semester: "", receipt: "Entrepreneurship Fee - CMACED", barcode: "1411583", amount: "0.0", status: "paid" },
  { no: "UNIGC/2025/12/74878", date: "2025-12-04", due: "2025-12-12", term: "FALL 2025", semester: "", receipt: "Student Fund Collection", barcode: "1295339", amount: "0.0", status: "paid" },
  { no: "UNIGC/2025/11/24957", date: "2025-11-25", due: "2026-03-06", term: "SPRING 2026", semester: "", receipt: "Misc. Fee Tuition Fee", barcode: "1267993", amount: "0.0", status: "paid" },
  { no: "UNIGC/2025/11/23811", date: "2025-11-25", due: "2025-12-05", term: "SPRING 2026", semester: "", receipt: "Misc. Fee Tuition Fee", barcode: "1266240", amount: "0.0", status: "paid" },
  { no: "UNIGC/2025/04/55777", date: "2025-04-25", due: "2025-09-05", term: "FALL 2025", semester: "", receipt: "Misc. Fee Tuition Fee", barcode: "983587", amount: "0.0", status: "paid" },
  { no: "UNIGC/2025/04/54130", date: "2025-04-23", due: "2025-05-05", term: "FALL 2025", semester: "", receipt: "Misc. Fee Tuition Fee", barcode: "975669", amount: "0.0", status: "paid" },
  { no: "UNIGC/2025/01/87243", date: "2025-01-27", due: "2025-01-31", term: "SPRING 2025", semester: "", receipt: "Student Fund Collection", barcode: "859071", amount: "0.0", status: "paid" },
  { no: "UNIGC/2024/11/80854", date: "2024-11-14", due: "2025-03-07", term: "SPRING 2025", semester: "", receipt: "Misc. Fee Tuition Fee", barcode: "751796", amount: "0.0", status: "paid" }
];

export default function FinancePage() {
  return (
    <div className="flex flex-col w-full text-[#4a4a4a]">
      <h1 className="text-[24px] mb-6">Invoices</h1>

      <div className="bg-white border border-slate-200/60 shadow-sm w-full flex flex-col">
        <div className="px-5 py-4">
          <h2 className="text-[17px] text-slate-700">Invoices List</h2>
        </div>
        
        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full text-left text-[13.5px] whitespace-nowrap">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="py-2.5 px-4 font-medium">Invoice No</th>
                <th className="py-2.5 px-4 font-medium">Invoice Date</th>
                <th className="py-2.5 px-4 font-medium">Due Date</th>
                <th className="py-2.5 px-4 font-medium">Term</th>
                <th className="py-2.5 px-4 font-medium">Semester</th>
                <th className="py-2.5 px-4 font-medium">Receipt For</th>
                <th className="py-2.5 px-4 font-medium">Barcode</th>
                <th className="py-2.5 px-4 font-medium">Total Amount</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium">Print/Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {INVOICES.map((inv, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">{inv.no}</td>
                  <td className="py-3.5 px-4">{inv.date}</td>
                  <td className="py-3.5 px-4">{inv.due}</td>
                  <td className="py-3.5 px-4">{inv.term}</td>
                  <td className="py-3.5 px-4">{inv.semester}</td>
                  <td className="py-3.5 px-4">{inv.receipt}</td>
                  <td className="py-3.5 px-4">{inv.barcode}</td>
                  <td className="py-3.5 px-4">{inv.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#7cb342] text-white text-[11px] px-2 py-0.5 rounded-[3px]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {/* Placeholder for Print/Save action if needed later */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
