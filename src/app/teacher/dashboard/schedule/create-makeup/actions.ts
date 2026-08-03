"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireTeacherId } from "@/lib/api-auth";

export async function getCourses() {
  try {
    const auth = await requireTeacherId();
    if ("error" in auth) return [];

    const sections = await prisma.section.findMany({
      where: { teacherId: auth.teacherId },
      include: { course: true },
      orderBy: { course: { code: "asc" } },
    });
    return JSON.parse(JSON.stringify(sections));
  } catch (error) {
    console.error("Failed to fetch courses in server action:", error);
    return [];
  }
}

export async function createMakeupClass(prevState: any, formData: FormData) {
  try {
    const term = formData.get("term") as string;
    const dateStr = formData.get("date") as string;
    const sectionId = formData.get("sectionId") as string;
    const fromTime = formData.get("fromTime") as string;
    const toTime = formData.get("toTime") as string;

    if (!term || !dateStr || !sectionId || !fromTime || !toTime) {
      return { error: "Please fill out all fields." };
    }

    const date = new Date(dateStr);

    await prisma.makeupClass.create({
      data: {
        term,
        date,
        sectionId,
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
