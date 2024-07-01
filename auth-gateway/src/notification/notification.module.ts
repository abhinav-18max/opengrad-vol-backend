import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports:[NatsClientModule],
  controllers: [NotificationController]
})
export class NotificationModule {}
