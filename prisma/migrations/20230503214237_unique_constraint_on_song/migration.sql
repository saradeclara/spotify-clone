/*
  Warnings:

  - A unique constraint covering the columns `[name,albumIndex]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_name_albumIndex_key" ON "Song"("name", "albumIndex");
