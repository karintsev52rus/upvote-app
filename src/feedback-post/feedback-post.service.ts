import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedbackPostDto } from './dto/create-feedback-post.dto';
import { UpdateFeedbackPostDto } from './dto/update-feedback-post.dto';
import { FeedbackPostRepository } from './feedback-post.repository';

@Injectable()
export class FeedbackPostService {
  constructor(
    @Inject() private readonly feedbackPostRepo: FeedbackPostRepository,
  ) {}
  async create(createFeedbackPostDto: CreateFeedbackPostDto) {
    try {
      return this.feedbackPostRepo.create(createFeedbackPostDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ошибка при создании отзыва');
    }
  }

  async findAll() {
    return this.feedbackPostRepo.findAll();
  }

  async findOne(id: string) {
    try {
      const feedbackPost = await this.feedbackPostRepo.findById(id);
      if (!feedbackPost) {
        throw new NotFoundException('Отзыв не найден');
      }
      return feedbackPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ошибка при получении отзыва');
    }
  }

  async update(id: string, updateFeedbackPostDto: UpdateFeedbackPostDto) {
    return this.feedbackPostRepo.updateById(id, updateFeedbackPostDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} feedbackPost`;
  }
}
