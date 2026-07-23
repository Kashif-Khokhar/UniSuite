"use client";

import { ChevronDown, CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { createMakeupClass, getCourses } from "./actions";

interface Course {
  code: string;
  name: string;
}

export default function CreateMakeupPage() {
  const [state, formAction, isPending] = useActionState(createMakeupClass, null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then(setCourses).catch(console.error);
  }, []);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold text-[#4a4a4a]">Create Makeup Class</h1>
      
      <div className="bg-white border border-slate-200 shadow-sm p-6 md:p-8 rounded-sm">
        
        {showSuccess && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-medium">Makeup class created successfully!</p>
          </div>
        )}

        {state?.error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
            {state.error}
          </div>
        )}

        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          
          {/* Row 1 */}
          <div className="relative">
            <select name="term" required className="w-full appearance-none border-b border-slate-200 bg-transparent py-2 pl-2 pr-8 text-sm text-slate-700 outline-none focus:border-brand-500 cursor-pointer">
              <option value="">Select Term...</option>
              <option value="Spring 2026">Spring 2026</option>
              <option value="Fall 2026">Fall 2026</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-2.5 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative flex items-center">
            <CalendarDays size={18} className="absolute left-2 text-slate-400" />
            <input 
              type="date" 
              name="date"
              required
              placeholder="Select date" 
              className="w-full border-b border-slate-200 bg-transparent py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-brand-500"
            />
          </div>

          {/* Row 2 */}
          <div className="relative">
            <select name="courseId" required className="w-full appearance-none border-b border-slate-200 bg-transparent py-2 pl-2 pr-8 text-sm text-slate-700 outline-none focus:border-brand-500 cursor-pointer">
              <option value="">Select Class...</option>
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-2 top-2.5 text-slate-500 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative flex items-center">
              <Clock size={18} className="absolute left-2 text-slate-400" />
              <input 
                type="time"
                name="fromTime"
                required
                placeholder="From time" 
                className="w-full border-b border-slate-200 bg-transparent py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-brand-500"
              />
            </div>
            <div className="relative flex items-center">
              <Clock size={18} className="absolute left-2 text-slate-400" />
              <input 
                type="time" 
                name="toTime"
                required
                placeholder="To time" 
                className="w-full border-b border-slate-200 bg-transparent py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Row 3 - Button */}
          <div className="mt-4 md:col-span-2">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm px-8 py-2.5 rounded-full transition-colors disabled:opacity-50"
            >
              {isPending ? "CREATING..." : "CREATE CLASS"}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
