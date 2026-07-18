import { MockFormField } from "@/components/shared/MockForm";

export interface RequestTypeConfig {
  slug: string;
  title: string;
  description: string;
  fields: MockFormField[];
}

export const REQUEST_TYPES: RequestTypeConfig[] = [
  {
    slug: "course-drop",
    title: "Course Drop",
    description: "Request to drop an enrolled course for the current semester.",
    fields: [
      { name: "course", label: "Course to Drop", type: "course-select", required: true },
      { name: "reason", label: "Reason", type: "textarea", required: true },
    ],
  },
  {
    slug: "alternative-course-enrollment",
    title: "Alternative Course Enrollment",
    description: "Request enrollment in an alternative course in place of a current one.",
    fields: [
      { name: "currentCourse", label: "Current Course", type: "course-select", required: true },
      {
        name: "alternativeCourse",
        label: "Requested Alternative Course",
        type: "text",
        placeholder: "e.g. CS360 - Web Engineering",
        required: true,
      },
      { name: "reason", label: "Reason", type: "textarea", required: true },
    ],
  },
  {
    slug: "i-grade-request",
    title: "I-Grade Request",
    description: "Request an Incomplete (I) grade for a course due to exceptional circumstances.",
    fields: [
      { name: "course", label: "Course", type: "course-select", required: true },
      { name: "reason", label: "Reason for Incomplete", type: "textarea", required: true },
    ],
  },
  {
    slug: "final-degree",
    title: "Final Degree Request",
    description: "Request processing of your final degree certificate after completing all program requirements.",
    fields: [
      {
        name: "notes",
        label: "Additional Notes",
        type: "textarea",
        placeholder: "Any additional information for the registrar office...",
      },
    ],
  },
  {
    slug: "transcript",
    title: "Official Transcript Request",
    description: "Request an official copy of your academic transcript.",
    fields: [
      {
        name: "copies",
        label: "Number of Copies",
        type: "text",
        placeholder: "e.g. 2",
        required: true,
      },
      {
        name: "purpose",
        label: "Purpose",
        type: "textarea",
        placeholder: "e.g. Higher education application, employer verification...",
        required: true,
      },
    ],
  },
  {
    slug: "defer-term",
    title: "Defer Term",
    description: "Request to defer your enrollment for the upcoming term.",
    fields: [
      { name: "term", label: "Term to Defer", type: "term-select", required: true },
      { name: "reason", label: "Reason", type: "textarea", required: true },
    ],
  },
  {
    slug: "term-resume",
    title: "Term Resume",
    description: "Request to resume your studies after a deferred term.",
    fields: [
      { name: "term", label: "Term to Resume", type: "term-select", required: true },
      {
        name: "notes",
        label: "Additional Notes",
        type: "textarea",
        placeholder: "Any additional information for the registrar office...",
      },
    ],
  },
  {
    slug: "retest",
    title: "Retest Request",
    description: "Request a retest for a course exam.",
    fields: [
      { name: "course", label: "Course", type: "course-select", required: true },
      { name: "reason", label: "Reason", type: "textarea", required: true },
    ],
  },
];

export function getRequestTypeBySlug(slug: string) {
  return REQUEST_TYPES.find((r) => r.slug === slug);
}
