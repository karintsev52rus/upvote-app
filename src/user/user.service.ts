import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { ICreateUser } from './interfaces/create-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from 'src/common/helpers/hash-service';

@Injectable()
export class UserService {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

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

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('пользователь не найден');
    }
    if (userId !== user.id) {
      throw new ForbiddenException(
        'пользователь может редактировать только свой профиль',
      );
    }

    if (updateUserDto.password) {
      const hashPassword = await this.hashService.hashPassword(
        updateUserDto.password,
      );
      updateUserDto.password = hashPassword;
    }

    if (updateUserDto.email) {
      const isUserAlreadyExists = await this.isUserAlreadyExists(
        updateUserDto.email,
      );
      if (isUserAlreadyExists) {
        throw new BadRequestException('пользователь с таким email существует');
      }
    }
    return this.userRepository.updateById(userId, updateUserDto);
  }
}
