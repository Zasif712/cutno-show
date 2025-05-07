/*
  Warnings:

  - You are about to drop the column `hours` on the `Barber` table. All the data in the column will be lost.
  - Added the required column `endHour` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHour` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Barber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "slotDuration" INTEGER NOT NULL
);
INSERT INTO "new_Barber" ("city", "id", "phone", "shopName", "slotDuration") SELECT "city", "id", "phone", "shopName", "slotDuration" FROM "Barber";
DROP TABLE "Barber";
ALTER TABLE "new_Barber" RENAME TO "Barber";
CREATE UNIQUE INDEX "Barber_phone_key" ON "Barber"("phone");
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "barberId" INTEGER NOT NULL,
    "slotId" INTEGER NOT NULL,
    "slotTime" DATETIME NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("barberId", "clientPhone", "createdAt", "id", "slotTime") SELECT "barberId", "clientPhone", "createdAt", "id", "slotTime" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
