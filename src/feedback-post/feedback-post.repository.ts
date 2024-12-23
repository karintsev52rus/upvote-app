import { Injectable } from '@nestjs/common';
import { FeedbackPost, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackPostDto } from './dto/create-feedback-post.dto';
import { UpdateFeedbackPostDto } from './dto/update-feedback-post.dto';
import { IFeedbackPostRepositoryResponse } from './interfaces/feedback-post-repository-response';

@Injectable()
export class FeedbackPostRepository {
  constructor(private prisma: PrismaService) {}
  async feedbackPost(
    FeedbackPostWhereUniqueInput: Prisma.FeedbackPostWhereUniqueInput,
  ): Promise<FeedbackPost | null> {
    return this.prisma.feedbackPost.findUnique({
      where: FeedbackPostWhereUniqueInput,
    });
  }

  async feedbackPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FeedbackPostWhereUniqueInput;
    where?: Prisma.FeedbackPostWhereInput;
    orderBy?: Prisma.FeedbackPostOrderByWithRelationInput;
  }): Promise<FeedbackPost[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.feedbackPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(
    data: CreateFeedbackPostDto,
  ): Promise<IFeedbackPostRepositoryResponse> {
    const { author, categories, description, status, title } = data;
    const createCategories = categories.length
      ? categories.map((categoryId) => {
          return { categoryId };
        })
      : [];
    return this.prisma.feedbackPost.create({
      data: {
        title,
        description,
        author: { connect: { id: author } },
        status: { connect: { id: status } },
        categories: {
          create: createCategories,
        },
      },
      include: {
        categories: { include: { Category: true } },
        author: true,
        status: true,
      },
    });
  }

  async findById(id: string): Promise<IFeedbackPostRepositoryResponse | null> {
    return this.prisma.feedbackPost.findFirst({
      where: { id },
      include: {
        categories: { include: { Category: true } },
        author: true,
        status: true,
      },
    });
  }

  async findAll() {
    return this.prisma.feedbackPost.findMany({
      include: { categories: true, status: true, author: true },
    });
  }

  async updateById(
    id: string,
    updateFeedbackPostDto: UpdateFeedbackPostDto,
  ): Promise<IFeedbackPostRepositoryResponse> {
    const { author, categories, status } = updateFeedbackPostDto;
    const categoryIds =
      categories && categories.length
        ? categories.map((categoryId) => {
            return { categoryId };
          })
        : [];
    return this.prisma.feedbackPost.update({
      where: { id },
      data: {
        ...updateFeedbackPostDto,
        author: { connect: { id: author } },
        status: { connect: { id: status } },
        categories: {
          deleteMany: {},
          create: categoryIds,
        },
      },
      include: {
        categories: { include: { Category: true } },
        author: true,
        status: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.feedbackPost.delete({ where: { id } });
  }
}
