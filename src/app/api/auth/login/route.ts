import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier = body?.identifier?.trim();
  const password = body?.password;

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Username/Roll number and password are required." },
      { status: 400 }
    );
  }

  // 1. Check for Admin Login
  if (identifier === "admin" && password === "admin123") {
    const token = await signSession({ role: "admin" });
    await setSessionCookie(token);
    return NextResponse.json({ role: "admin" });
  }

  // 2. Check for Teacher Login
  const teacher = await prisma.teacher.findUnique({ where: { employeeId: identifier } });
  
  if (teacher) {
    const passwordMatches = await bcrypt.compare(password, teacher.password);
    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    
    const token = await signSession({
      teacherId: teacher.id,
      employeeId: teacher.employeeId,
      role: "teacher"
    });
    await setSessionCookie(token);
    return NextResponse.json({ role: "teacher" });
  }

  // 3. Fallback to Student Login
  const student = await prisma.student.findUnique({ where: { rollNumber: identifier } });

  if (!student) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  const passwordMatches = await bcrypt.compare(password, student.password);
  if (!passwordMatches) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  const token = await signSession({
    studentId: student.id,
    rollNumber: student.rollNumber,
    role: "student"
  });
  await setSessionCookie(token);

  return NextResponse.json({ role: "student" });
}
