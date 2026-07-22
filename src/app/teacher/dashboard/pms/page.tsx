import { Cloud } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="PMS"
      description="Manage your pms information."
      icon={Cloud}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for PMS."
    />
  );
}
