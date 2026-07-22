import { FolderKanban } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Student Projects"
      description="Manage your student projects information."
      icon={FolderKanban}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Student Projects."
    />
  );
}
