import { Mic } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="SIRC"
      description="Manage your sirc information."
      icon={Mic}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for SIRC."
    />
  );
}
