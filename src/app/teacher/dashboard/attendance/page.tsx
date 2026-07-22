import { CalendarCheck2 } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Attendance"
      description="Manage your attendance information."
      icon={CalendarCheck2}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Attendance."
    />
  );
}
