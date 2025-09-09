/*
  Warnings:

  - Changed the type of `icon` on the `Topics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TopicsIcons" AS ENUM ('Send', 'TriangleAlert', 'Info', 'Star', 'Bell', 'Shield');

-- AlterTable
ALTER TABLE "public"."Topics" DROP COLUMN "icon",
ADD COLUMN     "icon" "public"."TopicsIcons" NOT NULL;
