import { UserSchema } from '../schemas/user.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateUserSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
}).partial();
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
