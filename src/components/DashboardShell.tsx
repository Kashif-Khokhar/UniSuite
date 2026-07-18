"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ArrowLeftFromLine, Maximize2, Minimize2 } from "lucide-react";
import { NAV_ITEMS, NavGroupItem } from "@/lib/nav-items";
import { getAvatarUrl } from "@/lib/avatar";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import QuickLauncher from "@/components/dashboard/QuickLauncher";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import UserMenu from "@/components/dashboard/UserMenu";

function UniversitySeal({ size = 30 }: { size?: number }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 360) / 16;
    return (
      <line
        key={i}
        x1="16"
        y1="16"
        x2="16"
        y2="5"
        stroke="currentColor"
        strokeWidth="1"
        opacity={i % 2 === 0 ? 0.9 : 0.5}
        transform={`rotate(${angle} 16 16)`}
      />
    );
  });
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0 text-white">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.75" opacity={0.6} />
      {rays}
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

export default function DashboardShell({
  studentName,
  rollNumber,
  children,
}: {
  studentName: string;
  rollNumber: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const avatarUrl = getAvatarUrl(rollNumber);
  // Single source of truth for sidebar visibility, toggled from the navbar —
  // an overlay drawer on mobile, a persistent panel on desktop. Closed means
  // fully hidden, not just narrowed to icons.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Labels the user has explicitly toggled, overriding the route-derived default.
  const [toggledGroups, setToggledGroups] = useState<Set<string>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  function isGroupActive(item: NavGroupItem) {
    return item.children.some((c) => pathname.startsWith(c.href));
  }

  function isGroupOpen(item: NavGroupItem) {
    const manuallyToggled = toggledGroups.has(item.label);
    return isGroupActive(item) ? !manuallyToggled : manuallyToggled;
  }

  function toggleGroup(label: string) {
    setToggledGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  // Auto-close the sidebar whenever a destination is picked, on every screen size.
  function handleNavClick() {
    setSidebarOpen(false);
  }

  function renderStudentBanner() {
    return (
      <div className="mb-6 flex flex-col items-center gap-3 bg-gradient-to-br from-brand-700 to-brand-600 px-4 py-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photo, not worth Image config */}
        <img
          src={avatarUrl}
          alt={studentName}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-white/30"
        />
        <div>
          <p className="text-sm font-semibold text-white">{studentName}</p>
          <p className="text-xs text-brand-100">{rollNumber}</p>
        </div>
      </div>
    );
  }

  function renderNav() {
    return (
      <nav className="sidebar-scroll flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          if (item.type === "link") {
            const isActive =
              item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          }

          const isOpen = isGroupOpen(item);
          const groupActive = isGroupActive(item);

          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => toggleGroup(item.label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  groupActive
                    ? "text-brand-700"
                    : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="flex-1 truncate text-left">{item.label}</span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="ml-4 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                  {item.children.map((child) => {
                    const isChildActive = pathname.startsWith(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleNavClick}
                        className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                          isChildActive
                            ? "bg-brand-50 font-medium text-brand-700"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar — always mounted so the width change animates;
          overflow-hidden clips the fixed-width inner panel as it collapses
          to 0 instead of the content reflowing/wrapping mid-transition. */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 self-start overflow-hidden border-slate-200 bg-white transition-all duration-300 ease-in-out md:flex ${
          sidebarOpen ? "w-60 border-r" : "w-0 border-r-0"
        }`}
      >
        <div className="flex h-full w-60 shrink-0 flex-col pb-6">
          {renderStudentBanner()}
          {renderNav()}
        </div>
      </aside>

      {/* Mobile sidebar overlay — slides in BELOW the fixed-height header
          (top-16) rather than covering it, so the header's toggle button
          stays visible and clickable (as a collapse arrow) the whole time
          the drawer is open, instead of being hidden under the panel. Both
          the backdrop and panel stay mounted and animate via
          opacity/transform so closing transitions too, not just opening. */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-30 bg-black/30 transition-opacity duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed left-0 top-16 z-[45] flex h-[calc(100vh-4rem)] w-60 flex-col overflow-hidden bg-white pb-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderStudentBanner()}
        {renderNav()}
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-gradient-to-r from-brand-700 to-brand-600 px-4 shadow-sm md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              className="flex items-center text-white"
            >
              {sidebarOpen ? <ArrowLeftFromLine size={22} /> : <Menu size={22} />}
            </button>
            <QuickLauncher />
            <div className="hidden items-center gap-3 border-l border-white/25 pl-4 sm:flex">
              <UniversitySeal size={30} />
              <span className="font-serif text-sm font-semibold leading-tight tracking-wide text-white">
                MERIDIAN
                <br />
                UNIVERSITY
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="hidden items-center text-white sm:flex"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <NotificationsPanel />
            <UserMenu studentName={studentName} avatarUrl={avatarUrl} />
          </div>
        </header>
        <Breadcrumbs />
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
