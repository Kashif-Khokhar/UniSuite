import { Wrench } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Skills"
      description="Manage your skills information."
      icon={Wrench}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Skills."
    />
  );
}
