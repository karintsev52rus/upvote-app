import { Injectable } from '@nestjs/common';
import { FeedbackPost, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackPostDto } from './dto/create-feedback-post.dto';
import { UpdateFeedbackPostDto } from './dto/update-feedback-post.dto';
import { IFeedbackPostRepositoryResponse } from './interfaces/feedback-post-repository-response.interface';
import { IFindFeedbackPosts } from './interfaces/find-feedback-posts.interface';

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

  async findAll(
    findFeedbackPostData: IFindFeedbackPosts,
  ): Promise<IFeedbackPostRepositoryResponse[]> {
    const { skip, take, order, orderBy, categories, status } =
      findFeedbackPostData;
    const whereStatus = status ? { statusId: { equals: status } } : undefined;
    const whereCategory =
      categories && categories.length
        ? { categories: { some: { categoryId: { in: categories } } } }
        : undefined;
    const where: Prisma.FeedbackPostWhereInput | undefined = {
      ...whereStatus,
      ...whereCategory,
    };
    return this.prisma.feedbackPost.findMany({
      skip,
      take,
      orderBy: { [orderBy]: order },
      where,
      include: {
        categories: { include: { Category: true } },
        status: true,
        author: true,
      },
    });
  }

  async getCount(findFeedbackPostData: IFindFeedbackPosts) {
    const { categories, status } = findFeedbackPostData;
    const whereStatus = status ? { statusId: { equals: status } } : undefined;
    const whereCategory =
      categories && categories.length
        ? { categories: { some: { categoryId: { in: categories } } } }
        : undefined;
    const where: Prisma.FeedbackPostWhereInput | undefined = {
      ...whereStatus,
      ...whereCategory,
    };
    return this.prisma.feedbackPost.count({
      where,
    });
  }

  async updateById(
    id: string,
    updateFeedbackPostDto: UpdateFeedbackPostDto,
  ): Promise<IFeedbackPostRepositoryResponse> {
    const { categories, status } = updateFeedbackPostDto;
    const statusConnect = status ? { connect: { id: status } } : undefined;

    let categoriesCreate:
      | Prisma.FeedbackPostsCategoriesUpdateManyWithoutFeedbackPostNestedInput
      | undefined;
    if (categories) {
      categoriesCreate = { deleteMany: {} };
      if (categories.length) {
        categoriesCreate.create = categories.map((categoryId) => {
          return { categoryId };
        });
      }
    } else {
      categoriesCreate = undefined;
    }

    return this.prisma.feedbackPost.update({
      where: { id },
      data: {
        ...updateFeedbackPostDto,
        status: statusConnect,
        categories: categoriesCreate,
        updatedAt: new Date(),
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
