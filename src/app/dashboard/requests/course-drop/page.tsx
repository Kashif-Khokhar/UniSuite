"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const COURSES = [
  "CAL601120-F26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-6C - Theory of Automata Credits: 3.0",
  "CBA604110-F26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-6C - Final Year Project - I Credits: 3.0",
  "COS609110-F26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-6C - Parallel & Distributed Computing Credits: 3.0",
  "CAI601310-F26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-6C - Deep Learning Credits: 3.0",
  "COS601170-F26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-6C - Cloud Computing Credits: 3.0",
  "CCC601410-F26-PB-GCL-BSCSM-FALL 2023-2027-BSCS-F23-6C - Civics and Community Engagement Credits: 3.0"
];

const REASONS = [
  "Late Enrollment",
  "False Enrollment",
  "Self Enrolment",
  "Financial Crises",
  "Interest Deviation",
  "Failure in Pre-req",
  "Freeze"
];

function UnderlineSelect({ label, options, placeholder, value, onChange }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <label className="text-[17px] text-slate-700 block mb-6">{label}</label>
      <div 
        className="flex items-center justify-between border-b border-slate-400 pb-2 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-[14.5px] ${value ? 'text-slate-800' : 'text-slate-600'}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <div className={`absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 shadow-xl z-50 transition-all ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} max-h-60 overflow-y-auto`}>
        {options.map((opt: string) => (
           <div 
             key={opt}
             onClick={() => { onChange(opt); setIsOpen(false); }}
             className={`px-4 py-2.5 text-[14px] cursor-pointer hover:bg-emerald-600 hover:text-white transition-colors ${value === opt ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'}`}
           >
             {opt}
           </div>
        ))}
      </div>
    </div>
  );
}

export default function CourseDropRequestPage() {
  const [course, setCourse] = useState("");
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  
  const [requests, setRequests] = useState<any[]>([]);

  const handleSendRequest = () => {
    if (!course || !reason) return;
    
    const newReq = {
      ref: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      course: course,
      reason: reason,
      status: "Pending"
    };
    
    setRequests([newReq, ...requests]);
    setCourse("");
    setReason("");
    setDesc("");
  };

  const handleCancel = (refToCancel: string) => {
    setRequests(requests.filter(r => r.ref !== refToCancel));
  };

  return (
    <div className="w-full text-[#4a4a4a]">
      <h1 className="text-[22px] mb-6 text-slate-700 font-normal">Course Drop Request</h1>
      
      {/* Requests Detail Card */}
      <div className="bg-white border border-slate-200/60 shadow-sm w-full mb-8 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100">
           <h2 className="text-[17px] text-slate-700">Requests Detail</h2>
        </div>
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-left text-[13.5px] whitespace-nowrap">
            <thead className="bg-emerald-700 text-white">
              <tr>
                <th className="py-3 px-4 font-medium">Reference</th>
                <th className="py-3 px-4 font-medium">Request Date</th>
                <th className="py-3 px-4 font-medium">Course</th>
                <th className="py-3 px-4 font-medium">Reason</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-6 text-slate-500 bg-slate-50 border-b border-slate-100">No requests found</td></tr>
              ) : (
                requests.map(req => (
                  <tr key={req.ref} className="hover:bg-slate-50">
                    <td className="py-3 px-4 border-b border-slate-100">{req.ref}</td>
                    <td className="py-3 px-4 border-b border-slate-100">{req.date}</td>
                    <td className="py-3 px-4 border-b border-slate-100 truncate max-w-[200px]" title={req.course}>{req.course.split(" - ")[1] || req.course}</td>
                    <td className="py-3 px-4 border-b border-slate-100">{req.reason}</td>
                    <td className="py-3 px-4 border-b border-slate-100">
                       <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-[3px] text-[11px] font-medium uppercase tracking-wider">{req.status}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-slate-100">
                      <button onClick={() => handleCancel(req.ref)} className="text-red-500 hover:text-red-700 font-medium">Cancel</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Make New Request Card */}
      <div className="bg-white border border-slate-200/60 shadow-sm w-full">
        <div className="px-5 py-5">
          <h2 className="text-[18px] text-slate-700 mb-10">Make New Request</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
             <UnderlineSelect 
               label="Courses"
               placeholder="Select Course..."
               value={course}
               onChange={setCourse}
               options={COURSES}
             />
             <UnderlineSelect 
               label="Reason"
               placeholder="Select Reason..."
               value={reason}
               onChange={setReason}
               options={REASONS}
             />
          </div>

          <div className="mb-10 relative mt-8">
            <label className="text-[13px] text-slate-500 absolute -top-5 left-0">Description</label>
            <textarea 
              rows={4}
              className="w-full border-b border-slate-300 focus:border-emerald-500 transition-colors outline-none resize-none pt-2 text-[15px] text-slate-800 bg-transparent"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>

          <button 
            onClick={handleSendRequest}
            disabled={!course || !reason}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-medium px-8 py-3 rounded-[3px] transition-colors uppercase tracking-wider shadow-sm hover:shadow active:translate-y-[1px]"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
