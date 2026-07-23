import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardShell from "@/components/DashboardShell";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin") redirect("/admin/dashboard");
  if (session.role === "teacher") redirect("/teacher/dashboard");

  const student = await prisma.student.findUnique({
    where: { id: session.studentId },
    select: { name: true, rollNumber: true },
  });
  // Session cookie is cryptographically valid but points at a student that no
  // longer exists (e.g. the DB was re-seeded) — clear it via a Route Handler
  // (Server Components can't set/delete cookies) instead of redirecting
  // straight to /login, which middleware would just bounce back to /dashboard.
  if (!student) redirect("/logout");

  return (
    <DashboardShell studentName={student.name} rollNumber={student.rollNumber}>
      {children}
    </DashboardShell>
  );
}
