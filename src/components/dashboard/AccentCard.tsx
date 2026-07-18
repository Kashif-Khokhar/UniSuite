export default function AccentCard({
  title,
  accent = "brand",
  className = "",
  children,
}: {
  title?: string;
  accent?: "brand" | "slate";
  className?: string;
  children: React.ReactNode;
}) {
  const borderColor = accent === "brand" ? "border-l-brand-600" : "border-l-slate-300";
  return (
    <div
      className={`rounded-2xl border border-slate-200 border-l-4 ${borderColor} bg-white p-5 shadow-sm ${className}`}
    >
      {title && <h2 className="mb-4 text-base font-semibold text-slate-900">{title}</h2>}
      {children}
    </div>
  );
}
