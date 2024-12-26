import { createZodDto } from 'nestjs-zod';
import { FeedbackPostSchema } from '../schemas/feedback-post.schema';

export const CreateFeedbackPostSchema = FeedbackPostSchema.omit({
  id: true,
});

export class CreateFeedbackPostDto extends createZodDto(
  CreateFeedbackPostSchema,
) {}
