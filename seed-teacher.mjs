import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const teacher = await prisma.teacher.upsert({
    where: { employeeId: "LMP-42228" },
    update: {},
    create: {
      employeeId: "LMP-42228",
      email: "ahsan.shah@superior.edu.pk",
      password: hashedPassword,
      name: "Syed Ahsan Raza Shah",
      department: "Department of Computer Sciences",
      mobile: "3039369405",
      nationality: "Pakistan",
      institute: "N/A",
      joiningDate: new Date("2026-01-05"),
      status: "Active",
    },
  });

  console.log("Teacher seeded:", teacher);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
