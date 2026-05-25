/*
  Warnings:

  - A unique constraint covering the columns `[blockerId,blockedId]` on the table `Block` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Block_blockerId_blockedId_key" ON "Block"("blockerId", "blockedId");
