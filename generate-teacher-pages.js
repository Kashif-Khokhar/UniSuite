const fs = require('fs');
const path = require('path');

const pages = [
  { path: "profile/home", title: "Home", icon: "User" },
  { path: "profile/family", title: "Family", icon: "Users" },
  { path: "profile/next-of-kin", title: "Next of Kin", icon: "UserCircle" },
  { path: "profile/passport", title: "Passport", icon: "FileText" },
  { path: "profile/academics", title: "Academics", icon: "GraduationCap" },
  { path: "profile/experience", title: "Experience", icon: "Briefcase" },
  { path: "profile/skills", title: "Skills", icon: "Wrench" },
  { path: "profile/certifications", title: "Certifications", icon: "Award" },
  { path: "attendance", title: "Attendance", icon: "CalendarCheck2" },
  { path: "results/assessments", title: "Assessments", icon: "FileEdit" },
  { path: "results/grades", title: "Grades", icon: "BarChart3" },
  { path: "schedule/timetable", title: "Time Table", icon: "Clock" },
  { path: "schedule/create-makeup", title: "Create Makeup Class", icon: "CalendarPlus" },
  { path: "pms", title: "PMS", icon: "Cloud" },
  { path: "notifications", title: "Notifications", icon: "Bell" },
  { path: "lms", title: "LMS", icon: "Cloud" },
  { path: "calendars", title: "Calendars", icon: "Calendar" },
  { path: "regulations", title: "Regulations", icon: "List" },
  { path: "sirc", title: "SIRC", icon: "Mic" },
  { path: "student-thesis", title: "Student Thesis", icon: "BookMarked" },
  { path: "student-projects", title: "Student Projects", icon: "FolderKanban" },
  { path: "feedback/survey", title: "Survey", icon: "MessageSquareWarning" },
  { path: "cmaced", title: "CMACED", icon: "Building2" },
  { path: "oric/grants", title: "Internal & External Grants", icon: "Coins" },
  { path: "oric/publications", title: "Research Publication", icon: "BookOpen" },
  { path: "oric/accounts", title: "Research Accounts", icon: "Wallet" },
  { path: "oric/consultancy", title: "Consultancy Project", icon: "Briefcase" },
  { path: "oric/collaboration", title: "Collaboration", icon: "Users" },
  { path: "ms-thesis/details", title: "MS Thesis", icon: "GraduationCap" },
];

pages.forEach(page => {
  const dir = path.join(__dirname, 'src/app/teacher/dashboard', page.path);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'page.tsx');
  
  const content = `import { ${page.icon} } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="${page.title}"
      description="Manage your ${page.title.toLowerCase()} information."
      icon={${page.icon}}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for ${page.title}."
    />
  );
}
`;
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log(`Created ${file}`);
  } else {
    console.log(`Skipped ${file}`);
  }
});
