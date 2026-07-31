"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function getTodayMakeupClasses() {
  try {
    const classes = await prisma.makeupClass.findMany({
      include: {
        section: { include: { course: true } },
      },
    });
    
    // Filter for today's date
    const todayStr = new Date().toISOString().split("T")[0];
    const todaysClasses = classes.filter(c => new Date(c.date).toISOString().split("T")[0] === todayStr);
    
    return JSON.parse(JSON.stringify(todaysClasses));
  } catch (error) {
    console.error("Failed to fetch today's makeup classes:", error);
    return [];
  }
}

export async function getTeacherSections() {
  try {
    const session = await getSession();
    if (!session || session.role !== "teacher") return [];

    const teacher = await prisma.teacher.findUnique({
      where: { id: session.teacherId },
      include: {
        sections: {
          include: {
            course: true,
          }
        }
      }
    });

    return JSON.parse(JSON.stringify(teacher?.sections || []));
  } catch (error) {
    console.error("Failed to fetch teacher sections:", error);
    return [];
  }
}
