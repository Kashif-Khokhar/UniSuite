"use client";

import { use, useEffect, useState } from "react";
import { getRoster, saveAttendance } from "./actions";
import { CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RosterItem {
  enrollmentId: string;
  studentName: string;
  rollNumber: string;
  status: string;
}

export default function RosterPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roster, setRoster] = useState<RosterItem[]>([]);
  const [makeupClass, setMakeupClass] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getRoster(id).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setRoster(res.roster || []);
        setMakeupClass(res.makeupClass);
      }
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError("Failed to load roster.");
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = (enrollmentId: string, status: string) => {
    setRoster(prev => prev.map(item => 
      item.enrollmentId === enrollmentId ? { ...item, status } : item
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const res = await saveAttendance(id, roster.map(r => ({ enrollmentId: r.enrollmentId, status: r.status })));
    
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/teacher/dashboard/attendance");
      }, 2000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-brand-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-[#4a4a4a]">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/teacher/dashboard/attendance" className="text-slate-400 hover:text-slate-600">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-[24px]">Class Roster</h1>
      </div>

      <div className="bg-white border border-slate-200/60 shadow-sm w-full flex flex-col min-h-[250px] p-8">
        
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-medium">Attendance saved successfully! Redirecting...</p>
          </div>
        )}

        {makeupClass && (
          <div className="mb-8 pb-4 border-b border-slate-100 flex flex-col gap-2">
            <h2 className="text-lg font-bold text-slate-800">
              {makeupClass.course.code} - {makeupClass.course.name}
            </h2>
            <div className="flex gap-4 text-sm text-slate-500 font-medium">
              <span>Term: <span className="text-slate-700">{makeupClass.term}</span></span>
              <span>•</span>
              <span>Date: <span className="text-slate-700">{new Date(makeupClass.date).toLocaleDateString()}</span></span>
              <span>•</span>
              <span>Time: <span className="text-slate-700">{makeupClass.fromTime} - {makeupClass.toTime}</span></span>
            </div>
          </div>
        )}

        {roster.length === 0 ? (
          <p className="text-sm text-slate-500">No students are currently enrolled in this course.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-2 w-16">Sr no.</th>
                  <th className="py-3 px-2">Roll Number</th>
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2 text-center">Present</th>
                  <th className="py-3 px-2 text-center">Absent</th>
                  <th className="py-3 px-2 text-center">Leave</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {roster.map((student, index) => (
                  <tr key={student.enrollmentId} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 font-medium">{index + 1}.)</td>
                    <td className="py-4 px-2 font-semibold text-slate-700">{student.rollNumber}</td>
                    <td className="py-4 px-2">{student.studentName}</td>
                    <td className="py-4 px-2 text-center">
                      <input 
                        type="radio" 
                        name={`status-${student.enrollmentId}`} 
                        checked={student.status === "Present"}
                        onChange={() => handleStatusChange(student.enrollmentId, "Present")}
                        className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 focus:ring-brand-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-2 text-center">
                      <input 
                        type="radio" 
                        name={`status-${student.enrollmentId}`} 
                        checked={student.status === "Absent"}
                        onChange={() => handleStatusChange(student.enrollmentId, "Absent")}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-2 text-center">
                      <input 
                        type="radio" 
                        name={`status-${student.enrollmentId}`} 
                        checked={student.status === "Leave"}
                        onChange={() => handleStatusChange(student.enrollmentId, "Leave")}
                        className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {roster.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm px-8 py-2.5 rounded-full transition-colors disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE ATTENDANCE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
