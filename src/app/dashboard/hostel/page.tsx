import { BedDouble } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function HostelPage() {
  return (
    <ModuleEmptyPage
      title="Hostel"
      description="Manage your hostel accommodation and room allocation."
      icon={BedDouble}
      emptyTitle="No Hostel Allocation"
      emptyMessage="You are not currently registered for on-campus hostel accommodation."
    />
  );
}
