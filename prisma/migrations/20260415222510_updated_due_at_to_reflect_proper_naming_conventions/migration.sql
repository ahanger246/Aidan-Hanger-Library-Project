/*
  Warnings:

  - You are about to drop the column `dueAt` on the `loans` table. All the data in the column will be lost.
  - Added the required column `due_at` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loans" DROP COLUMN "dueAt",
ADD COLUMN     "due_at" TIMESTAMP(3) NOT NULL;
