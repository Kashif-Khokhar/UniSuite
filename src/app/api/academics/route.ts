import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";
import { termLabelForSemester, buildTermSummaries } from "@/lib/academic-term";

const ATTENDANCE_THRESHOLD = 75;

export async function GET() {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const student = await prisma.student.findUnique({
    where: { id: auth.studentId },
    select: { rollNumber: true, currentSemester: true },
  });
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: auth.studentId },
    include: {
      course: true,
      attendance: true,
      grade: true,
    },
    orderBy: { course: { code: "asc" } },
  });

  const percentageByEnrollment = new Map<string, number>();
  enrollments.forEach((e) => {
    const delivered = e.attendance.length;
    const attended = e.attendance.filter((a) => a.status === "Present").length;
    const percentage = delivered ? Math.round((attended / delivered) * 1000) / 10 : 0;
    percentageByEnrollment.set(e.id, percentage);
  });

  // Attendance-based detention only applies to the in-progress current term —
  // completed historical terms already have a settled, final grade.
  const isDetained = (e: (typeof enrollments)[number]) =>
    e.semester === student.currentSemester && (percentageByEnrollment.get(e.id) ?? 100) < ATTENDANCE_THRESHOLD;

  const currentEnrollments = enrollments.filter((e) => e.semester === student.currentSemester);

  const courses = currentEnrollments.map((e) => ({
    id: e.id,
    code: e.course.code,
    name: e.course.name,
    creditHours: e.course.creditHours,
    instructor: e.course.instructor,
    semester: e.semester,
    termLabel: termLabelForSemester(student.rollNumber, e.semester),
    detained: isDetained(e),
  }));

  const attendance = currentEnrollments.map((e) => {
    const leaves = e.attendance.filter((a) => a.status === "Leave").length;
    const absents = e.attendance.filter((a) => a.status === "Absent").length;
    const attended = e.attendance.filter((a) => a.status === "Present").length;
    return {
      id: e.id,
      courseCode: e.course.code,
      courseName: e.course.name,
      semester: e.semester,
      termLabel: termLabelForSemester(student.rollNumber, e.semester),
      delivered: e.attendance.length,
      attended,
      absents,
      leaves,
      percentage: percentageByEnrollment.get(e.id) ?? 0,
      detained: isDetained(e),
    };
  });

  // Below the attendance threshold, a student is barred from sitting the final
  // exam for that course ("detained") and must file a Course Drop request —
  // so the transcript shows a Detained status instead of a completed grade.
  const transcript = enrollments
    .filter((e) => e.grade)
    .map((e) => {
      const detained = isDetained(e);
      const grade = e.grade!;
      return {
        courseCode: e.course.code,
        courseName: e.course.name,
        creditHours: e.course.creditHours,
        midterm: grade.midterm,
        final: detained ? null : grade.final,
        sessional: grade.sessional,
        total: detained ? null : grade.total,
        gradeLetter: detained ? "Detained" : grade.gradeLetter,
        gpa: detained ? 0 : grade.gpa,
        detained,
      };
    });

  // Completed prior terms, grouped and cumulatively totaled, for the Results
  // page's "Previous Courses" tab. The active term surfaces separately below.
  const resultTerms = buildTermSummaries(
    student.rollNumber,
    enrollments.filter((e) => e.semester !== student.currentSemester)
  );

  return NextResponse.json({ courses, attendance, transcript, resultTerms });
}
