import { createZodDto } from 'nestjs-zod';
import { UpvoteSchema } from '../schemas/upvote.schema';
import { z } from 'zod';

export const CreateUpvoteSchema = UpvoteSchema.omit({
  createdAt: true,
  userId: true,
});
export class CreateUpvoteDto extends createZodDto(CreateUpvoteSchema) {}

export const CreateUpvoteResponseSchema = UpvoteSchema.merge(
  z.object({ upvotesNumber: z.number() }),
);
export class CreateUpvoteResponseDto extends createZodDto(
  CreateUpvoteResponseSchema,
) {}
