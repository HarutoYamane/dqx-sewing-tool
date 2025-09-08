/*
  Warnings:

  - You are about to drop the column `oneStar` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `twoStar` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `zeroStar` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "oneStar",
DROP COLUMN "twoStar",
DROP COLUMN "zeroStar";

-- CreateTable
CREATE TABLE "public"."WeeklyArmorStats" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "armorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyArmorStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeeklyArmorStats_armorId_idx" ON "public"."WeeklyArmorStats"("armorId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyArmorStats_userId_armorId_key" ON "public"."WeeklyArmorStats"("userId", "armorId");

-- AddForeignKey
ALTER TABLE "public"."WeeklyArmorStats" ADD CONSTRAINT "WeeklyArmorStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeeklyArmorStats" ADD CONSTRAINT "WeeklyArmorStats_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "public"."Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
