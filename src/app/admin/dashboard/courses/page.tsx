import { prisma } from "@/lib/prisma";
import { Search, Layers } from "lucide-react";
import CourseActionButtons from "./CourseActionButtons";
import AddCourseModal from "./AddCourseModal";
import Link from "next/link";
import SearchInput from "@/components/shared/SearchInput";

export default async function AdminCoursesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const courses = await prisma.course.findMany({
    where: q ? {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { code: { contains: q, mode: "insensitive" } },
      ],
    } : undefined,
    orderBy: { name: "asc" },
    include: { sections: { include: { teacher: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Courses</h1>
          <p className="text-slate-500">View and manage the university course catalog and sections.</p>
        </div>
        <AddCourseModal />
      </div>

      <SearchInput placeholder="Search courses by name or code..." />

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
            <p className="text-sm text-slate-500 mb-4">{course.sections.length} Section(s)</p>
            
            <div className="flex flex-col gap-2">
              <Link 
                href={`/admin/dashboard/courses/${course.id}/sections`}
                className="flex items-center justify-center gap-2 rounded-md bg-brand-50 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-100 transition-colors"
              >
                <Layers size={16} />
                Manage Sections
              </Link>
              <CourseActionButtons course={course} />
            </div>
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
