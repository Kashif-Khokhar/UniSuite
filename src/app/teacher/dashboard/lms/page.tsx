import { Cloud } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="LMS"
      description="Manage your lms information."
      icon={Cloud}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for LMS."
    />
  );
}
