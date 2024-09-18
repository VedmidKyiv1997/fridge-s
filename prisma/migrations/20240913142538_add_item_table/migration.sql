-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "bought" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(256) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "item_name_idx" ON "Item"("name");
