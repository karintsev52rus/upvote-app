import { z } from 'zod';

export const UpvoteSchema = z.object({
  userId: z.string().uuid(),
  postId: z.string().uuid(),
  createdAt: z.string().datetime(),
});
