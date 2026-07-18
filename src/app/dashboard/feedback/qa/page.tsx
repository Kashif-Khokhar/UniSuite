import PageHeader from "@/components/shared/PageHeader";
import MockForm from "@/components/shared/MockForm";

export default function QaFeedbackPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <PageHeader
        title="QA Feedback"
        description="Share feedback on course quality and instruction for the current semester."
      />
      <MockForm
        referencePrefix="FDBK"
        submitLabel="Submit Feedback"
        fields={[
          { name: "course", label: "Course", type: "course-select", required: true },
          {
            name: "rating",
            label: "Overall Rating (1–5)",
            type: "text",
            placeholder: "e.g. 4",
            required: true,
          },
          {
            name: "comments",
            label: "Comments",
            type: "textarea",
            placeholder: "Share your thoughts on the course and instruction quality...",
            required: true,
          },
        ]}
      />
    </div>
  );
}
