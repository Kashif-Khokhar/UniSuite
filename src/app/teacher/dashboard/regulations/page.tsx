import { List } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Regulations"
      description="Manage your regulations information."
      icon={List}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Regulations."
    />
  );
}
