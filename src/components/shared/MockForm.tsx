"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import AccentCard from "@/components/dashboard/AccentCard";

export interface MockFormField {
  name: string;
  label: string;
  type: "course-select" | "term-select" | "text" | "textarea" | "password";
  required?: boolean;
  placeholder?: string;
}

interface Course {
  id: string;
  code: string;
  name: string;
}

const TERM_OPTIONS = ["Fall 2026", "Spring 2027", "Summer 2027"];

// Custom Select Component to allow green hover styling on options
function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full cursor-pointer rounded-lg border bg-white px-3 py-2.5 text-sm flex items-center justify-between transition-colors ${
          isOpen
            ? "border-brand-500 ring-2 ring-brand-100 text-slate-900"
            : "border-slate-300 text-slate-900 hover:border-slate-400"
        }`}
      >
        <span className={!value ? "text-slate-500" : ""}>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl max-h-60 overflow-y-auto">
          {options.length === 0 && (
            <div className="px-3 py-2.5 text-sm text-slate-500">Loading...</div>
          )}
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-1.5 text-sm cursor-pointer transition-colors ${
                value === opt.value
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-slate-700 hover:bg-brand-600 hover:text-white"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MockForm({
  fields,
  submitLabel = "Submit Request",
  referencePrefix = "REQ",
  showReference = true,
  successTitle = "Request Submitted",
  successMessage = "This is a demo submission and is not persisted or sent to the registrar.",
}: {
  fields: MockFormField[];
  submitLabel?: string;
  referencePrefix?: string;
  showReference?: boolean;
  successTitle?: string;
  successMessage?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const needsCourses = fields.some((f) => f.type === "course-select");

  useEffect(() => {
    if (!needsCourses) return;
    fetch("/api/academics", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setCourses(json.courses ?? []));
  }, [needsCourses]);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ref = `${referencePrefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmitted(ref);
    setValues({});
  }

  if (submitted) {
    return (
      <AccentCard>
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-base font-semibold text-slate-900">{successTitle}</p>
          {showReference && (
            <p className="text-sm text-slate-500">
              Reference No: <span className="font-medium text-slate-700">{submitted}</span>
            </p>
          )}
          <p className="max-w-sm text-xs text-slate-400">{successMessage}</p>
          <button
            onClick={() => setSubmitted(null)}
            className="mt-2 rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Submit Another
          </button>
        </div>
      </AccentCard>
    );
  }

  return (
    <AccentCard>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              {field.label}
            </label>
            {field.type === "course-select" && (
              <CustomSelect
                value={values[field.name] ?? ""}
                onChange={(val) => handleChange(field.name, val)}
                placeholder="Select a course"
                options={courses.map((c) => ({
                  value: c.code,
                  label: `${c.code} · ${c.name}`,
                }))}
              />
            )}
            {field.type === "term-select" && (
              <CustomSelect
                value={values[field.name] ?? ""}
                onChange={(val) => handleChange(field.name, val)}
                placeholder="Select a term"
                options={TERM_OPTIONS.map((t) => ({ value: t, label: t }))}
              />
            )}
            {field.type === "password" && (
              <input
                type="password"
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            )}
            {field.type === "text" && (
              <input
                type="text"
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            )}
            {field.type === "textarea" && (
              <textarea
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          // Disable if a course/term select field is required but not filled
          disabled={fields.some(
            (f) =>
              f.required &&
              (f.type === "course-select" || f.type === "term-select") &&
              !values[f.name]
          )}
          className="mt-1 self-start rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </form>
    </AccentCard>
  );
}
