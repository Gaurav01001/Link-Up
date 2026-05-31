-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "eventDate" TIMESTAMP(3),
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "spotsTotal" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "tags" TEXT[];
