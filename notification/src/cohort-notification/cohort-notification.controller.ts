import { CohortNotificationService } from './cohort-notification.service';
import { Controller } from '@nestjs/common';
import { Post, Body, Param, Get } from '@nestjs/common';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';

@Controller('cohort-notification')
export class CohortNotificationController {
  constructor(
    private readonly cohortnotificationservice: CohortNotificationService,
  ) {}
  @Post('create')
  async create(
    @Body() createCohortNotificationDto: CreateCohortNotificationDto,
  ) {
    return await this.cohortnotificationservice.createCohortNotification(
      createCohortNotificationDto,
    );
  }
  @Get('search/:id')
  async search(@Param('id') id: number) {
    return await this.cohortnotificationservice.searchCohortNotification(id);
  }
}
