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

    await prisma.course.create({
      data: { code, name, creditHours },
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
    
    await prisma.course.update({
      where: { id },
      data: { name, creditHours },
    });
    
    revalidatePath("/admin/dashboard/courses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update course" };
  }
}

export async function deleteTeacher(id: string) {
  try {
    await prisma.teacher.delete({ where: { id } });
    revalidatePath("/admin/dashboard/teachers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete teacher" };
  }
}

export async function createTeacher(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const employeeId = formData.get("employeeId") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.teacher.create({
      data: { name, employeeId, email, password: hashedPassword },
    });

    revalidatePath("/admin/dashboard/teachers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create teacher. Ensure email/employee ID are unique." };
  }
}

export async function updateTeacher(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    
    await prisma.teacher.update({
      where: { id },
      data: { name },
    });
    
    revalidatePath("/admin/dashboard/teachers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update teacher" };
  }
}

export async function createSection(courseId: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const teacherId = formData.get("teacherId") as string;

    await prisma.section.create({
      data: { name, courseId, teacherId },
    });

    revalidatePath("/admin/dashboard/sections");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create section." };
  }
}

export async function updateSection(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const teacherId = formData.get("teacherId") as string;
    
    await prisma.section.update({
      where: { id },
      data: { name, teacherId },
    });
    
    revalidatePath("/admin/dashboard/sections");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update section." };
  }
}

export async function deleteSection(id: string) {
  try {
    await prisma.section.delete({ where: { id } });
    revalidatePath("/admin/dashboard/courses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete section." };
  }
}

export async function enrollStudentAction(prevState: any, formData: FormData) {
  try {
    const sectionId = formData.get("sectionId") as string;
    const rollNumber = formData.get("rollNumber") as string;
    const semester = parseInt(formData.get("semester") as string, 10);

    const student = await prisma.student.findUnique({
      where: { rollNumber },
    });

    if (!student) {
      return { success: false, error: "Student not found with this roll number." };
    }

    await prisma.enrollment.create({
      data: {
        studentId: student.id,
        sectionId,
        semester,
      },
    });

    revalidatePath(`/admin/dashboard/courses`); // Ideally to specific course page, but this works
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "Student is already enrolled in this section." };
    }
    return { success: false, error: "Failed to enroll student." };
  }
}
