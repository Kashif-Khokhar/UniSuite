import { Bell, CalendarClock, Wallet, GraduationCap, LucideIcon } from "lucide-react";

export interface NotificationItem {
  icon: LucideIcon;
  title: string;
  body: string;
  date: string;
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    icon: CalendarClock,
    title: "Mid-Term Exam Schedule Released",
    body: "The mid-term examination schedule for the current semester has been published. Check the Time Table page for your slots.",
    date: "2026-07-10",
  },
  {
    icon: Wallet,
    title: "Fee Challan Due Reminder",
    body: "Your fee challan for June 2026 is overdue. Please clear your outstanding balance to avoid a late fee surcharge.",
    date: "2026-07-05",
  },
  {
    icon: GraduationCap,
    title: "Course Add/Drop Deadline",
    body: "The last date to add or drop a course for this semester is approaching. See Enrollment Schedules for details.",
    date: "2026-06-28",
  },
  {
    icon: Bell,
    title: "Semester Break Announcement",
    body: "The university will remain closed from July 20 to July 27 for the semester break. Classes resume July 28.",
    date: "2026-06-20",
  },
];
