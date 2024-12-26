import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FeedbackPostService } from './feedback-post.service';
import { CreateFeedbackPostDto } from './dto/create-feedback-post.dto';
import { UpdateFeedbackPostDto } from './dto/update-feedback-post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FeedbackPostResponseMapper } from './mappers/feedback-post-response.mapper';
import { FeedbackPostResponseDto } from './dto/feedback-post-response.dto';
import { FeedbackPostListResponseDto } from './dto/feedback-post-list-response.dto';
import { FindFeedbackPostsDto } from './dto/find-feedback-posts.dto';
import { number, string } from 'zod';

@Controller('feedback-post')
@ApiTags('предложения')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class FeedbackPostController {
  constructor(private readonly feedbackPostService: FeedbackPostService) {}

  @ApiOperation({ summary: 'создание предложения' })
  @ApiBody({ type: CreateFeedbackPostDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: FeedbackPostResponseDto })
  @Post()
  async create(
    @Req() req: Request,
    @Body() createFeedbackPostDto: CreateFeedbackPostDto,
  ): Promise<FeedbackPostResponseDto> {
    const userId: string = req['user']['userId'];
    return new FeedbackPostResponseMapper(
      await this.feedbackPostService.create({
        ...createFeedbackPostDto,
        author: userId,
      }),
    );
  }

  @ApiOperation({ summary: 'получение списка предложений' })
  @ApiResponse({ type: FeedbackPostListResponseDto })
  @ApiQuery({
    name: 'take',
    type: number,
    description: 'сколько записей на страницу получить',
    required: true,
  })
  @ApiQuery({
    name: 'skip',
    type: number,
    description: 'сколько всего записей пропустить',
    required: true,
  })
  @ApiQuery({
    name: 'order',
    type: string,
    description: 'направление сортировки "asc" или "desc"',
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    description: 'сортировка по полю "createdAt" или "upvotesNumber"',
    required: false,
  })
  @ApiQuery({
    name: 'categories',
    description: 'id категорий',
    isArray: true,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    description: 'id статуса',
    type: string,
    required: false,
  })
  @Get()
  async findAll(
    @Query() dto: FindFeedbackPostsDto,
  ): Promise<FeedbackPostListResponseDto> {
    const feedbackPosts = await this.feedbackPostService.findAll(dto);
    const { data, pagination } = feedbackPosts;
    const feedbackPostListResponse = data.length
      ? data.map((post) => {
          return new FeedbackPostResponseMapper(post);
        })
      : [];
    return { data: feedbackPostListResponse, pagination };
  }

  @ApiOperation({ summary: 'получение предложения по id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: FeedbackPostResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FeedbackPostResponseDto> {
    return new FeedbackPostResponseMapper(
      await this.feedbackPostService.findOne(id),
    );
  }

  @ApiOperation({ summary: 'редактирование предложения' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateFeedbackPostDto })
  @ApiResponse({ status: HttpStatus.OK, type: FeedbackPostResponseDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackPostDto: UpdateFeedbackPostDto,
  ): Promise<FeedbackPostResponseDto> {
    return new FeedbackPostResponseMapper(
      await this.feedbackPostService.update(id, updateFeedbackPostDto),
    );
  }

  @ApiOperation({ summary: 'удаление предложения' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.feedbackPostService.remove(id);
  }
}
