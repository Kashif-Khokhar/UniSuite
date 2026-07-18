import PageHeader from "@/components/shared/PageHeader";
import AccentCard from "@/components/dashboard/AccentCard";
import { Th, Td } from "@/components/shared/Table";

const SCHEDULE_EVENTS = [
  { event: "Course Registration Opens", date: "2026-07-20" },
  { event: "Course Registration Closes", date: "2026-07-27" },
  { event: "Add / Drop Deadline", date: "2026-08-03" },
  { event: "Classes Begin", date: "2026-08-10" },
  { event: "Mid-Term Examinations", date: "2026-09-28 – 2026-10-04" },
  { event: "Withdrawal Deadline", date: "2026-10-16" },
  { event: "Final Examinations", date: "2026-12-07 – 2026-12-18" },
];

export default function EnrollmentSchedulesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Enrollment Schedules"
        description="Key dates for course registration and the upcoming academic term."
      />

      <AccentCard>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <Th>Event</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SCHEDULE_EVENTS.map((row) => (
              <tr key={row.event} className="hover:bg-slate-50">
                <Td className="font-medium text-slate-900">{row.event}</Td>
                <Td>{row.date}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </AccentCard>
    </div>
  );
}
