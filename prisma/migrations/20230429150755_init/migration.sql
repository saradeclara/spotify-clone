-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RecordLabel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT
);
INSERT INTO "new_RecordLabel" ("createdAt", "id", "name", "thumbnail", "updatedAt") SELECT "createdAt", "id", "name", "thumbnail", "updatedAt" FROM "RecordLabel";
DROP TABLE "RecordLabel";
ALTER TABLE "new_RecordLabel" RENAME TO "RecordLabel";
CREATE UNIQUE INDEX "RecordLabel_id_key" ON "RecordLabel"("id");
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "userId" TEXT,
    "thumbnail" TEXT,
    CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("albumId", "artistId", "createdAt", "id", "name", "thumbnail", "updatedAt", "userId") SELECT "albumId", "artistId", "createdAt", "id", "name", "thumbnail", "updatedAt", "userId" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
