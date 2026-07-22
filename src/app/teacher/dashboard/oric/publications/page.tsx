import { BookOpen } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Research Publication"
      description="Manage your research publication information."
      icon={BookOpen}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Research Publication."
    />
  );
}
