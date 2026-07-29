import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function requireStudentId(): Promise<
  { studentId: string } | { error: NextResponse }
> {
  const session = await getSession();
  if (!session || !session.studentId) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { studentId: session.studentId };
}

export async function requireTeacherId(): Promise<
  { teacherId: string } | { error: NextResponse }
> {
  const session = await getSession();
  if (!session || !session.teacherId) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { teacherId: session.teacherId };
}
