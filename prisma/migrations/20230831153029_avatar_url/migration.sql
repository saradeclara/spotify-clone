/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Show` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "thumbnail",
ADD COLUMN     "avatarUrl" TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "thumbnail",
ADD COLUMN     "avatarUrl" TEXT;

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "thumbnail",
ADD COLUMN     "avatarUrl" TEXT;

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "thumbnail",
ADD COLUMN     "avatarUrl" TEXT;
