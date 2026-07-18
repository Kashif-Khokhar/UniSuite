"use client";

import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import MockForm from "@/components/shared/MockForm";
import EmptyState from "@/components/shared/EmptyState";
import { getRequestTypeBySlug } from "@/lib/request-types";

export default function RequestTypePage() {
  const params = useParams<{ slug: string }>();
  const requestType = getRequestTypeBySlug(params.slug);

  if (!requestType) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Request" description="This request type could not be found." />
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <EmptyState message="Unknown request type." />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <PageHeader title={requestType.title} description={requestType.description} />
      <MockForm
        referencePrefix="REQ"
        submitLabel="Submit Request"
        fields={requestType.fields}
      />
    </div>
  );
}
