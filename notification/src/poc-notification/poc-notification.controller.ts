import { Controller } from '@nestjs/common';
import { Post, Body, Param, Get } from '@nestjs/common';
import { CreatePocNotificationDto } from './dto/createpocNotification.dto';
import { PocNotificationService } from './poc-notification.service';

@Controller('poc-notification')
export class PocNotificationController {
  constructor(
    private readonly pocnotificationservice: PocNotificationService,
  ) {}
  @Post('create')
  async create(@Body() createPocNotificationDto: CreatePocNotificationDto) {
    return await this.pocnotificationservice.createPocNotification(
      createPocNotificationDto,
    );
  }
  @Get('search/:id')
  async search(@Param('id') id: number) {
    return await this.pocnotificationservice.searchPocNotification(id);
  }
}
