import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [NatsClientModule],
  providers: [],
  controllers: [NotificationController],
})
export class NotificationModule {}
