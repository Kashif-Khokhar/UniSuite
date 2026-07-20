import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = [
  "08:00 - 10:40",
  "09:00 - 11:20",
  "10:40 - 13:20",
  "11:40 - 14:20",
  "13:20 - 16:00",
  "14:20 - 17:00",
];
const ROOMS = ["Room-5", "Room-10", "Room-3", "Room-9", "Lab-2"];

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
    // Distribute more towards Friday and Saturday to match the screenshot feel
    // but keep it deterministic based on index
    const dayIndex = index % 7; // 0 to 6 (Mon to Sun)
    const day = WEEKDAYS[dayIndex];
    const dayEntry = timetable.find((d) => d.day === day)!;
    
    // Pick time slot based on index to ensure variety
    dayEntry.sessions.push({
      courseCode: `${e.course.code}-S26-PB-GCL-BSCSM-FALL`,
      courseName: e.course.name,
      instructor: e.course.instructor,
      time: TIME_SLOTS[index % TIME_SLOTS.length],
      room: `${ROOMS[index % ROOMS.length]} ( Lecture )`,
    });
  });

  timetable.forEach((d) => d.sessions.sort((a, b) => a.time.localeCompare(b.time)));

  return NextResponse.json({ timetable });
}
