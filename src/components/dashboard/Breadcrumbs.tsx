"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { resolveBreadcrumb } from "@/lib/nav-items";

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;

  const trail = resolveBreadcrumb(pathname);

  return (
    <div className="sticky top-16 z-40 flex items-center gap-1.5 border-b border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm md:px-8">
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-brand-600"
      >
        <Home size={15} />
        {trail.length === 0 && <span className="font-medium text-slate-900">Home</span>}
      </Link>
      {trail.map((crumb, idx) => {
        const isLast = idx === trail.length - 1;
        return (
          <span key={`${crumb.label}-${idx}`} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-slate-300" />
            {crumb.href && !isLast ? (
              <Link href={crumb.href} className="text-slate-500 transition-colors hover:text-brand-600">
                {crumb.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-brand-600" : "text-slate-500"}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
