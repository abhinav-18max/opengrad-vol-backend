import { Controller } from '@nestjs/common';
import { Post, Body, Param, Get } from '@nestjs/common';
import { CreatePocNotificationDto } from './dto/createpocNotification.dto';
import { PocNotificationService } from './poc-notification.service';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';

@Controller('poc-notification')
export class PocNotificationController {
  constructor(
    private readonly pocnotificationservice: PocNotificationService,
  ) {}
  @EventPattern('createPocNotification')
  async create(@Payload() createPocNotificationDto: CreatePocNotificationDto) {
    return await this.pocnotificationservice.createPocNotification(
      createPocNotificationDto,
    );
  }
  @MessagePattern({ cmd: 'getPocNotification' })
  async search(@Payload() id: number) {
    return await this.pocnotificationservice.searchPocNotification(id);
  }
}
