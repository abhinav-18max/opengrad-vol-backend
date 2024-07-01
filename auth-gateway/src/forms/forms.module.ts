import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [FormsController],
})
export class FormsModule {}
