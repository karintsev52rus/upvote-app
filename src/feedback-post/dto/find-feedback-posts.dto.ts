import { PaginationRequestSchema } from 'src/common/pagintation/pagination.schema';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { OrderByTypes } from '../enums/order-by-types.enum';

export const FindFeedbackPostsSchema = PaginationRequestSchema.merge(
  z.object({
    order: z.string(z.enum(['asc', 'desc'])).default('desc'),
    orderBy: z
      .string(z.enum([OrderByTypes.createdAt, OrderByTypes.upvotes]))
      .default(OrderByTypes.createdAt),
    categories: z
      .union([z.array(z.string().uuid()), z.string().uuid()])
      .optional(),
    status: z.string().uuid().optional(),
  }),
);

export class FindFeedbackPostsDto extends createZodDto(
  FindFeedbackPostsSchema,
) {}
