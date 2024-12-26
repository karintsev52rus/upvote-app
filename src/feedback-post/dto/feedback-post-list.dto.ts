import { PaginationResponseSchema } from 'src/common/pagintation/pagination.schema';
import { z } from 'zod';
import { FeedbackPostResponseSchema } from './feedback-post-response.dto';
import { createZodDto } from 'nestjs-zod';

export const FeedbackPostListResponseSchema = z.object({
  pagination: PaginationResponseSchema,
  data: z.array(FeedbackPostResponseSchema),
});

export class FeedbackPostListResponseDto extends createZodDto(
  FeedbackPostListResponseSchema,
) {}
