import { GraduationCap } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="MS Thesis"
      description="Manage your ms thesis information."
      icon={GraduationCap}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for MS Thesis."
    />
  );
}
