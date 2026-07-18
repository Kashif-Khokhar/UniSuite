import { GraduationCap } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function MsThesisPage() {
  return (
    <ModuleEmptyPage
      title="MS Thesis"
      description="Track graduate-level thesis submission and evaluation."
      icon={GraduationCap}
      emptyTitle="Not Applicable"
      emptyMessage="MS Thesis tracking applies to graduate students only. Your current program is BS Computer Science."
    />
  );
}
