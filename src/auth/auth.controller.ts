import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import {
  RegistrationDto,
  RegistrationResponseDto,
} from './dto/registration.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('авторизация и регистрация')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'авторизация' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'регистрация' })
  @ApiBody({ type: RegistrationDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: RegistrationResponseDto })
  @Post('registration')
  async registration(
    @Body() dto: RegistrationDto,
  ): Promise<RegistrationResponseDto> {
    return this.authService.registration(dto);
  }
}
