import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const enrolledCourseIds = (
    await prisma.enrollment.findMany({
      where: { studentId: auth.studentId },
      select: { courseId: true },
    })
  ).map((e) => e.courseId);

  const availableCourses = await prisma.course.findMany({
    where: { id: { notIn: enrolledCourseIds } },
    orderBy: { code: "asc" },
  });

  return NextResponse.json({ courses: availableCourses });
}
