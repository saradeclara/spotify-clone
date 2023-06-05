/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `releasedOn` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "releasedOn" DATETIME NOT NULL,
    "artistId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Album" ("artistId", "categoryId", "createdAt", "id", "name", "thumbnail", "updatedAt") SELECT "artistId", "categoryId", "createdAt", "id", "name", "thumbnail", "updatedAt" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE UNIQUE INDEX "Album_name_key" ON "Album"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Category_description_key" ON "Category"("description");
