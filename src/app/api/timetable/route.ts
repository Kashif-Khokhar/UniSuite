import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = ["08:30 - 09:50", "10:00 - 11:20", "11:30 - 12:50", "01:30 - 02:50", "03:00 - 04:20"];
const ROOMS = ["Room 214", "Lab 3", "Room 108", "Auditorium", "Room 302"];

export async function GET() {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: auth.studentId },
    include: { course: true },
    orderBy: { course: { code: "asc" } },
  });

  const timetable = WEEKDAYS.map((day) => ({ day, sessions: [] as Record<string, string>[] }));

  enrollments.forEach((e, index) => {
    const day = WEEKDAYS[index % WEEKDAYS.length];
    const dayEntry = timetable.find((d) => d.day === day)!;
    dayEntry.sessions.push({
      courseCode: e.course.code,
      courseName: e.course.name,
      instructor: e.course.instructor,
      time: TIME_SLOTS[index % TIME_SLOTS.length],
      room: ROOMS[index % ROOMS.length],
    });
  });

  timetable.forEach((d) => d.sessions.sort((a, b) => a.time.localeCompare(b.time)));

  return NextResponse.json({ timetable });
}
