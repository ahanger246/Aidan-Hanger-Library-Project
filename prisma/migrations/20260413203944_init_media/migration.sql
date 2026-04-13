-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);
