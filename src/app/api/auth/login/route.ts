import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const rollNumber = body?.rollNumber?.trim();
  const password = body?.password;

  if (!rollNumber || !password) {
    return NextResponse.json(
      { error: "Roll number and password are required." },
      { status: 400 }
    );
  }

  const student = await prisma.student.findUnique({ where: { rollNumber } });

  if (!student) {
    return NextResponse.json(
      { error: "Invalid roll number or password." },
      { status: 401 }
    );
  }

  const passwordMatches = await bcrypt.compare(password, student.password);
  if (!passwordMatches) {
    return NextResponse.json(
      { error: "Invalid roll number or password." },
      { status: 401 }
    );
  }

  const token = await signSession({
    studentId: student.id,
    rollNumber: student.rollNumber,
  });
  await setSessionCookie(token);

  return NextResponse.json({
    student: {
      id: student.id,
      name: student.name,
      rollNumber: student.rollNumber,
    },
  });
}
