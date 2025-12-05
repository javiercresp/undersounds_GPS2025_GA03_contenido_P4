/*
  Warnings:

  - You are about to drop the column `trackId` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `targetId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetType` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Favorite" ("id") SELECT "id" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
CREATE INDEX "Favorite_userId_targetType_idx" ON "Favorite"("userId", "targetType");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
