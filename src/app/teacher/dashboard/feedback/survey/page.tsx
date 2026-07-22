import { MessageSquareWarning } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Survey"
      description="Manage your survey information."
      icon={MessageSquareWarning}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Survey."
    />
  );
}
