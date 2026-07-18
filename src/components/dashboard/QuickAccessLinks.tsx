import Link from "next/link";
import { BookOpen, Wallet, CalendarCheck2, User, ArrowRight, LucideIcon } from "lucide-react";

const LINKS: { label: string; href: string; icon: LucideIcon; gradient: string }[] = [
  {
    label: "Academics",
    href: "/dashboard/academics",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    label: "Finance",
    href: "/dashboard/finance",
    icon: Wallet,
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    label: "Attendance",
    href: "/dashboard/academics?tab=Attendance",
    icon: CalendarCheck2,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
    gradient: "from-rose-500 to-red-500",
  },
];

export default function QuickAccessLinks() {
  return (
    <div className="rounded-2xl border border-slate-200 border-l-4 border-l-brand-600 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Quick Access</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r ${link.gradient} px-4 py-3.5 text-white shadow-sm transition-transform hover:scale-[1.02]`}
            >
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Icon size={18} />
                {link.label}
              </span>
              <ArrowRight size={16} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
