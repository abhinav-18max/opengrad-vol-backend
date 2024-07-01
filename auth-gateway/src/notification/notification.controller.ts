import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';

@Controller('notification')
export class NotificationController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('cohort/create')
  createNotification(
    @Body() createcohortNotification: CreateCohortNotificationDto,
  ): Observable<any> {
    return this.natsClient.send(
      { cmd: 'createNotification' },
      createcohortNotification,
    );
  }
}
