import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('пользователи')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'получение пользователя по id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get(':id')
  async findUser(@Param('id') id: string) {
    return new UserResponseMapper(await this.userService.getUserById(id));
  }

  @ApiOperation({ summary: 'редактирование пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Patch()
  async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId: string = req['user']['userId'];
    return new UserResponseMapper(
      await this.userService.updateUser(userId, updateUserDto),
    );
  }
}
