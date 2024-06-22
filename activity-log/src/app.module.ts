import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendenceModule } from './attendence/attendence.module';

@Module({
  imports: [AttendenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
