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
} from '@nestjs/common';
import { FeedbackPostService } from './feedback-post.service';
import { CreateFeedbackPostDto } from './dto/create-feedback-post.dto';
import { UpdateFeedbackPostDto } from './dto/update-feedback-post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FeedbackPostResponseMapper } from './mappers/feedback-post-response.mapper';

@Controller('feedback-post')
@ApiTags('отзывы')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class FeedbackPostController {
  constructor(private readonly feedbackPostService: FeedbackPostService) {}

  @ApiOperation({ summary: 'создание отзыва' })
  @ApiBody({ type: CreateFeedbackPostDto })
  @Post()
  async create(
    @Req() req: Request,
    @Body() createFeedbackPostDto: CreateFeedbackPostDto,
  ) {
    const userId: string = req['user']['userId'];
    return new FeedbackPostResponseMapper(
      await this.feedbackPostService.create({
        ...createFeedbackPostDto,
        author: userId,
      }),
    );
  }

  @ApiOperation({ summary: 'получение списка отзывов' })
  @Get()
  async findAll() {
    return this.feedbackPostService.findAll();
  }

  @ApiOperation({ summary: 'получение отзыва по id' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new FeedbackPostResponseMapper(
      await this.feedbackPostService.findOne(id),
    );
  }

  @ApiOperation({ summary: 'редактирование отзыва' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateFeedbackPostDto })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateFeedbackPostDto: UpdateFeedbackPostDto,
  ) {
    const userId: string = req['user']['userId'];
    return new FeedbackPostResponseMapper(
      await this.feedbackPostService.update(id, {
        ...updateFeedbackPostDto,
        author: userId,
      }),
    );
  }

  @ApiOperation({ summary: 'удаление отзыва' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.feedbackPostService.remove(+id);
  }
}
