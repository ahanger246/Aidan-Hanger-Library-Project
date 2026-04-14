-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_media_id_fkey";

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
