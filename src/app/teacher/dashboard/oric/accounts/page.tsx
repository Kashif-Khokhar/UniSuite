import { Wallet } from "lucide-react";
import ModuleEmptyPage from "@/components/shared/ModuleEmptyPage";

export default function Page() {
  return (
    <ModuleEmptyPage
      title="Research Accounts"
      description="Manage your research accounts information."
      icon={Wallet}
      emptyTitle="No Data Found"
      emptyMessage="There is currently no information available for Research Accounts."
    />
  );
}
