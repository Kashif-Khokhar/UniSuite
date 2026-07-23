import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If not logged in, or not an admin, redirect to admin login
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  // Admin name can be extracted from session or DB. Since we hardcoded the login, 
  // we just use a static "Administrator" or similar.
  const adminName = "System Administrator";

  return (
    <AdminDashboardShell adminName={adminName}>
      {children}
    </AdminDashboardShell>
  );
}
