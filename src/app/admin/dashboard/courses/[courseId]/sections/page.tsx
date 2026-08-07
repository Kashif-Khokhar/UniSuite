import { prisma } from "@/lib/prisma";
import { ArrowLeft, Layers, Plus } from "lucide-react";
import Link from "next/link";
import SectionActionButtons from "./SectionActionButtons";
import AddSectionModal from "./AddSectionModal";
import ViewStudentsModal from "./ViewStudentsModal";

export default async function CourseSectionsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      sections: {
        include: { 
          teacher: true, 
          enrollments: {
            include: { student: true }
          }
        },
        orderBy: { name: "asc" }
      },
    }
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const teachers = await prisma.teacher.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, employeeId: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/dashboard/courses"
          className="flex items-center justify-center rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{course.code} - {course.name} Sections</h1>
          <p className="text-slate-500">Manage sections and assign teachers for this course.</p>
        </div>
        <div className="ml-auto">
          <AddSectionModal courseId={course.id} teachers={teachers} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {course.sections.map((section) => (
          <div key={section.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-brand-600">
              <Layers size={18} />
              <h3 className="text-lg font-bold">{section.name}</h3>
            </div>
            
            <div className="mb-4 space-y-3 text-sm text-slate-600 flex-1">
              <p><span className="font-medium text-slate-800">Teacher:</span> {section.teacher?.name || "Unassigned"}</p>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p><span className="font-medium text-slate-800">Enrolled:</span> {section.enrollments.length} Student(s)</p>
                {section.enrollments.length > 0 && (
                  <ViewStudentsModal 
                    students={section.enrollments.map(e => e.student)} 
                    sectionName={section.name} 
                  />
                )}
              </div>
            </div>
            
            <div className="mt-auto pt-4">
              <SectionActionButtons section={section} teachers={teachers} />
            </div>
          </div>
        ))}
        
        {course.sections.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            No sections created for this course yet.
          </div>
        )}
      </div>
    </div>
  );
}
