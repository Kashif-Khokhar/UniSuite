import AccentCard from "./AccentCard";

export default function AcademicProgressRing({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <AccentCard title="Academic Progress" className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative h-[150px] w-[150px]">
          <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
            <circle cx="75" cy="75" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="14" />
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="var(--color-brand-600)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-semibold text-slate-900">{percentage}%</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-900">
          {completed} / {total}
        </p>
        <p className="text-xs text-slate-500">Credits Completed</p>
      </div>
    </AccentCard>
  );
}
