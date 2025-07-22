/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `generateNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `position` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "generateNumber" TEXT NOT NULL,
DROP COLUMN "position",
ADD COLUMN     "position" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
