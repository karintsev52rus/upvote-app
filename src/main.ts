import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwagger, SWAGGER_PATH } from './swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    patchNestJsSwagger();
    createSwagger(app);

    await app.listen(process.env.PORT ?? 3000);
    const url = process.env.HOST;

    console.log(`Server started at ${url}`);
    console.log(`Swagger available on ${url}${SWAGGER_PATH}`);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
