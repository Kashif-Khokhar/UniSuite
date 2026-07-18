import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudentId } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireStudentId();
  if ("error" in auth) return auth.error;

  const challans = await prisma.feeChallan.findMany({
    where: { studentId: auth.studentId },
    orderBy: { dueDate: "desc" },
  });

  const totalPaid = challans.filter((c) => c.status === "Paid").reduce((s, c) => s + c.amount, 0);
  const totalUnpaid = challans.filter((c) => c.status === "Unpaid").reduce((s, c) => s + c.amount, 0);

  return NextResponse.json({ challans, totalPaid, totalUnpaid });
}
