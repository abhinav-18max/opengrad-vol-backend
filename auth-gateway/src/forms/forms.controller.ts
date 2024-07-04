import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body, Inject, Get, Param } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFeedbackResponseDto } from './dto/createfeedbackresponse.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';

@Controller('forms')
export class FormsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Roles(Role.Poc, Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  createfeedBackForm(
    @Body() createFeedbackdto: CreateFeedbackDto,
  ): Observable<any> {
    return this.natsClient.send(
      { cmd: 'createFeedbackForm' },
      createFeedbackdto,
    );
  }
  @Roles(Role.Vol)
  @UseGuards(AuthenticatedGuard)
  @Get('get/:id')
  getfeedBackForm(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getFeedbackForm' }, id);
  }

  @Roles(Role.Vol)
  @UseGuards(AuthenticatedGuard)
  @Post('response')
  response(
    @Body() createFeedbackResponse: CreateFeedbackResponseDto,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'response' }, createFeedbackResponse);
  }

  @Roles(Role.Poc, Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Get('getresponse/:form_id')
  getResponse(@Param('form_id') form_id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getResponse' }, form_id);
  }
}
