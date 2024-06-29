import { Module } from '@nestjs/common';
import { AttendenceController } from './attendence.controller';
import { AttendenceService } from './attendence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyLog } from './entities/daily-log.entity';
import { Log } from './entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyLog, Log])],
  controllers: [AttendenceController],
  providers: [AttendenceService],
})
export class AttendenceModule {}
