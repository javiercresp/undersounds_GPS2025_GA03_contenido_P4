-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MerchItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'OTHER',
    "priceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "artistId" TEXT,
    "labelId" TEXT,
    "coverId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MerchItem" ("active", "artistId", "category", "coverId", "createdAt", "currency", "description", "id", "labelId", "priceCents", "sku", "stock", "title", "updatedAt") SELECT "active", "artistId", "category", "coverId", "createdAt", "currency", "description", "id", "labelId", "priceCents", "sku", "stock", "title", "updatedAt" FROM "MerchItem";
DROP TABLE "MerchItem";
ALTER TABLE "new_MerchItem" RENAME TO "MerchItem";
CREATE UNIQUE INDEX "MerchItem_sku_key" ON "MerchItem"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
