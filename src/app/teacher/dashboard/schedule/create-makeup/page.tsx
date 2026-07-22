import { CalendarPlus } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Create Makeup Class"
      description="Manage your create makeup class information."
      icon={CalendarPlus}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Create Makeup Class."
    />
  );
}
