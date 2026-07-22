import { FileText } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Passport"
      description="Manage your passport information."
      icon={FileText}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Passport."
    />
  );
}
