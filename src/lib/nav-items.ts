import {
  LayoutDashboard,
  Wallet,
  User,
  GraduationCap,
  CalendarCheck2,
  BarChart3,
  Bell,
  Briefcase,
  MessageSquareWarning,
  Upload,
  Clock,
  LifeBuoy,
  Printer,
  BedDouble,
  BookMarked,
  FolderKanban,
  Building2,
  LucideIcon,
} from "lucide-react";

export interface NavLinkItem {
  type: "link";
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroupItem {
  type: "group";
  label: string;
  icon: LucideIcon;
  children: { label: string; href: string }[];
}

export type NavItem = NavLinkItem | NavGroupItem;

export const NAV_ITEMS: NavItem[] = [
  { type: "link", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { type: "link", label: "Profile", href: "/dashboard/profile", icon: User },
  { type: "link", label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck2 },
  { type: "link", label: "Results & Exams", href: "/dashboard/results", icon: BarChart3 },
  { type: "link", label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  {
    type: "group",
    label: "Enrollments",
    icon: Briefcase,
    children: [
      { label: "Enrolled Courses", href: "/dashboard/academics" },
      { label: "Self Enrollment", href: "/dashboard/enrollments/self" },
      { label: "Enrollment Schedules", href: "/dashboard/enrollments/schedules" },
    ],
  },
  {
    type: "group",
    label: "Feedback",
    icon: MessageSquareWarning,
    children: [{ label: "QA Feedback", href: "/dashboard/feedback/qa" }],
  },
  {
    type: "group",
    label: "Requests",
    icon: Upload,
    children: [
      { label: "Course Drop", href: "/dashboard/requests/course-drop" },
      { label: "Alternative Course Enrollments", href: "/dashboard/requests/alternative-course-enrollment" },
      { label: "I Grade Request", href: "/dashboard/requests/i-grade-request" },
      { label: "Final Degree", href: "/dashboard/requests/final-degree" },
      { label: "Transcript", href: "/dashboard/requests/transcript" },
      { label: "Defer Term", href: "/dashboard/requests/defer-term" },
      { label: "Term Resume", href: "/dashboard/requests/term-resume" },
      { label: "Retest", href: "/dashboard/requests/retest" },
    ],
  },
  { type: "link", label: "Time Table", href: "/dashboard/timetable", icon: Clock },
  { type: "link", label: "Student Support Office", href: "/dashboard/support", icon: LifeBuoy },
  { type: "link", label: "Print Exam Slip", href: "/dashboard/exam-slip", icon: Printer },
  { type: "link", label: "Invoices", href: "/dashboard/finance", icon: Wallet },
  { type: "link", label: "Hostel", href: "/dashboard/hostel", icon: BedDouble },
  { type: "link", label: "Student Thesis", href: "/dashboard/student-thesis", icon: BookMarked },
  { type: "link", label: "Student Projects", href: "/dashboard/student-projects", icon: FolderKanban },
  { type: "link", label: "CMACED", href: "/dashboard/cmaced", icon: Building2 },
  { type: "link", label: "MS Thesis", href: "/dashboard/ms-thesis", icon: GraduationCap },
];

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

const SLUG_LABEL_OVERRIDES: Record<string, string> = {
  qa: "QA Feedback",
};

function humanizeSegment(segment: string) {
  return (
    SLUG_LABEL_OVERRIDES[segment] ??
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

/** Resolve a pathname to a breadcrumb trail using NAV_ITEMS, falling back to
 * humanized path segments for routes not present in the nav (e.g. dynamic
 * request-type pages already covered, but keeps this future-proof). */
export function resolveBreadcrumb(pathname: string): BreadcrumbCrumb[] {
  if (pathname === "/dashboard/attendance") {
    return [{ label: "Attendance Classes" }];
  }
  if (pathname === "/dashboard/results") {
    return [{ label: "Result Classes" }];
  }

  for (const item of NAV_ITEMS) {
    if (item.type === "link" && item.href === pathname) {
      return [{ label: item.label }];
    }
    if (item.type === "group") {
      const child = item.children.find((c) => c.href === pathname);
      if (child) {
        return [{ label: item.label }, { label: child.label }];
      }
    }
  }

  const segments = pathname.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean);

  if (segments[0] === "attendance" && segments.length === 2) {
    return [{ label: "Attendance Classes", href: "/dashboard/attendance" }, { label: "Attendance Class" }];
  }
  if (segments[0] === "results" && segments.length === 2) {
    return [{ label: "Result Classes", href: "/dashboard/results" }, { label: "Result Class" }];
  }

  return segments.map((segment) => ({ label: humanizeSegment(segment) }));
}
