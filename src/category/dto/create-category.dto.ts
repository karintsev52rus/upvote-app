import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const CreateCategorySchema = CategorySchema.pick({ name: true });
export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}

export const CategoryResponseSchema = CategorySchema;
export class CategoryReponseDto extends createZodDto(CategoryResponseSchema) {}

export const CategoryListResponseSchema = z.array(CategoryResponseSchema);
export class CategoryListReponseDto extends createZodDto(
  CategoryListResponseSchema,
) {}
