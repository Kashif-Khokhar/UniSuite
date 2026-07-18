export interface GradeResult {
  gradeLetter: string;
  gpa: number;
}

/** Maps a 0-100 course mark to a letter grade and grade point, for courses
 * seeded with a single overall mark rather than the midterm/final/sessional
 * breakdown tracked for in-progress terms. */
export function marksToGrade(marks: number): GradeResult {
  if (marks >= 85) return { gradeLetter: "A", gpa: 4.0 };
  if (marks >= 75) return { gradeLetter: "A-", gpa: 3.7 };
  if (marks >= 65) return { gradeLetter: "B+", gpa: 3.3 };
  if (marks >= 55) return { gradeLetter: "B", gpa: 3.0 };
  if (marks >= 45) return { gradeLetter: "C+", gpa: 2.3 };
  if (marks >= 35) return { gradeLetter: "C", gpa: 2.0 };
  return { gradeLetter: "F", gpa: 0.0 };
}
