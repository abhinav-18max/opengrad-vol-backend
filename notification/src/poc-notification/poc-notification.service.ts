import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePocNotificationDto } from './dto/createpocNotification.dto';
import { PocNotification } from './entities/pocNotification.entities';

@Injectable()
export class PocNotificationService {
  constructor(
    @InjectRepository(PocNotificationService)
    private pocNotificationRepository: Repository<PocNotification>,
  ) {}

  async createCohortNotification(
    createPocNotificationDto: CreatePocNotificationDto,
  ) {
    try {
      for (
        let i = 0;
        i < createPocNotificationDto.receipient_id.length;
        i++
      ) {
        const pocNotification = new PocNotification();
        pocNotification.form_id = createPocNotificationDto.form_id;
        pocNotification.typeofnotification =
          createPocNotificationDto.typeofnotification;
        pocNotification.Message = createPocNotificationDto.Message;
        pocNotification.receipient_id =
          createPocNotificationDto.receipient_id[i];
        await this.pocNotificationRepository.save(pocNotification);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async searchCohortNotification(id: number) {
    try {
      const pocNotification = await this.pocNotificationRepository.find({
        where: {
          receipient_id: id,
        },
      });
      return pocNotification;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
