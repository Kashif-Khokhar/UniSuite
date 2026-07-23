"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: { code: true, name: true },
      orderBy: { code: "asc" },
    });
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Failed to fetch courses in server action:", error);
    return [];
  }
}

export async function createMakeupClass(prevState: any, formData: FormData) {
  try {
    const term = formData.get("term") as string;
    const dateStr = formData.get("date") as string;
    const courseId = formData.get("courseId") as string;
    const fromTime = formData.get("fromTime") as string;
    const toTime = formData.get("toTime") as string;

    if (!term || !dateStr || !courseId || !fromTime || !toTime) {
      return { error: "Please fill out all fields." };
    }

    const date = new Date(dateStr);

    await prisma.makeupClass.create({
      data: {
        term,
        date,
        courseId,
        fromTime,
        toTime,
      },
    });

    revalidatePath("/teacher/dashboard/schedule/create-makeup");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create makeup class:", error);
    return { error: `An unexpected error occurred: ${error.message}` };
  }
}
