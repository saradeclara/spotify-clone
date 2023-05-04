/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_createdAt_key" ON "Song"("createdAt");
