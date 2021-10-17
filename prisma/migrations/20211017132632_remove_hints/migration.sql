/*
  Warnings:

  - You are about to drop the column `double` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `half` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `shield` on the `GameSession` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameSession" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "endTime" DATETIME NOT NULL
);
INSERT INTO "new_GameSession" ("endTime", "progress", "status", "username") SELECT "endTime", "progress", "status", "username" FROM "GameSession";
DROP TABLE "GameSession";
ALTER TABLE "new_GameSession" RENAME TO "GameSession";
CREATE UNIQUE INDEX "GameSession_username_key" ON "GameSession"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
