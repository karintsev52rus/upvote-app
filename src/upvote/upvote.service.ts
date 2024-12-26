import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpvoteRepository } from './upvote.repository';
import { FeedbackPostService } from 'src/feedback-post/feedback-post.service';
import { ICreateUpvoteRespositoryResponse } from './interfaces/create-upvote-repository-response.interface';
import { ICreateUpvoteRespositoryRequest } from './interfaces/create-upvote-repository-request.interface';

@Injectable()
export class UpvoteService {
  constructor(
    @Inject() private readonly upvoteRepo: UpvoteRepository,
    @Inject() private readonly feedbackPostService: FeedbackPostService,
  ) {}
  async upvoteToPost(
    createUpvoteDto: ICreateUpvoteRespositoryRequest,
  ): Promise<ICreateUpvoteRespositoryResponse> {
    const isAlreadyUpvoted = await this.isAlreadyUpvoted(createUpvoteDto);
    if (isAlreadyUpvoted) {
      throw new BadRequestException(
        'пользователь уже проголосовал за это предложение',
      );
    }
    const post = await this.feedbackPostService.findOne(createUpvoteDto.postId);
    return this.upvoteRepo.create(post, createUpvoteDto.userId);
  }

  async isAlreadyUpvoted(
    createUpvoteDto: ICreateUpvoteRespositoryRequest,
  ): Promise<boolean> {
    const upvote = await this.upvoteRepo.findByUserAndPost(createUpvoteDto);
    if (upvote) {
      return true;
    } else return false;
  }
}
