-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "artistId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "releaseState" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "coverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "trackNumber" INTEGER NOT NULL,
    "durationSec" INTEGER NOT NULL,
    "albumId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alt" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codec" TEXT NOT NULL,
    "bitrate" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    CONSTRAINT "Audio_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lyrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    CONSTRAINT "Lyrics_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlbumStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "ratingAvg" REAL NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "albumId" TEXT,
    CONSTRAINT "AlbumStats_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrackStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playCount" INTEGER NOT NULL,
    "trackId" TEXT NOT NULL,
    CONSTRAINT "TrackStats_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trackId" TEXT NOT NULL,
    CONSTRAINT "Favorite_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_coverId_key" ON "Album"("coverId");

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_trackId_key" ON "Audio"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "Lyrics_trackId_key" ON "Lyrics"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumStats_albumId_key" ON "AlbumStats"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackStats_trackId_key" ON "TrackStats"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_trackId_key" ON "Favorite"("trackId");
