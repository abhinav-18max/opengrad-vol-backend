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
      const cohortNotification = new CohortNotification();
      cohortNotification.form_id = createCohortNotificationDto.form_id;
      cohortNotification.typeofnotification =
        createCohortNotificationDto.typeofnotification;
      cohortNotification.Message = createCohortNotificationDto.Message;
      cohortNotification.receipient_id =
        createCohortNotificationDto.receipient_id;
      await this.cohortNotificationRepository.save(cohortNotification);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async searchCohortNotification(id: number) {
    try {
      return await this.cohortNotificationRepository
        .createQueryBuilder('cohort')
        .where(':id=ANY(cohort.receipient_id)', { id: id })
        .getMany();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
