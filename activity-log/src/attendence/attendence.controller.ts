import { AttendenceService } from './attendence.service';
import { Controller } from '@nestjs/common';
import { Post, Body, Param, Get } from '@nestjs/common';
import { CreateDailyLogDto } from './dto/create-dailylog.dto';

@Controller('attendence')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) {}
  @Post('create')
  async createLog(@Body() createLog: CreateDailyLogDto) {
    return await this.attendenceService.createLog(createLog);
  }
  @Get('get/:id/:Date')
  async getLogById(@Param('id') id: number, @Param('Date') Date: Date) {
    return await this.attendenceService.getLogById(id, Date);
  }
  @Get('poc/:id')
  async isPocverified(@Param('id') id: number) {
    return await this.attendenceService.isPocverified(id);
  }
}
