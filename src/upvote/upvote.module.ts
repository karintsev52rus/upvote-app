import { Module } from '@nestjs/common';
import { UpvoteService } from './upvote.service';
import { UpvoteController } from './upvote.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FeedbackPostModule } from 'src/feedback-post/feedback-post.module';
import { UpvoteRepository } from './upvote.repository';

@Module({
  imports: [PrismaModule, FeedbackPostModule],
  controllers: [UpvoteController],
  providers: [UpvoteService, UpvoteRepository],
})
export class UpvoteModule {}
