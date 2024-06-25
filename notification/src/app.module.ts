import { Module } from '@nestjs/common';
import { CohortNotificationModule } from './cohort-notification/cohort-notification.module';
import { PocNotificationModule } from './poc-notification/poc-notification.module';

@Module({
  imports: [CohortNotificationModule, PocNotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
