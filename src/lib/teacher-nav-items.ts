import {
  LayoutDashboard,
  User,
  CalendarCheck2,
  BarChart3,
  Clock,
  Cloud,
  Bell,
  Calendar,
  List,
  Mic,
  Shuffle,
  Pencil,
  MessageSquareWarning,
  Code,
  Bot,
  Briefcase
} from "lucide-react";
import { NavItem } from "./nav-items";

export const TEACHER_NAV_ITEMS: NavItem[] = [
  { type: "link", label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  {
    type: "group",
    label: "Profile",
    icon: User,
    children: [
      { label: "Home", href: "/teacher/dashboard/profile/home" },
      { label: "Family", href: "/teacher/dashboard/profile/family" },
      { label: "Next of Kin", href: "/teacher/dashboard/profile/next-of-kin" },
      { label: "Passport", href: "/teacher/dashboard/profile/passport" },
      { label: "Academics", href: "/teacher/dashboard/profile/academics" },
      { label: "Experience", href: "/teacher/dashboard/profile/experience" },
      { label: "Skills", href: "/teacher/dashboard/profile/skills" },
      { label: "Certifications", href: "/teacher/dashboard/profile/certifications" },
    ],
  },
  { type: "link", label: "Attendance", href: "/teacher/dashboard/attendance", icon: CalendarCheck2 },
  {
    type: "group",
    label: "Results",
    icon: BarChart3,
    children: [
      { label: "Assessments", href: "/teacher/dashboard/results/assessments" },
      { label: "Grades", href: "/teacher/dashboard/results/grades" },
    ],
  },
  {
    type: "group",
    label: "Class Schedule",
    icon: Clock,
    children: [
      { label: "Time Table", href: "/teacher/dashboard/schedule/timetable" },
      { label: "Create Makeup Class", href: "/teacher/dashboard/schedule/create-makeup" },
    ],
  },
  { type: "link", label: "PMS", href: "/teacher/dashboard/pms", icon: Cloud },
  { type: "link", label: "Notifications", href: "/teacher/dashboard/notifications", icon: Bell },
  { type: "link", label: "LMS", href: "/teacher/dashboard/lms", icon: Cloud },
  { type: "link", label: "Calendars", href: "/teacher/dashboard/calendars", icon: Calendar },
  { type: "link", label: "Regulations", href: "/teacher/dashboard/regulations", icon: List },
  { type: "link", label: "SIRC", href: "/teacher/dashboard/sirc", icon: Mic },
  { type: "link", label: "Student Thesis", href: "/teacher/dashboard/student-thesis", icon: Shuffle },
  { type: "link", label: "Student Projects", href: "/teacher/dashboard/student-projects", icon: Pencil },
  {
    type: "group",
    label: "Feedback",
    icon: MessageSquareWarning,
    children: [
      { label: "Survey", href: "/teacher/dashboard/feedback/survey" },
    ],
  },
  { type: "link", label: "CMACED", href: "/teacher/dashboard/cmaced", icon: Code },
  {
    type: "group",
    label: "ORIC",
    icon: Bot,
    children: [
      { label: "Internal & External Grants", href: "/teacher/dashboard/oric/grants" },
      { label: "Research Publication", href: "/teacher/dashboard/oric/publications" },
      { label: "Research Accounts", href: "/teacher/dashboard/oric/accounts" },
      { label: "Consultancy Project", href: "/teacher/dashboard/oric/consultancy" },
      { label: "Collaboration", href: "/teacher/dashboard/oric/collaboration" },
    ],
  },
  {
    type: "group",
    label: "MS Thesis",
    icon: Briefcase,
    children: [
      { label: "MS Thesis", href: "/teacher/dashboard/ms-thesis/details" },
    ],
  },
];
