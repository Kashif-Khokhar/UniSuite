"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";
import type { TermSummary } from "@/lib/academic-term";

export default function PreviousCoursesTable({ terms }: { terms: TermSummary[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (terms.length === 0) {
    return <EmptyState message="No completed terms yet." />;
  }

  function toggle(semester: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(semester)) {
        next.delete(semester);
      } else {
        next.add(semester);
      }
      return next;
    });
  }

  return (
    <table className="w-full text-left text-sm">
      <thead className="text-xs uppercase tracking-wide text-slate-500">
        <tr className="border-b border-slate-200">
          <Th>Term</Th>
          <Th>Grade Points</Th>
          <Th>Total Credits</Th>
          <Th>Earned Credits</Th>
          <Th>GPA</Th>
          <Th>CGPA</Th>
        </tr>
      </thead>
      <tbody>
        {terms.map((t) => {
          const isOpen = expanded.has(t.semester);
          return (
            <Fragment key={t.semester}>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <Td>
                  <button
                    type="button"
                    onClick={() => toggle(t.semester)}
                    className="flex items-center gap-1.5 font-medium text-brand-600 hover:text-brand-700"
                  >
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    {t.term}
                  </button>
                </Td>
                <Td>{t.gradePoints.toFixed(2)}</Td>
                <Td>{t.totalCredits.toFixed(1)}</Td>
                <Td>{t.earnedCredits.toFixed(1)}</Td>
                <Td>{t.gpa.toFixed(2)}</Td>
                <Td>{t.cgpa.toFixed(2)}</Td>
              </tr>
              {isOpen && (
                <tr>
                  <td colSpan={6} className="bg-slate-50 p-0">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-brand-700 text-xs uppercase tracking-wide text-white">
                        <tr>
                          <Th className="text-white">Course</Th>
                          <Th className="text-white">Credits</Th>
                          <Th className="text-white">Marks Obtained</Th>
                          <Th className="text-white">Grade Pts</Th>
                          <Th className="text-white">Grade</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {t.courses.map((c) => (
                          <tr key={c.courseCode}>
                            <Td className="font-medium text-slate-900">{c.courseName}</Td>
                            <Td>{c.creditHours.toFixed(1)}</Td>
                            <Td>{c.marksObtained.toFixed(1)}</Td>
                            <Td>{(c.gpa * c.creditHours).toFixed(2)}</Td>
                            <Td>
                              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                                {c.gradeLetter}
                              </span>
                            </Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
