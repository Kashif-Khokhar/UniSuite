import { Coins } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Internal & External Grants"
      description="Manage your internal & external grants information."
      icon={Coins}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Internal & External Grants."
    />
  );
}
