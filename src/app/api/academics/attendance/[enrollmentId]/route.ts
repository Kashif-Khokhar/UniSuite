import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";

const STATUS_CODE: Record<string, string> = { Present: "P", Absent: "A", Leave: "L" };

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ enrollmentId: string }> }
) {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const { enrollmentId } = await params;

  const enrollment = await prisma.enrollment.findFirst({
    where: { id: enrollmentId, studentId: auth.studentId },
    include: {
      course: true,
      attendance: { orderBy: { date: "asc" } },
    },
  });

  if (!enrollment) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  const delivered = enrollment.attendance.length;
  const attended = enrollment.attendance.filter((a) => a.status === "Present").length;
  const percentage = delivered ? Math.round((attended / delivered) * 10000) / 100 : 0;

  return NextResponse.json({
    courseCode: enrollment.course.code,
    courseName: enrollment.course.name,
    semester: enrollment.semester,
    delivered,
    attended,
    percentage,
    records: enrollment.attendance.map((a, i) => ({
      sr: i + 1,
      date: a.date,
      status: STATUS_CODE[a.status] ?? a.status,
    })),
  });
}
