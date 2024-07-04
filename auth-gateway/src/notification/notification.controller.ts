import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';
import { CreatePocNotificationDto } from './dto/createPocNotification.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { UseGuards } from '@nestjs/common';

@Controller('notification')
export class NotificationController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Post('cohort/create')
  createcohortNotification(
    @Body() createcohortNotification: CreateCohortNotificationDto,
  ) {
    this.natsClient.emit('createCohortNotification', createcohortNotification);
  }
  @Roles(Role.Poc, Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Post('poc/create')
  createpocNotification(
    @Body() createpocNotification: CreatePocNotificationDto,
  ) {
    this.natsClient.emit('createPocNotification', createpocNotification);
  }

  @Roles(Role.Vol)
  @UseGuards(AuthenticatedGuard)
  @Get('cohort/get/:id')
  getcohortNotification(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getCohortNotification' }, id);
  }

  @Roles(Role.Vol)
  @UseGuards(AuthenticatedGuard)
  @Get('poc/get/:id')
  getpocNotification(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getPocNotification' }, id);
  }
}
