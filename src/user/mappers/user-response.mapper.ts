import { User } from '@prisma/client';

export class UserResponseMapper {
  id: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  constructor(user: User) {
    const { avatar, email, id, createdAt, updatedAt } = user;
    this.avatar = avatar;
    this.email = email;
    this.id = id;
    this.createdAt = createdAt.toLocaleString();
    this.updatedAt = updatedAt.toLocaleString();
  }
}
