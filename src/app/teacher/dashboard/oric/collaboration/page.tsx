import { Users } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Collaboration"
      description="Manage your collaboration information."
      icon={Users}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Collaboration."
    />
  );
}
