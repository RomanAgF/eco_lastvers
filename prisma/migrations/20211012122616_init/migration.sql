-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameSession" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "double" INTEGER NOT NULL DEFAULT 0,
    "shield" INTEGER NOT NULL DEFAULT 0,
    "half" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "endTime" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_username_key" ON "GameSession"("username");
