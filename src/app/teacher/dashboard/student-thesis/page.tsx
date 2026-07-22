import { BookMarked } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Student Thesis"
      description="Manage your student thesis information."
      icon={BookMarked}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Student Thesis."
    />
  );
}
