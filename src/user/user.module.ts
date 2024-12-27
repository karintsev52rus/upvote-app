import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashService } from 'src/common/helpers/hash-service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, HashService],
  exports: [UserService],
})
export class UserModule {}
