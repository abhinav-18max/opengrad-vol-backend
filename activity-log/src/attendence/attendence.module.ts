import { Module } from '@nestjs/common';
import { AttendenceController } from './attendence.controller';
import { AttendenceService } from './attendence.service';

@Module({
  controllers: [AttendenceController],
  providers: [AttendenceService],
})
export class AttendenceModule {}
