/*
  Warnings:

  - You are about to drop the column `type` on the `media` table. All the data in the column will be lost.
  - Added the required column `format` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "type",
ADD COLUMN     "format" TEXT NOT NULL;
