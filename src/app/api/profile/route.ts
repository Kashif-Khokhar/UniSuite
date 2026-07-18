import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const student = await prisma.student.findUnique({
    where: { id: auth.studentId },
    select: {
      name: true,
      fatherName: true,
      rollNumber: true,
      email: true,
      program: true,
      faculty: true,
      career: true,
      currentSemester: true,
      cgpa: true,
      dob: true,
      gender: true,
      cnic: true,
      domicile: true,
      nationality: true,
      religion: true,
      bloodGroup: true,
      fatherCnic: true,
      maritalStatus: true,
      contact: true,
      emergencyContact: true,
      presentAddress: true,
      permanentAddress: true,
    },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ student });
}
