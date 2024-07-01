import { AttendenceService } from './attendence.service';
import { Controller } from '@nestjs/common';
import { CreateDailyLogDto } from './dto/create-dailylog.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('attendence')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) {}
  @MessagePattern({ cmd: 'createLog' })
  async createLog(@Payload() createLog: CreateDailyLogDto) {
    return await this.attendenceService.createLog(createLog);
  }
  @MessagePattern({ cmd: 'getLogById' })
  async getLogById(@Payload() data: any) {
    return await this.attendenceService.getLogById(data.id, data.Date);
  }
  @MessagePattern({ cmd: 'isPocverified' })
  async isPocverified(@Payload() id: number) {
    return await this.attendenceService.isPocverified(id);
  }
}
