import { User } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Home"
      description="Manage your home information."
      icon={User}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Home."
    />
  );
}
