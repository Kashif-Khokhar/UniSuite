import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { marksToGrade } from "../src/lib/grade-scale";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.attendance.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.feeChallan.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  const student = await prisma.student.create({
    data: {
      name: "Ismail Khan",
      fatherName: "Abdul Khan",
      rollNumber: "SP21-BCS-045",
      email: "ismailkhan200314@gmail.com",
      password: hashedPassword,
      program: "BS Computer Science",
      faculty: "Faculty of Computer Science and Information Technology",
      career: "Under Graduate",
      currentSemester: 6,
      cgpa: 3.42,
      dob: new Date("2003-05-14"),
      gender: "Male",
      cnic: "37405-1234567-9",
      domicile: "Islamabad",
      nationality: "Pakistani",
      religion: "Islam",
      bloodGroup: "O+",
      fatherCnic: "37405-7654321-1",
      maritalStatus: "Single",
      contact: "+92 300 1234567",
      emergencyContact: "+92 300 7654321",
      presentAddress: "House 12, Street 5, G-9, Islamabad",
      permanentAddress: "House 12, Street 5, G-9, Islamabad",
    },
  });

  const courseData = [
    { code: "CS301", name: "Database Systems", creditHours: 3, instructor: "Dr. Ayesha Malik" },
    { code: "CS310", name: "Operating Systems", creditHours: 3, instructor: "Dr. Bilal Ahmed" },
    { code: "CS322", name: "Software Engineering", creditHours: 3, instructor: "Ms. Sana Tariq" },
    { code: "CS340", name: "Computer Networks", creditHours: 3, instructor: "Mr. Usman Farooq" },
    { code: "MATH210", name: "Probability & Statistics", creditHours: 3, instructor: "Dr. Nadia Iqbal" },
    { code: "CS350", name: "Artificial Intelligence", creditHours: 3, instructor: "Dr. Hassan Raza" },
  ];

  // Elective courses the student is not enrolled in — used to populate the
  // Self Enrollment page with real, unenrolled options.
  const electiveCourseData = [
    { code: "CS360", name: "Web Engineering", creditHours: 3, instructor: "Ms. Hira Saeed" },
    { code: "CS370", name: "Human-Computer Interaction", creditHours: 3, instructor: "Dr. Kamran Sheikh" },
    { code: "CS410", name: "Cloud Computing", creditHours: 3, instructor: "Mr. Faisal Iqbal" },
  ];

  const courses = [];
  for (const c of courseData) {
    courses.push(await prisma.course.create({ data: c }));
  }
  for (const c of electiveCourseData) {
    await prisma.course.create({ data: c });
  }

  // Distinct attendance rate per course so the dashboard shows a realistic mix
  // (some courses above the 75% threshold, some below).
  const attendanceRates = [0.9, 0.65, 0.8, 0.55, 0.95, 0.72];

  for (let courseIndex = 0; courseIndex < courses.length; courseIndex++) {
    const course = courses[courseIndex];
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseId: course.id,
        semester: 6,
      },
    });

    // Attendance: 20 lectures per course, spread across Present/Absent/Leave
    // at this course's target attendance rate.
    const rate = attendanceRates[courseIndex % attendanceRates.length];
    const lectureCount = 20;
    const presentCount = Math.round(rate * lectureCount);
    const remaining = lectureCount - presentCount;
    const leaveCount = Math.min(2, remaining);
    const absentCount = remaining - leaveCount;

    const nonPresentIndices: number[] = [];
    const totalNonPresent = leaveCount + absentCount;
    for (let n = 0; n < totalNonPresent; n++) {
      nonPresentIndices.push(Math.floor(((n + 1) * lectureCount) / (totalNonPresent + 1)));
    }

    const statuses: string[] = new Array(lectureCount).fill("Present");
    nonPresentIndices.forEach((idx, n) => {
      statuses[idx] = n < absentCount ? "Absent" : "Leave";
    });

    const attendanceRecords = statuses.map((status, i) => ({
      enrollmentId: enrollment.id,
      date: new Date(2026, 0, 1 + i * 3),
      status,
    }));
    await prisma.attendance.createMany({ data: attendanceRecords });

    // Grades
    const midterm = Math.round(12 + Math.random() * 8);
    const final = Math.round(25 + Math.random() * 15);
    const sessional = Math.round(7 + Math.random() * 3);
    const total = midterm + final + sessional;
    let gradeLetter = "C";
    let gpa = 2.0;
    if (total >= 85) {
      gradeLetter = "A";
      gpa = 4.0;
    } else if (total >= 75) {
      gradeLetter = "A-";
      gpa = 3.7;
    } else if (total >= 65) {
      gradeLetter = "B+";
      gpa = 3.3;
    } else if (total >= 55) {
      gradeLetter = "B";
      gpa = 3.0;
    } else if (total >= 45) {
      gradeLetter = "C+";
      gpa = 2.3;
    }

    await prisma.grade.create({
      data: {
        enrollmentId: enrollment.id,
        midterm,
        final,
        sessional,
        total,
        gradeLetter,
        gpa,
      },
    });
  }

  // Historical semesters (1-5) — completed terms shown in the Results page's
  // "Previous Courses" tab, distinct from semester 6 which is still active.
  const HISTORICAL_SEMESTERS: {
    semester: number;
    courses: { code: string; name: string; creditHours: number; instructor: string; marks: number }[];
  }[] = [
    {
      semester: 1,
      courses: [
        { code: "H101", name: "Applied Physics", creditHours: 3, instructor: "Dr. Nadia Iqbal", marks: 78 },
        { code: "H102", name: "English Composition & Comprehension", creditHours: 3, instructor: "Ms. Sana Tariq", marks: 72 },
        { code: "H103", name: "Introduction to Computing", creditHours: 3, instructor: "Mr. Usman Farooq", marks: 68 },
        { code: "H104", name: "Programming Fundamentals", creditHours: 3, instructor: "Dr. Ayesha Malik", marks: 74 },
        { code: "H105", name: "Introduction to Logic", creditHours: 3, instructor: "Dr. Hassan Raza", marks: 80 },
      ],
    },
    {
      semester: 2,
      courses: [
        { code: "H201", name: "Calculus & Analytical Geometry", creditHours: 3, instructor: "Dr. Nadia Iqbal", marks: 75 },
        { code: "H202", name: "Digital Logic Design", creditHours: 3, instructor: "Mr. Faisal Iqbal", marks: 70 },
        { code: "H203", name: "Object Oriented Programming", creditHours: 3, instructor: "Dr. Ayesha Malik", marks: 73 },
        { code: "H204", name: "Discrete Structures", creditHours: 3, instructor: "Dr. Bilal Ahmed", marks: 78 },
        { code: "H205", name: "Pakistan Studies", creditHours: 3, instructor: "Ms. Hira Saeed", marks: 82 },
      ],
    },
    {
      semester: 3,
      courses: [
        { code: "H301", name: "Data Structures & Algorithms", creditHours: 3, instructor: "Dr. Bilal Ahmed", marks: 80 },
        { code: "H302", name: "Computer Organization & Assembly", creditHours: 3, instructor: "Mr. Faisal Iqbal", marks: 76 },
        { code: "H303", name: "Linear Algebra", creditHours: 3, instructor: "Dr. Nadia Iqbal", marks: 79 },
        { code: "H304", name: "Technical & Business Writing", creditHours: 3, instructor: "Ms. Sana Tariq", marks: 83 },
        { code: "H305", name: "Numerical Computing", creditHours: 3, instructor: "Dr. Kamran Sheikh", marks: 77 },
      ],
    },
    {
      semester: 4,
      courses: [
        { code: "H401", name: "Theory of Automata", creditHours: 3, instructor: "Dr. Hassan Raza", marks: 82 },
        { code: "H402", name: "Requirements Engineering", creditHours: 3, instructor: "Ms. Sana Tariq", marks: 85 },
        { code: "H403", name: "Computer Architecture", creditHours: 3, instructor: "Mr. Faisal Iqbal", marks: 79 },
        { code: "H404", name: "Technical Report Writing II", creditHours: 3, instructor: "Ms. Hira Saeed", marks: 88 },
        { code: "H405", name: "Islamic Studies", creditHours: 3, instructor: "Dr. Kamran Sheikh", marks: 84 },
      ],
    },
    {
      semester: 5,
      courses: [
        { code: "H501", name: "Information Security Fundamentals", creditHours: 3, instructor: "Dr. Bilal Ahmed", marks: 86 },
        { code: "H502", name: "Compiler Construction", creditHours: 3, instructor: "Dr. Hassan Raza", marks: 89 },
        { code: "H503", name: "Parallel Computing Basics", creditHours: 3, instructor: "Mr. Faisal Iqbal", marks: 83 },
        { code: "H504", name: "Professional Practices", creditHours: 3, instructor: "Ms. Hira Saeed", marks: 90 },
        { code: "H505", name: "Entrepreneurship", creditHours: 3, instructor: "Dr. Ayesha Malik", marks: 87 },
      ],
    },
  ];

  for (const term of HISTORICAL_SEMESTERS) {
    for (const c of term.courses) {
      const course = await prisma.course.create({
        data: { code: c.code, name: c.name, creditHours: c.creditHours, instructor: c.instructor },
      });
      const enrollment = await prisma.enrollment.create({
        data: { studentId: student.id, courseId: course.id, semester: term.semester },
      });
      const { gradeLetter, gpa } = marksToGrade(c.marks);
      const midterm = Math.round(c.marks * 0.25);
      const final = Math.round(c.marks * 0.5);
      const sessional = c.marks - midterm - final;
      await prisma.grade.create({
        data: {
          enrollmentId: enrollment.id,
          midterm,
          final,
          sessional,
          total: c.marks,
          gradeLetter,
          gpa,
        },
      });
    }
  }

  // Fee challans
  const months = [
    { month: "January 2026", status: "Paid" },
    { month: "February 2026", status: "Paid" },
    { month: "March 2026", status: "Paid" },
    { month: "April 2026", status: "Paid" },
    { month: "May 2026", status: "Unpaid" },
    { month: "June 2026", status: "Unpaid" },
  ];

  for (let i = 0; i < months.length; i++) {
    await prisma.feeChallan.create({
      data: {
        studentId: student.id,
        amount: 45000,
        dueDate: new Date(2026, i, 20),
        status: months[i].status,
        billingMonth: months[i].month,
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Login with Roll Number: ${student.rollNumber} / Password: password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
