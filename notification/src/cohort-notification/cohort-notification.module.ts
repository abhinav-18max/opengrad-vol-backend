import { Module } from '@nestjs/common';
import { CohortNotificationService } from './cohort-notification.service';
import { CohortNotificationController } from './cohort-notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CohortNotification } from './entities/cohortNotification.entities';

@Module({
  imports: [TypeOrmModule.forFeature([CohortNotification])],
  providers: [CohortNotificationService],
  controllers: [CohortNotificationController],
})
export class CohortNotificationModule {}
