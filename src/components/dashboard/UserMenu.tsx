"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, LogOut } from "lucide-react";

export default function UserMenu({
  studentName,
  avatarUrl,
}: {
  studentName: string;
  avatarUrl: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        title={studentName}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/30"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photo, not worth Image config */}
        <img src={avatarUrl} alt={studentName} className="h-full w-full object-cover" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl">
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <User size={16} className="text-slate-400" />
              My Profile
            </Link>
            <Link
              href="/dashboard/change-password"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Lock size={16} className="text-slate-400" />
              Change Password
            </Link>
            <div className="my-1.5 border-t border-slate-100" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 transition-colors hover:bg-rose-50"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
