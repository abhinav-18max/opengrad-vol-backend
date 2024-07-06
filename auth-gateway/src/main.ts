import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { SessionEntity } from './utils/typeorm/entities/session';
import { TypeormStore } from 'connect-typeorm';
import { Appdatasource } from './utils/appdatasource';

async function bootstrap() {
  if (Appdatasource.isInitialized === false) await Appdatasource.initialize();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //   app.enableCors(
  //     {
  //     // origin: 'http://localhost:3000',
  //     origin: true,
  //     credentials: true,
  //   }
  // );
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: ['Authorization'],
    credentials: true,
  });

  await app.listen(5001, '0.0.0.0', () => {
    console.log('Auth Gateway is running on port 5001');
  });
}

bootstrap();
