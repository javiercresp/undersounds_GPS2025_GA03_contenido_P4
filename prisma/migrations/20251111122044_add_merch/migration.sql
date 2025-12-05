-- CreateTable
CREATE TABLE "MerchItem" (
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MerchItem_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MerchItem_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MerchItem_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchItem_sku_key" ON "MerchItem"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "MerchItem_coverId_key" ON "MerchItem"("coverId");
