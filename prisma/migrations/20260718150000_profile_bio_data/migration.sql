-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fatherName" TEXT,
    "rollNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "faculty" TEXT,
    "career" TEXT,
    "currentSemester" INTEGER NOT NULL DEFAULT 1,
    "cgpa" REAL NOT NULL DEFAULT 0,
    "dob" DATETIME,
    "gender" TEXT,
    "cnic" TEXT,
    "domicile" TEXT,
    "nationality" TEXT,
    "religion" TEXT,
    "bloodGroup" TEXT,
    "fatherCnic" TEXT,
    "maritalStatus" TEXT,
    "contact" TEXT,
    "emergencyContact" TEXT,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Student" ("cgpa", "contact", "createdAt", "currentSemester", "dob", "email", "fatherName", "id", "name", "password", "program", "rollNumber", "updatedAt") SELECT "cgpa", "contact", "createdAt", "currentSemester", "dob", "email", "fatherName", "id", "name", "password", "program", "rollNumber", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_rollNumber_key" ON "Student"("rollNumber");
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

