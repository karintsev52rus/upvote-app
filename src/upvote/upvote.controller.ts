import { Controller, Post, Body, Inject, UseGuards, Req } from '@nestjs/common';
import { UpvoteService } from './upvote.service';
import {
  CreateUpvoteDto,
  CreateUpvoteResponseDto,
} from './dto/create-upvote.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpvoteResponseMapper } from './mappers/upvote-response.mapper';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('upvote')
@ApiTags('голосование')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class UpvoteController {
  constructor(@Inject() private readonly upvoteService: UpvoteService) {}
  @ApiOperation({ summary: 'проголосовать за предложение' })
  @ApiResponse({ type: CreateUpvoteResponseDto })
  @Post()
  async create(
    @Req() req: Request,
    @Body() createUpvoteDto: CreateUpvoteDto,
  ): Promise<CreateUpvoteResponseDto> {
    const userId: string = req['user']['userId'];
    return new UpvoteResponseMapper(
      await this.upvoteService.upvoteToPost({ ...createUpvoteDto, userId }),
    );
  }
}
