import { Award } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Certifications"
      description="Manage your certifications information."
      icon={Award}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Certifications."
    />
  );
}
