import { Module } from '@nestjs/common';
import { FeedbackPostService } from './feedback-post.service';
import { FeedbackPostController } from './feedback-post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FeedbackPostRepository } from './feedback-post.repository';
import { PaginationService } from 'src/common/pagintation/pagination.service';

@Module({
  imports: [PrismaModule],
  controllers: [FeedbackPostController],
  providers: [FeedbackPostService, FeedbackPostRepository, PaginationService],
})
export class FeedbackPostModule {}
