import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";

export interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  instructor: string;
  semester: number;
}

export default function CoursesTable({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return <EmptyState message="No courses enrolled this semester." />;
  }
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <Th>Course Code</Th>
          <Th>Course Name</Th>
          <Th>Credit Hours</Th>
          <Th>Instructor</Th>
          <Th>Semester</Th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {courses.map((c) => (
          <tr key={c.id} className="hover:bg-slate-50">
            <Td className="font-medium text-slate-900">{c.code}</Td>
            <Td>{c.name}</Td>
            <Td>{c.creditHours}</Td>
            <Td>{c.instructor}</Td>
            <Td>{c.semester}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
