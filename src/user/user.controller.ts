import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserResponseMapper } from './mappers/user-response.mapper';

@Controller('users')
@ApiTags('пользователи')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new UserResponseMapper(await this.userService.getUserById(id));
  }
}
