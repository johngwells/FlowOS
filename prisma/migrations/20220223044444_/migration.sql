-- CreateTable
CREATE TABLE "Fields" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "reporter" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Fields_pkey" PRIMARY KEY ("id")
);
