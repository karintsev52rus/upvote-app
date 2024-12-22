import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import {
  RegistrationDto,
  RegistrationResponseDto,
} from './dto/registration.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto): Promise<LoginResponseDto> {
    try {
      const { email, password } = dto;
      const user = await this.userService.getUserByEmail(email);
      if (!user || user.password !== password) {
        throw new UnauthorizedException('Неверный логин или пароль');
      }

      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } catch (error) {
      throw new InternalServerErrorException(
        `Ошибка при авторизации пользователя ${error}`,
      );
    }
  }

  async registration(dto: RegistrationDto): Promise<RegistrationResponseDto> {
    try {
      const { email } = dto;
      const isUserAlreadyExists =
        await this.userService.isUserAlreadyExists(email);
      if (isUserAlreadyExists) {
        throw new BadRequestException(
          'Пользователь с таким email уже зарегистрирован',
        );
      }
      const user = await this.userService.createUser(dto);
      return {
        data: { userId: user.id },
        message: 'Новый пользователь создан',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Ошибка при регистрации нового пользователя ${error} `,
      );
    }
  }
}
