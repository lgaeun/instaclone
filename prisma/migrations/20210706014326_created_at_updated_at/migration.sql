/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.userName_unique" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
