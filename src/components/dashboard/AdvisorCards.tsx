import { Mail } from "lucide-react";
import AccentCard from "./AccentCard";

interface Person {
  name: string;
  email: string;
}

const ADVISOR: Person = { name: "Dr. Ayesha Malik", email: "ayesha.malik@university.edu.pk" };
const SUPERVISOR: Person = { name: "Mr. Usman Farooq", email: "usman.farooq@university.edu.pk" };

function PersonCard({ label, person }: { label: string; person: Person }) {
  const initials = person.name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AccentCard title={label} className="flex-1">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{person.name}</p>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Mail size={12} /> {person.email}
          </p>
        </div>
      </div>
    </AccentCard>
  );
}

export default function AdvisorCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <PersonCard label="Student Success Advisor" person={ADVISOR} />
      <PersonCard label="Supervisor" person={SUPERVISOR} />
    </div>
  );
}
