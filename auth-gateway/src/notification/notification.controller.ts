import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';
import { CreatePocNotificationDto } from './dto/createPocNotification.dto';

@Controller('notification')
export class NotificationController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('cohort/create')
  createcohortNotification(
    @Body() createcohortNotification: CreateCohortNotificationDto,
  ) {
    this.natsClient.emit('createCohortNotification', createcohortNotification);
  }

  @Post('poc/create')
  createpocNotification(
    @Body() createpocNotification: CreatePocNotificationDto,
  ) {
    this.natsClient.emit('createPocNotification', createpocNotification);
  }

  @Get('cohort/get/:id')
  getcohortNotification(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getCohortNotification' }, id);
  }
  @Get('poc/get/:id')
  getpocNotification(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getPocNotification' }, id);
  }
}
