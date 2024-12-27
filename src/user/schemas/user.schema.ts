import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  avatar: z.string().nullable(),
  password: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
