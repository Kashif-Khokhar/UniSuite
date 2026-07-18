"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { Th, Td } from "@/components/shared/Table";
import EmptyState from "@/components/shared/EmptyState";

interface Assessment {
  type: string;
  obtained: number;
  max: number;
  percentage: number;
}

interface ResultDetail {
  courseCode: string;
  courseName: string;
  creditHours: number;
  termLabel: string;
  assessments: Assessment[];
}

export default function ResultClassDetailPage() {
  const params = useParams<{ enrollmentId: string }>();
  const [data, setData] = useState<ResultDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/academics/results/${params.enrollmentId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setData(json.courseCode ? json : null))
      .finally(() => setLoading(false));
  }, [params.enrollmentId]);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading result...</div>;
  }

  if (!data) {
    return <div className="text-sm text-red-500">Failed to load class result.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Results" description={`${data.courseName} — assessment breakdown for the active term.`} />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-6 flex gap-6 border-b border-slate-200">
          <span className="-mb-px border-b-2 border-brand-600 pb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
            Lecture
          </span>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3">
          <p className="text-sm">
            <span className="font-semibold text-slate-900">Course: </span>
            <span className="text-slate-700">{data.courseName}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-slate-900">Course Code: </span>
            <span className="text-slate-700">{data.courseCode}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-slate-900">Term: </span>
            <span className="text-slate-700">{data.termLabel}</span>
          </p>
        </div>

        {data.assessments.length === 0 ? (
          <EmptyState message="No assessments recorded yet for this class." />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <Th>Assessment Type</Th>
                <Th>Obtained Percentage</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.assessments.map((a) => (
                <tr key={a.type} className="hover:bg-slate-50">
                  <Td className="font-medium text-slate-900">{a.type}</Td>
                  <Td>
                    {a.percentage}% <span className="text-slate-400">({a.obtained}/{a.max})</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
