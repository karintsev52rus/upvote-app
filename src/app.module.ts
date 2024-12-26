import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { StatusModule } from './status/status.module';
import { CategoryModule } from './category/category.module';
import { FeedbackPostModule } from './feedback-post/feedback-post.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UpvoteModule } from './upvote/upvote.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    StatusModule,
    CategoryModule,
    FeedbackPostModule,
    UpvoteModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
