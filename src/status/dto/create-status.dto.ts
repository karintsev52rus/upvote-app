import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const StatusSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const CreateStatusSchema = StatusSchema.pick({ name: true });
export class CreateStatusDto extends createZodDto(CreateStatusSchema) {}

export const StatusResponseSchema = StatusSchema;
export class StatusReponseDto extends createZodDto(StatusResponseSchema) {}

export const StatusListResponseSchema = z.array(StatusResponseSchema);
export class StatusListReponseDto extends createZodDto(
  StatusListResponseSchema,
) {}
