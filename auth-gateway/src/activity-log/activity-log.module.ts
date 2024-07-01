import { Module } from '@nestjs/common';
import { ActivityLogController } from './activity-log.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [ActivityLogController],
})
export class ActivityLogModule {}
