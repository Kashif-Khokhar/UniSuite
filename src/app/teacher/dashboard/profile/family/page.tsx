import { Users } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Family"
      description="Manage your family information."
      icon={Users}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Family."
    />
  );
}
