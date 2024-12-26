import { z } from 'zod';

export const PaginationRequestSchema = z.object({
  skip: z.coerce.number().min(0).default(0),
  take: z.coerce.number().min(1).default(5),
});

export const PaginationResponseSchema = z.object({
  skip: z.number(),
  take: z.number(),
  pageCount: z.number(),
});

export type PaginationResponseType = z.infer<typeof PaginationResponseSchema>;
