import { Building2 } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="CMACED"
      description="Manage your cmaced information."
      icon={Building2}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for CMACED."
    />
  );
}
