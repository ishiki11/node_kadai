/*
  Warnings:

  - The primary key for the `Profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[profile_id]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_pkey",
ALTER COLUMN "profile_id" DROP DEFAULT,
ALTER COLUMN "profile_id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DEFAULT '名無しさん',
ALTER COLUMN "self_pr" DROP NOT NULL,
ALTER COLUMN "icon" SET DEFAULT 'https://icooon-mono.com/i/icon_14440/icon_144400.svg',
ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY ("account_id");
DROP SEQUENCE "Profiles_profile_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_profile_id_key" ON "Profiles"("profile_id");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
