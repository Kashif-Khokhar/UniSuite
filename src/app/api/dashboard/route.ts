import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";
import { termLabelForSemester, buildTermSummaries } from "@/lib/academic-term";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = ["08:30 - 09:50", "10:00 - 11:20", "11:30 - 12:50", "01:30 - 02:50", "03:00 - 04:20"];
const ROOMS = ["Room 214", "Lab 3", "Room 108", "Auditorium", "Room 302"];
const ATTENDANCE_THRESHOLD = 75;

export async function GET() {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const student = await prisma.student.findUnique({ where: { id: auth.studentId } });
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: auth.studentId },
    include: { course: true, attendance: true, grade: true },
  });

  // Attendance, today's schedule, SGPA, etc. are all about the in-progress
  // current term — historical semesters only feed the CGPA trend below.
  const currentEnrollments = enrollments.filter((e) => e.semester === student.currentSemester);

  const totalCreditHours = currentEnrollments.reduce((sum, e) => sum + e.course.creditHours, 0);

  const allAttendance = currentEnrollments.flatMap((e) => e.attendance);
  const presentCount = allAttendance.filter((a) => a.status === "Present").length;
  const attendancePercentage = allAttendance.length
    ? Math.round((presentCount / allAttendance.length) * 1000) / 10
    : 0;

  const challans = await prisma.feeChallan.findMany({ where: { studentId: auth.studentId } });
  const unpaidChallans = challans
    .filter((c) => c.status === "Unpaid")
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  const outstandingBalance = unpaidChallans.reduce((sum, c) => sum + c.amount, 0);
  const upcomingFee = unpaidChallans[0]
    ? {
        billingMonth: unpaidChallans[0].billingMonth,
        amount: unpaidChallans[0].amount,
        dueDate: unpaidChallans[0].dueDate,
      }
    : null;

  const fullSchedule = currentEnrollments.map((e, index) => ({
    day: WEEKDAYS[index % WEEKDAYS.length],
    courseCode: e.course.code,
    courseName: e.course.name,
    instructor: e.course.instructor,
    time: TIME_SLOTS[index % TIME_SLOTS.length],
    room: ROOMS[index % ROOMS.length],
  }));

  const todayName = DAYS[new Date().getDay()];
  let todaySchedule = fullSchedule.filter((s) => s.day === todayName);
  // Weekend fallback so the dashboard isn't empty when demoed on a Sat/Sun.
  if (todaySchedule.length === 0) {
    todaySchedule = fullSchedule.filter((s) => s.day === WEEKDAYS[0]);
  }

  const courseAttendance = currentEnrollments.map((e) => {
    const delivered = e.attendance.length;
    const attended = e.attendance.filter((a) => a.status === "Present").length;
    const percentage = delivered ? Math.round((attended / delivered) * 1000) / 10 : 0;
    return {
      courseCode: e.course.code,
      courseName: e.course.name,
      percentage,
      detained: percentage < ATTENDANCE_THRESHOLD,
    };
  });

  const detainedCourses = courseAttendance.filter((c) => c.detained);
  const detainedEnrollmentIds = new Set(
    currentEnrollments
      .filter((e) => {
        const delivered = e.attendance.length;
        const attended = e.attendance.filter((a) => a.status === "Present").length;
        const percentage = delivered ? (attended / delivered) * 100 : 0;
        return percentage < ATTENDANCE_THRESHOLD;
      })
      .map((e) => e.id)
  );

  // SGPA: average GPA across this semester's graded, non-detained courses.
  const gradedThisTerm = currentEnrollments.filter((e) => e.grade && !detainedEnrollmentIds.has(e.id));
  const sgpa = gradedThisTerm.length
    ? Math.round((gradedThisTerm.reduce((sum, e) => sum + e.grade!.gpa, 0) / gradedThisTerm.length) * 100) / 100
    : 0;
  const fGrades = currentEnrollments.filter((e) => e.grade?.gradeLetter === "F").length;

  // Batch/term labels derived from the roll number's intake code (e.g. "SP21" -> Spring 2021).
  const intakeMatch = student.rollNumber.match(/^(SP|FA)(\d{2})/);

  let batch = student.program;
  if (intakeMatch) {
    const intakeSeason = intakeMatch[1] === "SP" ? "Spring" : "Fall";
    const intakeYear = 2000 + parseInt(intakeMatch[2], 10);
    batch = `${student.program} - ${intakeSeason} ${String(intakeYear).slice(2)}`;
  }
  const currentTerm = termLabelForSemester(student.rollNumber, student.currentSemester);

  // Real term-wise CGPA history from every graded enrollment, current term included.
  const cgpaTrend = buildTermSummaries(student.rollNumber, enrollments).map((t) => ({
    term: t.term,
    cgpa: t.cgpa,
  }));

  // Mocked program credit-hour target based on a typical 130-credit-hour degree plan.
  const programTotalCredits = 130;
  const completedCredits = Math.min(programTotalCredits, (student.currentSemester - 1) * 15);

  // Academic probation warning: CGPA below the minimum good-standing threshold.
  const academicWarnings = student.cgpa < 2.0 ? 1 : 0;

  return NextResponse.json({
    cgpa: student.cgpa,
    totalCreditHours,
    attendancePercentage,
    outstandingBalance,
    todaySchedule,
    studentName: student.name,
    rollNumber: student.rollNumber,
    program: student.program,
    faculty: student.program.includes("Computer Science")
      ? "Faculty of Computer Science and Information Technology"
      : student.program,
    courseAttendance,
    detainedCourses,
    cgpaTrend,
    creditProgress: {
      completed: completedCredits,
      total: programTotalCredits,
    },
    sgpa,
    passCredits: completedCredits,
    fGrades,
    batch,
    currentTerm,
    upcomingFee,
    academicWarnings,
  });
}
