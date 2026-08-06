"use client";

import { useTransition } from "react";
import { deleteSection } from "../../../actions";
import EditSectionModal from "./EditSectionModal";
import EnrollStudentModal from "./EnrollStudentModal";
import { Section } from "@prisma/client";

interface Props {
  section: Section;
  teachers: { id: string; name: string; employeeId: string }[];
}

export default function SectionActionButtons({ section, teachers }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <EnrollStudentModal sectionId={section.id} />
      <div className="flex gap-2">
        <EditSectionModal section={section} teachers={teachers} />
        <button
          disabled={isPending}
          onClick={() => {
            if (confirm("Are you sure you want to delete this section? This will also remove enrollments.")) {
              startTransition(() => {
                deleteSection(section.id);
              });
            }
          }}
          className="flex-1 rounded-md border border-rose-200 bg-rose-50 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
