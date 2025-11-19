-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "artistId" TEXT,
    "labelId" TEXT,
    "releaseDate" DATETIME NOT NULL,
    "releaseState" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "coverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Album_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Album_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Album" ("artistId", "coverId", "createdAt", "currency", "description", "genres", "id", "labelId", "price", "releaseDate", "releaseState", "tags", "title", "updatedAt") SELECT "artistId", "coverId", "createdAt", "currency", "description", "genres", "id", "labelId", "price", "releaseDate", "releaseState", "tags", "title", "updatedAt" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE UNIQUE INDEX "Album_coverId_key" ON "Album"("coverId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
