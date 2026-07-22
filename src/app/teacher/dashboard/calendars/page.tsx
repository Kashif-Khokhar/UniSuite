import { Calendar } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Calendars"
      description="Manage your calendars information."
      icon={Calendar}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Calendars."
    />
  );
}
