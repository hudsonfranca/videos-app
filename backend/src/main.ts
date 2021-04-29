import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
