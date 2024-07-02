import { Controller } from '@nestjs/common';
import { Post, Body, Inject, Get, Param } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFeedbackResponseDto } from './dto/createfeedbackresponse.dto';

@Controller('forms')
export class FormsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post('create')
  createfeedBackForm(
    @Body() createFeedbackdto: CreateFeedbackDto,
  ): Observable<any> {
    return this.natsClient.send(
      { cmd: 'createFeedbackForm' },
      createFeedbackdto,
    );
  }
  @Get('get/:id')
  getfeedBackForm(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getFeedbackForm' }, id);
  }
  @Post('response')
  response(
    @Body() createFeedbackResponse: CreateFeedbackResponseDto,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'response' }, createFeedbackResponse);
  }

  @Get('getresponse/:form_id')
  getResponse(@Param('form_id') form_id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getResponse' }, form_id);
  }
}
