import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedbackPostDto } from './dto/create-feedback-post.dto';
import { UpdateFeedbackPostDto } from './dto/update-feedback-post.dto';
import { FeedbackPostRepository } from './feedback-post.repository';
import { FindFeedbackPostsDto } from './dto/find-feedback-posts.dto';
import { IFindFeedbackPosts } from './interfaces/find-feedback-posts.interface';
import { IFeedbackPostRepositoryResponse } from './interfaces/feedback-post-repository-response.interface';
import { PaginationResponseType } from 'src/common/pagintation/pagination.schema';
import { PaginationService } from 'src/common/pagintation/pagination.service';

@Injectable()
export class FeedbackPostService {
  constructor(
    @Inject() private readonly feedbackPostRepo: FeedbackPostRepository,
    private readonly paginationService: PaginationService,
  ) {}
  async create(
    createFeedbackPostDto: CreateFeedbackPostDto,
  ): Promise<IFeedbackPostRepositoryResponse> {
    return this.feedbackPostRepo.create(createFeedbackPostDto);
  }

  async findAll(dto: FindFeedbackPostsDto): Promise<{
    data: IFeedbackPostRepositoryResponse[];
    pagination: PaginationResponseType;
  }> {
    const { take, order, orderBy, skip, categories, status } = dto;

    let categoryIds: string[] | undefined;
    if (!Array.isArray(categories) && categories) {
      categoryIds = [categories];
    }
    if (!categories) {
      categoryIds = undefined;
    }
    const findFeedbackPostData: IFindFeedbackPosts = {
      order,
      orderBy,
      categories: categoryIds,
      skip,
      take,
      status,
    };
    const feedbackPosts =
      await this.feedbackPostRepo.findAll(findFeedbackPostData);
    const count = await this.feedbackPostRepo.getCount(findFeedbackPostData);

    const paginationResponse = this.paginationService.getPaginationResponse({
      count,
      skip,
      take,
    });
    return { pagination: paginationResponse, data: feedbackPosts };
  }

  async findOne(id: string): Promise<IFeedbackPostRepositoryResponse> {
    const feedbackPost = await this.feedbackPostRepo.findById(id);
    if (!feedbackPost) {
      throw new NotFoundException('предложение не найдено');
    }
    return feedbackPost;
  }

  async update(
    id: string,
    updateFeedbackPostDto: UpdateFeedbackPostDto,
    userId: string,
  ): Promise<IFeedbackPostRepositoryResponse> {
    const post = await this.feedbackPostRepo.findById(id);
    if (!post) {
      throw new NotFoundException('предложение не найдено');
    }
    if (userId !== post.author.id) {
      throw new ForbiddenException(
        'пользователь может редактировать только свои предложения',
      );
    }
    return this.feedbackPostRepo.updateById(id, updateFeedbackPostDto);
  }

  async remove(id: string, userId: string) {
    const post = await this.feedbackPostRepo.findById(id);
    if (!post) {
      throw new NotFoundException('предложение не найдено');
    }
    if (userId !== post.author.id) {
      throw new ForbiddenException(
        'пользователь может удалять только свои предложения',
      );
    }
    return this.feedbackPostRepo.delete(id);
  }
}
