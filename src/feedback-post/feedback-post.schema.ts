import { z } from 'zod';

export const FeedbackPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string().uuid(),
  status: z.string().uuid(),
  categories: z.array(z.string().uuid()),
});
