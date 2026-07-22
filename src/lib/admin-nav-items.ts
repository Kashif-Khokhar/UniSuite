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
} from "lucide-react";
import { NavItem } from "./nav-items";

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { type: "link", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { type: "link", label: "Students", href: "/admin/dashboard/students", icon: User }, // Was Profile
  { type: "link", label: "Courses", href: "/admin/dashboard/courses", icon: BookMarked }, // Added Manage Courses
  { type: "link", label: "Attendance", href: "/admin/dashboard/attendance", icon: CalendarCheck2 },
  { type: "link", label: "Results & Exams", href: "/admin/dashboard/results", icon: BarChart3 },
  { type: "link", label: "Notifications", href: "/admin/dashboard/notifications", icon: Bell },
  {
    type: "group",
    label: "Enrollments",
    icon: Briefcase,
    children: [
      { label: "Enrolled Courses", href: "/admin/dashboard/enrollments/academics" },
      { label: "Self Enrollment", href: "/admin/dashboard/enrollments/self" },
      { label: "Enrollment Schedules", href: "/admin/dashboard/enrollments/schedules" },
    ],
  },
  {
    type: "group",
    label: "Feedback",
    icon: MessageSquareWarning,
    children: [{ label: "QA Feedback", href: "/admin/dashboard/feedback/qa" }],
  },
  {
    type: "group",
    label: "Requests",
    icon: Upload,
    children: [
      { label: "Course Drop", href: "/admin/dashboard/requests/course-drop" },
      { label: "Alternative Course Enrollments", href: "/admin/dashboard/requests/alternative-course-enrollment" },
      { label: "I Grade Request", href: "/admin/dashboard/requests/i-grade-request" },
      { label: "Final Degree", href: "/admin/dashboard/requests/final-degree" },
      { label: "Transcript", href: "/admin/dashboard/requests/transcript" },
      { label: "Defer Term", href: "/admin/dashboard/requests/defer-term" },
      { label: "Term Resume", href: "/admin/dashboard/requests/term-resume" },
      { label: "Retest", href: "/admin/dashboard/requests/retest" },
    ],
  },
  { type: "link", label: "Time Table", href: "/admin/dashboard/timetable", icon: Clock },
  { type: "link", label: "Student Support Office", href: "/admin/dashboard/support", icon: LifeBuoy },
  { type: "link", label: "Print Exam Slip", href: "/admin/dashboard/exam-slip", icon: Printer },
  { type: "link", label: "Invoices", href: "/admin/dashboard/finance", icon: Wallet },
  { type: "link", label: "Hostel", href: "/admin/dashboard/hostel", icon: BedDouble },
  { type: "link", label: "Student Thesis", href: "/admin/dashboard/student-thesis", icon: BookMarked },
  { type: "link", label: "Student Projects", href: "/admin/dashboard/student-projects", icon: FolderKanban },
  { type: "link", label: "CMACED", href: "/admin/dashboard/cmaced", icon: Building2 },
  { type: "link", label: "MS Thesis", href: "/admin/dashboard/ms-thesis", icon: GraduationCap },
];
