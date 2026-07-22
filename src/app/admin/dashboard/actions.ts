"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({ where: { id } });
    revalidatePath("/admin/dashboard/students");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete student" };
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/admin/dashboard/courses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete course" };
  }
}

import bcrypt from "bcryptjs";

export async function createStudent(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const rollNumber = formData.get("rollNumber") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const program = formData.get("program") as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.create({
      data: { name, rollNumber, email, password: hashedPassword, program },
    });

    revalidatePath("/admin/dashboard/students");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create student. Ensure email/roll number are unique." };
  }
}

export async function createCourse(formData: FormData) {
  try {
    const code = formData.get("code") as string;
    const name = formData.get("name") as string;
    const creditHours = parseInt(formData.get("creditHours") as string, 10);
    const instructor = formData.get("instructor") as string;

    await prisma.course.create({
      data: { code, name, creditHours, instructor },
    });

    revalidatePath("/admin/dashboard/courses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create course. Ensure code is unique." };
  }
}

export async function markFeePaid(id: string) {
  try {
    await prisma.feeChallan.update({
      where: { id },
      data: { status: "Paid" },
    });
    revalidatePath("/admin/dashboard/finance");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update fee status" };
  }
}

export async function updateStudent(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const program = formData.get("program") as string;
    // For simplicity, we just allow updating name and program.
    // If you want to update rollNumber/email, you must handle unique constraints gracefully.
    
    await prisma.student.update({
      where: { id },
      data: { name, program },
    });
    
    revalidatePath("/admin/dashboard/students");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update student" };
  }
}

export async function updateCourse(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const creditHours = parseInt(formData.get("creditHours") as string, 10);
    const instructor = formData.get("instructor") as string;
    
    await prisma.course.update({
      where: { id },
      data: { name, creditHours, instructor },
    });
    
    revalidatePath("/admin/dashboard/courses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update course" };
  }
}
