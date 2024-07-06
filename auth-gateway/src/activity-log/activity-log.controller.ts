import { Role } from './../utils/roles.enum';
import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body, Param, Get } from '@nestjs/common';
import { CreateDailyLogDto } from './dto/create-dailylog.dto';
import { Observable } from 'rxjs';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';

@Controller('attendence')
export class ActivityLogController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @Roles(Role.Admin)
  createLog(@Body() createLog: CreateDailyLogDto): Observable<any> {
    return this.natsClient.send({ cmd: 'createLog' }, createLog);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get/:id/:Date')
  @Roles(Role.Admin, Role.Poc)
  getLogById(
    @Param('id') id: number,
    @Param('Date') Date: Date,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'getLogById' }, { id, Date });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('poc/:id')
  @Roles(Role.Poc)
  isPocverified(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'isPocverified' }, id);
  }
}
