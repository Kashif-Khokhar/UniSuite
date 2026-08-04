import { prisma } from "@/lib/prisma";
import { Search } from "lucide-react";
import TeacherActionButtons from "./TeacherActionButtons";
import AddTeacherModal from "./AddTeacherModal";
import SearchInput from "@/components/shared/SearchInput";

export default async function AdminTeachersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  
  const teachers = await prisma.teacher.findMany({
    where: q ? {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { employeeId: { contains: q, mode: "insensitive" } },
      ],
    } : undefined,
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Teachers</h1>
          <p className="text-slate-500">View and manage the university faculty members.</p>
        </div>
        <AddTeacherModal />
      </div>

      <SearchInput placeholder="Search teachers by name or employee ID..." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                {teacher.employeeId}
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700">
                {teacher.status}
              </span>
            </div>
            <h3 className="mb-1 text-lg font-bold text-slate-800">{teacher.name}</h3>
            <p className="mb-1 text-sm text-slate-500">{teacher.email}</p>
            <TeacherActionButtons teacher={teacher} />
          </div>
        ))}
        {teachers.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No teachers found.
          </div>
        )}
      </div>
    </div>
  );
}
