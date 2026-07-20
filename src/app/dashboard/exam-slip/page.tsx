"use client";

import { FileText, Download, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ExamSlipPage() {
  const [showAlert, setShowAlert] = useState(false);
  
  // Set this to true to allow download, or false to trigger the alert on click
  const isSlipAvailable = false;

  const handleDownload = () => {
    if (!isSlipAvailable) {
      setShowAlert(true);
      return;
    }
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-220px)] w-full">
      <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/40 p-8 w-full max-w-[420px] flex flex-col rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
            <FileText size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 font-serif">Exam Slip</h2>
        </div>
        
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Please download and print your exam slip. You must bring a physical copy to the examination hall.
        </p>
        
        <button 
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group"
        >
          <span className="font-medium text-[15px]">Download Exam Slip</span>
          <Download size={18} className="transition-transform group-hover:translate-y-0.5" />
        </button>

        {showAlert && (
          <div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3 text-rose-800 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={20} className="shrink-0 mt-0.5 text-rose-600" />
            <div className="text-sm leading-relaxed">
              <span className="font-semibold block mb-1">Slip Not Available</span>
              Your exam slip has not been generated yet or has been withheld. Please contact the <strong>Registrar Office</strong> for further assistance.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

