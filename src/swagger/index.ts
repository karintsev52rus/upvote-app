import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as packageJson from '../../package.json';

config();
export const SWAGGER_PATH = '/docs/api';

const options = new DocumentBuilder()
  .setTitle(packageJson.name)
  .setDescription(packageJson.description)
  .setVersion(packageJson.version)
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Токен авторизации, получаемый после вызова API авторизации',
      in: 'header',
    },
    'Authorization',
  )
  .build();

export function createSwagger(app: INestApplication): INestApplication {
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PATH, app, document);
  return app;
}
