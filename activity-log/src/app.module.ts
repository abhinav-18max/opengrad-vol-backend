import { Module } from '@nestjs/common';
import { AttendenceModule } from './attendence/attendence.module';

@Module({
  imports: [AttendenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
