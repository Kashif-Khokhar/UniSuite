import { UserCircle } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Next of Kin"
      description="Manage your next of kin information."
      icon={UserCircle}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Next of Kin."
    />
  );
}
