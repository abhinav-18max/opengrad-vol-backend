import { Controller } from '@nestjs/common';
import { Post, Body, Param, Get } from '@nestjs/common';
import { CreatePocNotificationDto } from './dto/createpocNotification.dto';
import { PocNotificationService } from './poc-notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('poc-notification')
export class PocNotificationController {
  constructor(
    private readonly pocnotificationservice: PocNotificationService,
  ) {}
  @MessagePattern({ cmd: 'createPocNotification' })
  async create(@Payload() createPocNotificationDto: CreatePocNotificationDto) {
    return await this.pocnotificationservice.createPocNotification(
      createPocNotificationDto,
    );
  }
  @MessagePattern({ cmd: 'getCohortNotification' })
  async search(@Payload() id: number) {
    return await this.pocnotificationservice.searchPocNotification(id);
  }
}
