import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Appdatasource } from './utils/appdatasource';

async function bootstrap() {
  if (Appdatasource.isInitialized === false) await Appdatasource.initialize();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );
  await app.listen();
}
bootstrap();
