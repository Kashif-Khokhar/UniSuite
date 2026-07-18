import { FolderKanban } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function StudentProjectsPage() {
  return (
    <ModuleEmptyPage
      title="Student Projects"
      description="Track your final year and semester project submissions."
      icon={FolderKanban}
      emptyTitle="No Projects Registered"
      emptyMessage="You have not registered any semester or final year project yet."
    />
  );
}
