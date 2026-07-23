"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getRoster(makeupClassId: string) {
  try {
    const makeupClass = await prisma.makeupClass.findUnique({
      where: { id: makeupClassId },
      include: { course: true },
    });

    if (!makeupClass) {
      return { error: "Class not found" };
    }

    const courseId = makeupClass.courseId; // This is the Course code, wait, Course relation uses `code`
    
    // Wait, the Enrollment relation to Course uses `courseId` mapping to `Course.id`.
    // Let's verify this.
    // Course model has `id` and `code`.
    // Enrollment uses `courseId` referring to `Course.id`.
    // MakeupClass uses `courseId` referring to `Course.code`.
    // So we first need the Course's `id` to find Enrollments.
    const course = await prisma.course.findUnique({
      where: { code: courseId }
    });

    if (!course) {
      return { error: "Course not found" };
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { courseId: course.id },
      include: {
        student: true,
      },
      orderBy: {
        student: { rollNumber: "asc" }
      }
    });

    // Also fetch existing attendance for this date
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        enrollmentId: { in: enrollments.map(e => e.id) },
        date: makeupClass.date,
      }
    });

    const roster = enrollments.map(e => {
      const existingRecord = attendanceRecords.find(a => a.enrollmentId === e.id);
      return {
        enrollmentId: e.id,
        studentName: e.student.name,
        rollNumber: e.student.rollNumber,
        status: existingRecord ? existingRecord.status : "Present", // default to Present
      };
    });

    return { 
      success: true, 
      makeupClass: JSON.parse(JSON.stringify(makeupClass)), 
      roster: JSON.parse(JSON.stringify(roster)) 
    };

  } catch (error: any) {
    console.error("Failed to fetch roster:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function saveAttendance(makeupClassId: string, attendanceData: { enrollmentId: string, status: string }[]) {
  try {
    const makeupClass = await prisma.makeupClass.findUnique({
      where: { id: makeupClassId }
    });

    if (!makeupClass) {
      return { error: "Class not found" };
    }

    const enrollmentIds = attendanceData.map(a => a.enrollmentId);

    // Delete existing attendance for this date and these enrollments to avoid duplicates
    await prisma.attendance.deleteMany({
      where: {
        enrollmentId: { in: enrollmentIds },
        date: makeupClass.date,
      }
    });

    // Insert new attendance records
    await prisma.attendance.createMany({
      data: attendanceData.map(a => ({
        enrollmentId: a.enrollmentId,
        date: makeupClass.date,
        status: a.status
      }))
    });

    revalidatePath(`/teacher/dashboard/attendance/roster/${makeupClassId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save attendance:", error);
    return { error: "An unexpected error occurred." };
  }
}
