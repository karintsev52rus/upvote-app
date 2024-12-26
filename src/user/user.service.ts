import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { ICreateUser } from './interfaces/create-user.interface';

@Injectable()
export class UserService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: ICreateUser): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async isUserAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Пользователь не найден`);
    }
    return user;
  }
}
