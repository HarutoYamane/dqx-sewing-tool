/*
  Warnings:

  - The values [DoubleHalve] on the enum `ClothTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ClothTypes_new" AS ENUM ('REBIRTH', 'RAINBOW', 'HEART', 'NORMAL');
ALTER TABLE "public"."Sewing" ALTER COLUMN "clothType" TYPE "public"."ClothTypes_new" USING ("clothType"::text::"public"."ClothTypes_new");
ALTER TYPE "public"."ClothTypes" RENAME TO "ClothTypes_old";
ALTER TYPE "public"."ClothTypes_new" RENAME TO "ClothTypes";
DROP TYPE "public"."ClothTypes_old";
COMMIT;
