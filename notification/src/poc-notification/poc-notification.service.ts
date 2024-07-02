import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePocNotificationDto } from './dto/createpocNotification.dto';
import { PocNotification } from './entities/pocNotification.entities';

@Injectable()
export class PocNotificationService {
  constructor(
    @InjectRepository(PocNotification)
    private pocNotificationRepository: Repository<PocNotification>,
  ) {}

  async createPocNotification(
    createPocNotificationDto: CreatePocNotificationDto,
  ) {
    try {
      const pocNotification = new PocNotification();
      pocNotification.form_id = createPocNotificationDto.form_id;
      pocNotification.typeofnotification =
        createPocNotificationDto.typeofnotification;
      pocNotification.Message = createPocNotificationDto.Message;
      pocNotification.receipient_id = createPocNotificationDto.receipient_id;
      await this.pocNotificationRepository.save(pocNotification);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async searchPocNotification(id: number) {
    try {
      const pocNotification = await this.pocNotificationRepository
        .createQueryBuilder('poc')
        .where(':id=ANY(poc.receipient_id)', { id: id })
        .getMany();
      return pocNotification;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
