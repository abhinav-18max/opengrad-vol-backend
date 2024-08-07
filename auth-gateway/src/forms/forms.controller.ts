import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body, Inject, Get, Param } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFeedbackResponseDto } from './dto/createfeedbackresponse.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';
@Controller('forms')
export class FormsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @Roles(Role.Poc, Role.Admin)
  createfeedBackForm(
    @Body() createFeedbackdto: CreateFeedbackDto,
  ): Observable<any> {
    return this.natsClient.send(
      { cmd: 'createFeedbackForm' },
      createFeedbackdto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get/:id')
  @Roles(Role.Vol)
  getfeedBackForm(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getFeedbackForm' }, id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('response')
  @Roles(Role.Vol)
  response(
    @Body() createFeedbackResponse: CreateFeedbackResponseDto,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'response' }, createFeedbackResponse);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getresponse/:form_id')
  @Roles(Role.Poc, Role.Admin)
  getResponse(@Param('form_id') form_id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getResponse' }, form_id);
  }
}
