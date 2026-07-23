"use server";

import { prisma } from "@/lib/prisma";

export async function getTodayMakeupClasses() {
  try {
    const classes = await prisma.makeupClass.findMany({
      include: {
        course: true,
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
