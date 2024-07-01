import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body, Param, Get } from '@nestjs/common';
import { CreateDailyLogDto } from './dto/create-dailylog.dto';
import { Observable } from 'rxjs';

@Controller('attendence')
export class ActivityLogController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post('create')
  createLog(@Body() createLog: CreateDailyLogDto): Observable<any> {
    return this.natsClient.send({ cmd: 'createLog' }, createLog);
  }

  @Get('get/:id/:Date')
  getLogById(
    @Param('id') id: number,
    @Param('Date') Date: Date,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'getLogById' }, { id, Date });
  }

  @Get('poc/:id')
  isPocverified(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'isPocverified' }, id);
  }
}
