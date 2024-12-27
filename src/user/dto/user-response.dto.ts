import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '../schemas/user.schema';

export const UserResponseSchema = UserSchema.omit({ password: true });
export class UserResponseDto extends createZodDto(UserResponseSchema) {}
