import { Module } from '@nestjs/common';
import { PocNotificationService } from './poc-notification.service';
import { PocNotificationController } from './poc-notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocNotification } from './entities/pocNotification.entities';

@Module({
  imports: [TypeOrmModule.forFeature([PocNotification])],
  providers: [PocNotificationService],
  controllers: [PocNotificationController],
})
export class PocNotificationModule {}
