import { LucideIcon } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import AccentCard from "@/components/dashboard/AccentCard";
import EmptyState from "@/components/shared/EmptyState";

export default function ModuleEmptyPage({
  title,
  description,
  icon,
  emptyTitle,
  emptyMessage,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyMessage: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={title} description={description} />
      <AccentCard>
        <EmptyState icon={icon} title={emptyTitle} message={emptyMessage} />
      </AccentCard>
    </div>
  );
}
