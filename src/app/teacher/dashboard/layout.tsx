import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeacherDashboardShell from "@/components/teacher/TeacherDashboardShell";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
};

export default async function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "teacher") {
    if (session.role === "admin") redirect("/admin/dashboard");
    redirect("/dashboard");
  }

  const teacher = session.employeeId
    ? await prisma.teacher.findUnique({ where: { employeeId: session.employeeId } })
    : null;

  return (
    <TeacherDashboardShell teacherName={teacher?.name ?? "Teacher"}>
      {children}
    </TeacherDashboardShell>
  );
}
