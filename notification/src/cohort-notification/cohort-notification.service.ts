import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CohortNotification } from './entities/cohortNotification.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCohortNotificationDto } from './dto/createCohortNotification.dto';

@Injectable()
export class CohortNotificationService {
  constructor(
    @InjectRepository(CohortNotification)
    private cohortNotificationRepository: Repository<CohortNotification>,
  ) {}

  async createCohortNotification(
    createCohortNotificationDto: CreateCohortNotificationDto,
  ) {
    try {
      for (
        let i = 0;
        i < createCohortNotificationDto.receipient_id.length;
        i++
      ) {
        const cohortNotification = new CohortNotification();
        cohortNotification.form_id = createCohortNotificationDto.form_id;
        cohortNotification.typeofnotification =
          createCohortNotificationDto.typeofnotification;
        cohortNotification.Message = cohortNotification.Message;
        cohortNotification.receipient_id =
          createCohortNotificationDto.receipient_id[i];
        await this.cohortNotificationRepository.save(cohortNotification);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async searchCohortNotification(id: number) {
    try {
      const cohortNotification = await this.cohortNotificationRepository.find({
        where: {
          receipient_id: id,
        },
      });
      return cohortNotification;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
