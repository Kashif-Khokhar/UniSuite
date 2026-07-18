import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";
import { termLabelForSemester } from "@/lib/academic-term";

// Matches the midterm/final/sessional ranges courses are seeded with.
const ASSESSMENT_MAX = { Midterm: 20, Sessional: 10, Final: 40 } as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ enrollmentId: string }> }
) {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const { enrollmentId } = await params;

  const student = await prisma.student.findUnique({
    where: { id: auth.studentId },
    select: { rollNumber: true },
  });
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: { id: enrollmentId, studentId: auth.studentId },
    include: { course: true, grade: true },
  });

  if (!enrollment) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  const grade = enrollment.grade;
  const assessments = grade
    ? [
        { type: "Midterm", obtained: grade.midterm, max: ASSESSMENT_MAX.Midterm, percentage: Math.round((grade.midterm / ASSESSMENT_MAX.Midterm) * 1000) / 10 },
        { type: "Sessional", obtained: grade.sessional, max: ASSESSMENT_MAX.Sessional, percentage: Math.round((grade.sessional / ASSESSMENT_MAX.Sessional) * 1000) / 10 },
        { type: "Final", obtained: grade.final, max: ASSESSMENT_MAX.Final, percentage: Math.round((grade.final / ASSESSMENT_MAX.Final) * 1000) / 10 },
      ]
    : [];

  return NextResponse.json({
    courseCode: enrollment.course.code,
    courseName: enrollment.course.name,
    creditHours: enrollment.course.creditHours,
    termLabel: termLabelForSemester(student.rollNumber, enrollment.semester),
    assessments,
  });
}
