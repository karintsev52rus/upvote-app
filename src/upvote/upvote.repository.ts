import { Injectable } from '@nestjs/common';
import { Prisma, Upvote } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFeedbackPostRepositoryResponse } from 'src/feedback-post/interfaces/feedback-post-repository-response.interface';
import { ICreateUpvoteRespositoryResponse } from './interfaces/create-upvote-repository-response.interface';
import { ICreateUpvoteRespositoryRequest } from './interfaces/create-upvote-repository-request.interface';

@Injectable()
export class UpvoteRepository {
  constructor(private prisma: PrismaService) {}
  async upvote(
    upvoteWhereUniqueInput: Prisma.UpvoteWhereUniqueInput,
  ): Promise<Upvote | null> {
    return this.prisma.upvote.findUnique({
      where: upvoteWhereUniqueInput,
    });
  }

  async upvotes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UpvoteWhereUniqueInput;
    where?: Prisma.UpvoteWhereInput;
    orderBy?: Prisma.UpvoteOrderByWithRelationInput;
  }): Promise<Upvote[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.upvote.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(
    post: IFeedbackPostRepositoryResponse,
    userId: string,
  ): Promise<ICreateUpvoteRespositoryResponse> {
    const { upvotesNumber } = post;
    return this.prisma.$transaction(async (tx) => {
      await tx.feedbackPost.update({
        where: { id: post.id },
        data: { upvotesNumber: upvotesNumber + 1 },
      });
      const newUpvote = await tx.upvote.create({
        data: {
          feedbackPost: { connect: { id: post.id } },
          user: { connect: { id: userId } },
        },
        include: { feedbackPost: true },
      });

      return newUpvote;
    });
  }

  async findByUserAndPost(
    data: ICreateUpvoteRespositoryRequest,
  ): Promise<Upvote | null> {
    const { postId, userId } = data;
    return this.prisma.upvote.findFirst({
      where: { AND: [{ postId }, { userId }] },
    });
  }
}
