"use client";

import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import ResultActiveCourseCard, { ActiveResultCourse } from "@/components/academics/ResultActiveCourseCard";
import PreviousCoursesTable from "@/components/academics/PreviousCoursesTable";
import type { TermSummary } from "@/lib/academic-term";

interface ResultsData {
  activeCourses: ActiveResultCourse[];
  resultTerms: TermSummary[];
}

type Tab = "active" | "previous";

export default function ResultsPage() {
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("active");

  useEffect(() => {
    fetch("/api/academics", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        const activeCourses: ActiveResultCourse[] = (json.courses ?? []).map(
          (c: { id: string; code: string; name: string; creditHours: number; termLabel: string }) => ({
            id: c.id,
            courseCode: c.code,
            courseName: c.name,
            creditHours: c.creditHours,
            termLabel: c.termLabel,
          })
        );
        setData({ activeCourses, resultTerms: json.resultTerms ?? [] });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Results" description="Active course progress and your completed-term transcript." />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-200">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setTab("active")}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                tab === "active" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Active Courses
            </button>
            <button
              type="button"
              onClick={() => setTab("previous")}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                tab === "previous" ? "border-rose-600 text-rose-700" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Previous Courses
            </button>
          </div>
          <button
            onClick={() => window.print()}
            className="mb-3 flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Printer size={16} /> Print Result Card
          </button>
        </div>

        {loading && <div className="text-sm text-slate-500">Loading results...</div>}
        {!loading && !data && <div className="text-sm text-red-500">Failed to load results.</div>}

        {!loading && data && tab === "active" && (
          data.activeCourses.length === 0 ? (
            <EmptyState message="No active courses this term." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.activeCourses.map((c) => (
                <ResultActiveCourseCard key={c.id} item={c} />
              ))}
            </div>
          )
        )}

        {!loading && data && tab === "previous" && <PreviousCoursesTable terms={data.resultTerms} />}
      </div>
    </div>
  );
}
