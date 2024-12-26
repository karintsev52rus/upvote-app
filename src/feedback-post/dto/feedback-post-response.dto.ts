import { z } from 'zod';
import { FeedbackPostSchema } from '../feedback-post.schema';
import { createZodDto } from 'nestjs-zod';

export const FeedbackPostResponseSchema = FeedbackPostSchema.merge(
  z.object({
    status: z.object({ id: z.string().uuid(), name: z.string() }),
    author: z.object({
      id: z.string().uuid(),
      email: z.string(),
      avatar: z.string().nullable(),
    }),
    categories: z.array(z.object({ id: z.string().uuid(), name: z.string() })),
  }),
);

export class FeedbackPostResponseDto extends createZodDto(
  FeedbackPostResponseSchema,
) {}

export type FeedbackPostResponseType = z.infer<
  typeof FeedbackPostResponseSchema
>;
