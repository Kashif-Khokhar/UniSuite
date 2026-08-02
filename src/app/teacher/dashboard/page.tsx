import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import TeacherDashboardClient from "./TeacherDashboardClient";

export default async function TeacherDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "teacher") {
    redirect("/login");
  }

  const teacher = await prisma.teacher.findUnique({
    where: { id: session.teacherId },
    include: {
      sections: {
        include: {
          course: true,
          enrollments: true,
        }
      }
    }
  });

  if (!teacher) redirect("/login");

  return <TeacherDashboardClient teacher={teacher} />;
}
