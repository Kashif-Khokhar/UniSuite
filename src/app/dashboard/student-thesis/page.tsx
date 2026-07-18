import { BookMarked } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function StudentThesisPage() {
  return (
    <ModuleEmptyPage
      title="Student Thesis"
      description="Track your undergraduate thesis submission and evaluation."
      icon={BookMarked}
      emptyTitle="No Thesis Record"
      emptyMessage="Thesis registration typically opens in your final year. No thesis has been registered for your program yet."
    />
  );
}
