-- DropForeignKey
ALTER TABLE "FeedbackPostsCategories" DROP CONSTRAINT "FeedbackPostsCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "FeedbackPostsCategories" DROP CONSTRAINT "FeedbackPostsCategories_feedbackPostId_fkey";

-- AddForeignKey
ALTER TABLE "FeedbackPostsCategories" ADD CONSTRAINT "FeedbackPostsCategories_feedbackPostId_fkey" FOREIGN KEY ("feedbackPostId") REFERENCES "FeedbackPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackPostsCategories" ADD CONSTRAINT "FeedbackPostsCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
