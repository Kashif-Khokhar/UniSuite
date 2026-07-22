import { Clock } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Time Table"
      description="Manage your time table information."
      icon={Clock}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Time Table."
    />
  );
}
