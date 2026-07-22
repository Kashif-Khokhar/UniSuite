import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import CourseActionButtons from "./CourseActionButtons";
import AddCourseModal from "./AddCourseModal";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Courses</h1>
          <p className="text-slate-500">View and manage the university course catalog.</p>
        </div>
        <AddCourseModal />
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-brand-400 focus-within:ring-1 focus-within:ring-brand-400">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search courses by name or code..."
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                {course.code}
              </span>
              <span className="text-xs font-medium text-slate-500">{course.creditHours} CR</span>
            </div>
            <h3 className="mb-1 text-lg font-bold text-slate-800">{course.name}</h3>
            <p className="text-sm text-slate-500">Instructor: {course.instructor}</p>
            <CourseActionButtons course={course} />
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}
