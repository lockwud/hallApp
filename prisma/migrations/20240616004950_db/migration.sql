-- CreateEnum
CREATE TYPE "status" AS ENUM ('Vacant', 'Occupied', 'Partially_Occupied');

-- CreateEnum
CREATE TYPE "options" AS ENUM ('Rejected', 'Approved', 'Pending');

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "studentId" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "telephone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "department" TEXT,
    "hallId" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "allocation" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "roomsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "roomnumber" INTEGER NOT NULL,
    "status" "status" NOT NULL,
    "blockName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hallId" TEXT,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roomRequest" (
    "id" TEXT NOT NULL,
    "StudentId" TEXT,
    "status" "options" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roomRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hall" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "hall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_telephone_key" ON "student"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "allocation_studentId_key" ON "allocation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_roomnumber_key" ON "rooms"("roomnumber");

-- CreateIndex
CREATE UNIQUE INDEX "roomRequest_StudentId_key" ON "roomRequest"("StudentId");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "hall"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_roomsId_fkey" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "hall"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomRequest" ADD CONSTRAINT "roomRequest_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "student"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
