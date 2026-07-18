import { Building2 } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function CmacedPage() {
  return (
    <ModuleEmptyPage
      title="CMACED"
      description="University center programs and activities."
      icon={Building2}
      emptyTitle="Not Applicable"
      emptyMessage="You are not currently enrolled in any CMACED center programs."
    />
  );
}
