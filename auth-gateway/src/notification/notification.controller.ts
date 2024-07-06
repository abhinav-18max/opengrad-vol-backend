import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';
import { CreatePocNotificationDto } from './dto/createPocNotification.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';

@Controller('notification')
export class NotificationController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('cohort/create')
  @Roles(Role.Admin)
  createcohortNotification(
    @Body() createcohortNotification: CreateCohortNotificationDto,
  ) {
    this.natsClient.emit('createCohortNotification', createcohortNotification);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('poc/create')
  @Roles(Role.Poc, Role.Admin)
  createpocNotification(
    @Body() createpocNotification: CreatePocNotificationDto,
  ) {
    this.natsClient.emit('createPocNotification', createpocNotification);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('cohort/get/:id')
  @Roles(Role.Vol, Role.Poc, Role.Admin)
  getcohortNotification(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getCohortNotification' }, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('poc/get/:id')
  @Roles(Role.Vol, Role.Poc, Role.Admin)
  getpocNotification(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getPocNotification' }, id);
  }
}
