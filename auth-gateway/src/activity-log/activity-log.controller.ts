import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Post, Body, Param, Get } from '@nestjs/common';
import { CreateDailyLogDto } from './dto/create-dailylog.dto';
import { Observable } from 'rxjs';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { UseGuards } from '@nestjs/common';

@Controller('attendence')
export class ActivityLogController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Roles(Role.Vol)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  createLog(@Body() createLog: CreateDailyLogDto): Observable<any> {
    return this.natsClient.send({ cmd: 'createLog' }, createLog);
  }

  @Roles(Role.Poc, Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Get('get/:id/:Date')
  getLogById(
    @Param('id') id: number,
    @Param('Date') Date: Date,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'getLogById' }, { id, Date });
  }

  @Roles(Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('poc/:id')
  isPocverified(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'isPocverified' }, id);
  }
}
