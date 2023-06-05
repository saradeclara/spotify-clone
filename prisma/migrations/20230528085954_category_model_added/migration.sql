-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "artistId" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Album" ("artistId", "createdAt", "id", "name", "thumbnail", "updatedAt") SELECT "artistId", "createdAt", "id", "name", "thumbnail", "updatedAt" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE UNIQUE INDEX "Album_name_key" ON "Album"("name");
CREATE TABLE "new_Show" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "Show_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Show" ("createdAt", "id", "name", "thumbnail", "updatedAt") SELECT "createdAt", "id", "name", "thumbnail", "updatedAt" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
CREATE TABLE "new_Playlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Playlist_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Playlist" ("createdAt", "id", "name", "updatedAt", "userId") SELECT "createdAt", "id", "name", "updatedAt", "userId" FROM "Playlist";
DROP TABLE "Playlist";
ALTER TABLE "new_Playlist" RENAME TO "Playlist";
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "albumIndex" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "albumId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Song_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("albumId", "albumIndex", "artistId", "createdAt", "duration", "id", "name", "updatedAt", "url") SELECT "albumId", "albumIndex", "artistId", "createdAt", "duration", "id", "name", "updatedAt", "url" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
CREATE UNIQUE INDEX "Song_name_albumIndex_key" ON "Song"("name", "albumIndex");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
