import { CohortNotificationService } from './cohort-notification.service';
import { Controller } from '@nestjs/common';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cohort-notification')
export class CohortNotificationController {
  constructor(
    private readonly cohortnotificationservice: CohortNotificationService,
  ) {}
  @EventPattern('createCohortNotification')
  async create(
    @Payload() createCohortNotificationDto: CreateCohortNotificationDto,
  ) {
    return await this.cohortnotificationservice.createCohortNotification(
      createCohortNotificationDto,
    );
  }
  @MessagePattern({ cmd: 'getCohortNotification' })
  async search(@Payload() id: number) {
    return await this.cohortnotificationservice.searchCohortNotification(id);
  }
}
