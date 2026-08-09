"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  ChevronDown, 
  Search,
  Bell,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";
import { NavGroupItem } from "@/lib/nav-items";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import { getAvatarUrl } from "@/lib/avatar";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toggledGroups, setToggledGroups] = useState<Set<string>>(new Set());
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const avatarUrl = getAvatarUrl(rollNumber);

  useEffect(() => {
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  function handleNavClick() {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }

  function renderNav() {
    return (
      <nav className="sidebar-scroll flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto mt-4">
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
                className={`flex items-center ${sidebarOpen ? 'gap-4 px-6' : 'justify-center px-0'} py-3.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "text-slate-500 hover:bg-brand-50 hover:text-brand-800"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          }

          const isOpen = isGroupOpen(item);
          const groupActive = isGroupActive(item);

          return (
            <div key={item.label} className="relative group">
              <button
                type="button"
                onClick={() => sidebarOpen && toggleGroup(item.label)}
                className={`flex w-full items-center ${sidebarOpen ? 'gap-4 px-6' : 'justify-center px-0'} py-3.5 text-sm font-medium transition-colors ${
                  groupActive
                    ? "text-brand-600 bg-brand-50/50"
                    : "text-slate-500 hover:bg-brand-50 hover:text-brand-800"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 truncate text-left">{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </>
                )}
              </button>
              {sidebarOpen && isOpen && (
                <div className="flex flex-col gap-0.5 bg-slate-50/30">
                  {item.children.map((child) => {
                    const isChildActive = pathname.startsWith(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleNavClick}
                        className={`pl-12 pr-6 py-2.5 text-sm transition-colors ${
                          isChildActive
                            ? "font-medium text-brand-600"
                            : "text-slate-500 hover:text-brand-800 hover:bg-brand-50/50"
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
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 self-start overflow-hidden border-r border-slate-200 bg-white transition-all duration-300 ease-in-out md:flex flex-col ${
          sidebarOpen ? "w-60" : "w-[80px]"
        }`}
      >
        <div className={`flex h-16 items-center px-6 border-b border-slate-200 ${!sidebarOpen ? 'justify-center px-0' : ''}`}>
           <div className="flex items-center gap-2">
             <div className="text-brand-600 shrink-0">
                <GraduationCap size={28} className="stroke-[2.5]" />
             </div>
             {sidebarOpen && (
               <div className="flex flex-col">
                 <span className="font-bold text-xl text-brand-800 leading-tight tracking-tight">UniSuite</span>
                 <span className="text-[10px] font-bold text-brand-500 tracking-widest uppercase">Student</span>
               </div>
             )}
           </div>
        </div>
        
        {renderNav()}

        {/* Collapse Button */}
        <div className="p-4 border-t border-slate-100 flex justify-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors w-full`}
            title={sidebarOpen ? "Collapse" : "Expand"}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center px-6 border-b border-slate-200">
           <div className="flex items-center gap-2">
             <div className="text-brand-600">
                <GraduationCap size={28} className="stroke-[2.5]" />
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-xl text-brand-800 leading-tight tracking-tight">UniSuite</span>
               <span className="text-[10px] font-bold text-brand-500 tracking-widest uppercase">Student</span>
             </div>
           </div>
        </div>
        {renderNav()}
      </aside>

      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-6 shadow-sm border-b border-slate-200">
          <div className="flex items-center gap-4 flex-1">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex md:hidden items-center text-slate-500 hover:text-slate-800 transition-colors"
              >
                <Menu size={24} />
              </button>
            )}
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full max-w-md focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600 transition-all">
              <Search size={18} className="text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search globally..." 
                className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">

            
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative p-2 rounded-full transition-colors ${notificationsOpen ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
              >
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-white">
                  3
                </span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                    <button className="text-sm font-medium text-brand-600 hover:text-brand-800">
                      Mark all as read
                    </button>
                  </div>
                  <div className="flex flex-col max-h-[400px] overflow-y-auto">
                    {/* Notification Item 1 */}
                    <div className="flex flex-col gap-1 px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="font-medium text-brand-600">Assignment Graded</p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Your submission for Data Structures has been graded.
                      </p>
                      <p className="text-sm font-medium text-brand-600 mt-1">2 hours ago</p>
                    </div>
                    {/* Notification Item 2 */}
                    <div className="flex flex-col gap-1 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="font-medium text-slate-800">Registration Open</p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Course registration for the upcoming semester is now open.
                      </p>
                      <p className="text-sm font-medium text-slate-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 p-0.5 pr-2 rounded-full transition-all border-2 ${profileOpen ? 'border-brand-800 bg-white' : 'border-transparent hover:bg-slate-50'}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl} alt={studentName} className="h-full w-full object-cover" />
                </div>
                <ChevronDown size={14} className="text-slate-600 hidden sm:block" />
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900 truncate">{studentName}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">Student</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      href="/dashboard/profile"
                      className="group flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                    >
                      <User size={16} className="text-slate-400 group-hover:text-brand-800 transition-colors" />
                      View Profile
                    </Link>
                    <Link 
                      href="/logout"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} className="text-red-500" />
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <Breadcrumbs />
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
