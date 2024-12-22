import { Injectable } from '@nestjs/common';
import { Status, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusRepository {
  constructor(private prisma: PrismaService) {}

  async status(
    statusWhereUniqueInput: Prisma.StatusWhereUniqueInput,
  ): Promise<Status | null> {
    return this.prisma.status.findUnique({
      where: statusWhereUniqueInput,
    });
  }

  async statuses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StatusWhereUniqueInput;
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput;
  }): Promise<Status[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.status.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(createstatusDto: CreateStatusDto) {
    return this.prisma.status.create({ data: createstatusDto });
  }

  async findById(id: string) {
    return this.prisma.status.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.status.findMany();
  }
}
