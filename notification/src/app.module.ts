import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CohortNotificationModule } from './cohort-notification/cohort-notification.module';
import { PocNotificationModule } from './poc-notification/poc-notification.module';

@Module({
  imports: [CohortNotificationModule, PocNotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
