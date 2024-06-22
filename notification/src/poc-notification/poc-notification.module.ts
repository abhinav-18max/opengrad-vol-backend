import { Module } from '@nestjs/common';
import { PocNotificationService } from './poc-notification.service';
import { PocNotificationController } from './poc-notification.controller';

@Module({
  providers: [PocNotificationService],
  controllers: [PocNotificationController]
})
export class PocNotificationModule {}
