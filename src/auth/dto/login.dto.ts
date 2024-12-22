import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export class LoginDto extends createZodDto(LoginSchema) {}

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}
