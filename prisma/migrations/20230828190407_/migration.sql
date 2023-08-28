/*
  Warnings:

  - The primary key for the `Pokemos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pokemos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pokemos" DROP CONSTRAINT "Pokemos_pkey",
DROP COLUMN "id",
ADD COLUMN     "pokeId" SERIAL NOT NULL,
ADD CONSTRAINT "Pokemos_pkey" PRIMARY KEY ("pokeId");
