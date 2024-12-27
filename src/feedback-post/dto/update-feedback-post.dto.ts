import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CreateFeedbackPostSchema } from './create-feedback-post.dto';

export const UpdateFeedbackPostSchema = CreateFeedbackPostSchema.omit({
  upvotesNumber: true,
  author: true,
})
  .merge(
    z.object({
      categories: z.array(z.string().uuid()),
      status: z.string().uuid(),
    }),
  )
  .partial();
export class UpdateFeedbackPostDto extends createZodDto(
  UpdateFeedbackPostSchema,
) {}
