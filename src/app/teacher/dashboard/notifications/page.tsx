import { Bell } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Notifications"
      description="Manage your notifications information."
      icon={Bell}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Notifications."
    />
  );
}
