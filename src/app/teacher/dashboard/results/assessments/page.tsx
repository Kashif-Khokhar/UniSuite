import { FileEdit } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Assessments"
      description="Manage your assessments information."
      icon={FileEdit}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Assessments."
    />
  );
}
