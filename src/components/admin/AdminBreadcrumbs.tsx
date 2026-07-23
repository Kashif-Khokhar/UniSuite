"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav-items";

function resolveAdminBreadcrumb(pathname: string) {
  for (const item of ADMIN_NAV_ITEMS) {
    if (item.type === "link" && item.href === pathname) {
      return [{ label: item.label }];
    }
    if (item.type === "group") {
      const child = item.children.find((c) => c.href === pathname);
      if (child) {
        return [{ label: item.label }, { label: child.label }];
      }
    }
  }

  const segments = pathname.replace(/^\/admin\/dashboard\/?/, "").split("/").filter(Boolean);
  return segments.map((segment) => ({ 
    label: segment.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") 
  }));
}

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/admin/dashboard") return null;

  const trail = resolveAdminBreadcrumb(pathname);

  return (
    <div className="sticky top-16 z-40 flex items-center gap-1.5 border-b border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm md:px-8">
      <Link
        href="/admin/dashboard"
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
            <span className={isLast ? "font-semibold text-brand-600" : "text-slate-500"}>
              {crumb.label}
            </span>
          </span>
        );
      })}
    </div>
  );
}
