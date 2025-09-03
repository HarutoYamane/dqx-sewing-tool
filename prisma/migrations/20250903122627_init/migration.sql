-- CreateEnum
CREATE TYPE "public"."ArmorParts" AS ENUM ('HEAD', 'BODY_UPPER', 'BODY_LOWER', 'ARMS', 'LEGS');

-- CreateEnum
CREATE TYPE "public"."ClothTypes" AS ENUM ('REBIRTH', 'RAINBOW', 'HEART', 'DoubleHalve', 'NORMAL');

-- CreateEnum
CREATE TYPE "public"."Strengths" AS ENUM ('STRONGEST', 'STRONGER', 'NORMAL', 'WEAK', 'UNKNOWN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArmorSeries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lv" INTEGER NOT NULL,
    "latest" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ArmorSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Armor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parts" "public"."ArmorParts" NOT NULL,
    "armorSeriesId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "lv" INTEGER NOT NULL,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sewing" (
    "id" SERIAL NOT NULL,
    "armorId" INTEGER NOT NULL,
    "clothType" "public"."ClothTypes" NOT NULL,
    "strength" "public"."Strengths"[],
    "settingValue" INTEGER[],

    CONSTRAINT "Sewing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "armorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Result" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "armorId" INTEGER NOT NULL,
    "threeStar" INTEGER NOT NULL DEFAULT 0,
    "twoStar" INTEGER NOT NULL DEFAULT 0,
    "oneStar" INTEGER NOT NULL DEFAULT 0,
    "zeroStar" INTEGER NOT NULL DEFAULT 0,
    "mistake" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorSeries_name_key" ON "public"."ArmorSeries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_name_key" ON "public"."Armor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sewing_armorId_key" ON "public"."Sewing"("armorId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_armorId_key" ON "public"."Favorite"("userId", "armorId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_userId_armorId_key" ON "public"."Result"("userId", "armorId");

-- AddForeignKey
ALTER TABLE "public"."Armor" ADD CONSTRAINT "Armor_armorSeriesId_fkey" FOREIGN KEY ("armorSeriesId") REFERENCES "public"."ArmorSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sewing" ADD CONSTRAINT "Sewing_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "public"."Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "public"."Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "public"."Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
