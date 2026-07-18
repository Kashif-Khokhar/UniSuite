export function termLabelForSemester(rollNumber: string, semesterNumber: number): string {
  const intakeMatch = rollNumber.match(/^(SP|FA)(\d{2})/);
  if (!intakeMatch) return `Semester ${semesterNumber}`;

  const intakeIsSpring = intakeMatch[1] === "SP";
  const intakeYear = 2000 + parseInt(intakeMatch[2], 10);
  const termIndex = semesterNumber - 1;
  const isSpringTerm = intakeIsSpring ? termIndex % 2 === 0 : termIndex % 2 === 1;
  // Spring-intake year increments every 2 terms starting the same year;
  // Fall-intake's first Spring term already falls in the following year.
  const termYear = intakeYear + (intakeIsSpring ? Math.floor(termIndex / 2) : Math.ceil(termIndex / 2));
  return `${isSpringTerm ? "Spring" : "Fall"} ${termYear}`;
}

export interface TermCourseGrade {
  courseCode: string;
  courseName: string;
  creditHours: number;
  marksObtained: number;
  gradeLetter: string;
  gpa: number;
}

export interface TermSummary {
  semester: number;
  term: string;
  gradePoints: number;
  totalCredits: number;
  earnedCredits: number;
  gpa: number;
  cgpa: number;
  courses: TermCourseGrade[];
}

interface EnrollmentForTerm {
  semester: number;
  course: { code: string; name: string; creditHours: number };
  grade: {
    total: number;
    gradeLetter: string | null;
    gpa: number;
  } | null;
}

/** Groups enrollments by semester and computes per-term quality points, GPA,
 * and a running CGPA — the same aggregation a transcript and a CGPA trend
 * chart both need, kept in one place so they can't drift apart. */
export function buildTermSummaries(rollNumber: string, enrollments: EnrollmentForTerm[]): TermSummary[] {
  const bySemester = new Map<number, EnrollmentForTerm[]>();
  for (const e of enrollments) {
    if (!e.grade) continue;
    const list = bySemester.get(e.semester) ?? [];
    list.push(e);
    bySemester.set(e.semester, list);
  }

  const semesters = Array.from(bySemester.keys()).sort((a, b) => a - b);
  let cumulativeGradePoints = 0;
  let cumulativeCredits = 0;

  return semesters.map((semester) => {
    const rows = bySemester.get(semester)!;
    const courses: TermCourseGrade[] = rows.map((e) => ({
      courseCode: e.course.code,
      courseName: e.course.name,
      creditHours: e.course.creditHours,
      marksObtained: e.grade!.total,
      gradeLetter: e.grade!.gradeLetter ?? "—",
      gpa: e.grade!.gpa,
    }));

    const totalCredits = courses.reduce((sum, c) => sum + c.creditHours, 0);
    const earnedCredits = courses
      .filter((c) => c.gradeLetter !== "F")
      .reduce((sum, c) => sum + c.creditHours, 0);
    const gradePoints = Math.round(courses.reduce((sum, c) => sum + c.gpa * c.creditHours, 0) * 100) / 100;
    const gpa = totalCredits ? Math.round((gradePoints / totalCredits) * 100) / 100 : 0;

    cumulativeGradePoints += gradePoints;
    cumulativeCredits += totalCredits;
    const cgpa = cumulativeCredits ? Math.round((cumulativeGradePoints / cumulativeCredits) * 100) / 100 : 0;

    return { semester, term: termLabelForSemester(rollNumber, semester), gradePoints, totalCredits, earnedCredits, gpa, cgpa, courses };
  });
}
