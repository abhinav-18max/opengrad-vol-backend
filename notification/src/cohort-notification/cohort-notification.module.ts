import { Module } from '@nestjs/common';
import { CohortNotificationService } from './cohort-notification.service';
import { CohortNotificationController } from './cohort-notification.controller';

@Module({
  providers: [CohortNotificationService],
  controllers: [CohortNotificationController],
})
export class CohortNotificationModule {}
