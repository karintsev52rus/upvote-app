import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RegistrationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export class RegistrationDto extends createZodDto(RegistrationSchema) {}

export const RegistrationResponseSchema = z.object({
  message: z.string(),
  data: z.object({ userId: z.string() }),
});

export class RegistrationResponseDto extends createZodDto(
  RegistrationResponseSchema,
) {}
