import { Briefcase } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Consultancy Project"
      description="Manage your consultancy project information."
      icon={Briefcase}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Consultancy Project."
    />
  );
}
