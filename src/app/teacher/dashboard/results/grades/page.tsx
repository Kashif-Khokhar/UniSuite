import { BarChart3 } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Grades"
      description="Manage your grades information."
      icon={BarChart3}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Grades."
    />
  );
}
